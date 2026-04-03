import { promises as fs } from 'fs';
import path from 'path';

// Configuration
const PROJECT_ROOT = path.resolve(process.cwd());
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

/**
 * Recursively collect files matching extensions under a directory.
 */
async function collectFiles(dir, exts = new Set(['.ts', '.tsx', '.js', '.jsx'])) {
  const out = [];
  async function walk(current) {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch (_e) {
      return;
    }
    await Promise.all(
      entries.map(async (ent) => {
        const full = path.join(current, ent.name);
        if (ent.isDirectory()) {
          await walk(full);
        } else if (exts.has(path.extname(ent.name))) {
          out.push(full);
        }
      })
    );
  }
  await walk(dir);
  return out;
}

/**
 * Given a component file under src/components, derive its likely import specifiers.
 * Handles:
 * - alias @/components/* for most components
 * - alias @/ui/* for files under src/components/ui
 * Adds both directory import and explicit "/index" variant when file is index.tsx.
 */
function deriveSpecifiersFromComponentFile(filePath) {
  const relFromComponents = path.relative(COMPONENTS_DIR, filePath).replaceAll('\\', '/');
  const isInUi = relFromComponents.startsWith('ui/');
  const withoutExt = relFromComponents.replace(/\.[^.]+$/, '');
  const parts = withoutExt.split('/');

  const isIndex = parts[parts.length - 1] === 'index';

  let baseAlias;
  if (isInUi) {
    const relUi = withoutExt.replace(/^ui\//, '');
    if (isIndex) {
      const dir = relUi.split('/').slice(0, -1).join('/');
      baseAlias = dir ? `@/ui/${dir}` : '@/ui';
      return [baseAlias, `${baseAlias}/index`];
    }
    return [`@/ui/${relUi}`];
  }

  if (isIndex) {
    const dir = withoutExt.split('/').slice(0, -1).join('/');
    baseAlias = dir ? `@/components/${dir}` : '@/components';
    return [baseAlias, `${baseAlias}/index`];
  }
  return [`@/components/${withoutExt}`];
}

/**
 * Reads file content as string. Returns empty string on failure.
 */
async function readText(file) {
  try {
    return await fs.readFile(file, 'utf8');
  } catch {
    return '';
  }
}

/**
 * Main runner
 */
async function main() {
  // 1) Collect component files
  const componentFiles = await collectFiles(COMPONENTS_DIR, new Set(['.tsx', '.ts']));

  // 2) Collect all searchable source files once (exclude node_modules)
  const allSrcFiles = (await collectFiles(SRC_DIR)).filter((f) => !f.includes('/node_modules/'));

  const report = [];

  for (const compFile of componentFiles) {
    // Derive expected specifiers
    const specs = deriveSpecifiersFromComponentFile(compFile);

    // Search across all source files for any of the specifiers
    let used = false;

    for (const f of allSrcFiles) {
      // Skip scanning the component file itself
      if (f === compFile) continue;

      const text = await readText(f);
      if (!text) continue;

      for (const spec of specs) {
        if (text.includes(spec)) {
          used = true;
          break;
        }
      }
      if (used) break;
    }

    if (!used) {
      const rel = path.relative(PROJECT_ROOT, compFile).replaceAll('\\', '/');
      report.push({ file: rel, specifiers: specs });
    }
  }

  // Output
  if (report.length === 0) {
    console.info('No unused components found.');
  } else {
    for (const _item of report) {
      console.info(_item);
    }
  }
}

main().catch((e) => {
  console.error('Error while analyzing components:', e);
  process.exit(1);
});
