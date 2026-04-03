const { execSync } = require('node:child_process');

const TYPE_TITLES = {
  feat: 'Features',
  fix: 'Bug Fixes',
  perf: 'Performance Improvements',
  refactor: 'Refactoring',
  docs: 'Documentation',
  test: 'Tests',
  chore: 'Chores',
  build: 'Build Process',
  ci: 'Continuous Integration',
  revert: 'Reverts',
  style: 'Styles',
};
const TYPE_ORDER = [
  'Build Process',
  'Continuous Integration',
  'Features',
  'Bug Fixes',
  'Performance Improvements',
  'Refactoring',
  'Documentation',
  'Tests',
  'Chores',
  'Reverts',
  'Styles',
];

const cache = new Map();
function getGitMeta(hash) {
  if (!hash) return {};
  if (cache.has(hash)) return cache.get(hash);
  try {
    const out = execSync(`git show -s --format="%an%x09%ae%x09%cI" ${hash}`, {
      encoding: 'utf8',
    }).trim();
    const [an = '', ae = '', cI = ''] = out.split('\t');
    const ymd = cI ? String(cI).split('T')[0] : '';
    const authorLink = ae ? `[${an || ae}](mailto:${ae})` : an || '';
    const meta = { authorLink, ymd };
    cache.set(hash, meta);
    return meta;
  } catch {
    return {};
  }
}

module.exports = {
  writerOpts: {
    groupBy: 'type',
    commitGroupsSort(a, b) {
      const ai = TYPE_ORDER.indexOf(a.title);
      const bi = TYPE_ORDER.indexOf(b.title);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.title.localeCompare(b.title);
    },

    transform(original, context) {
      const commit = { ...original };
      if (!commit.subject) return;

      const mappedType = TYPE_TITLES[commit.type] || commit.type || 'Other';
      const shortHash = commit.hash ? String(commit.hash).slice(0, 7) : undefined;

      const { authorLink, ymd } = getGitMeta(commit.hash);

      const baseUrl = `${context.repoUrl}/${context.owner}/${context.repository}`;

      let commitLink;
      if (commit.hash && baseUrl) {
        commitLink = `${baseUrl}/commit/${commit.hash}`;
      }

      const prLinks = [];
      if (baseUrl && commit.subject) {
        const regex = /#(\d+)/g;
        let match;
        while ((match = regex.exec(commit.subject))) {
          prLinks.push({
            id: match[1],
            url: `${baseUrl}/pull/${match[1]}`,
          });
        }
      }

      if (commit.body) {
        commit.body = commit.body.replace(/#(\d+)/g, '[#$1](#$1)');
        // Normalize the body to remove trailing details after the first sentence
        // and strip the "Files impacted" section if present.
        // Then, still convert issue references (#123) to links.
        const firstPart = commit.body.split('Files impacted:')[0].trim();
        const normalized = firstPart
          // Remove trailing punctuation and newlines after the main sentence
          .replace(/\s*[\r\n]+$/g, '')
          // Ensure no trailing period duplication
          .replace(/\.\s*$/g, '');
        commit.body = normalized.replace(/#(\d+)/g, '[#$1](#$1)');
        commit.body = commit.body.replace(/###/g, '');
        commit.body = commit.body.replace(/\s*[\r\n]+$/g, '');
      }

      return {
        ...commit,
        type: mappedType,
        shortHash,
        authorLink,
        commitDate: ymd,
        scope: commit.scope || '',
        commitLink,
        prLinks,
      };
    },

    finalizeContext(context) {
      context.commitGroups = (context.commitGroups || []).map((group) => {
        const buckets = new Map();

        (group.commits || []).forEach((c) => {
          const key = c.scope && c.scope.trim() ? c.scope.trim() : 'General';
          if (!buckets.has(key)) buckets.set(key, []);
          buckets.get(key).push(c);
        });

        const scopeGroups = Array.from(buckets.entries()).map(([scopeTitle, commits]) => {
          commits.sort((a, b) => {
            const da = a.commitDate ? new Date(a.commitDate).getTime() : 0;
            const db = b.commitDate ? new Date(b.commitDate).getTime() : 0;
            return db - da;
          });
          return { scopeTitle, commits };
        });

        scopeGroups.sort((a, b) => {
          if (a.scopeTitle === 'General' && b.scopeTitle !== 'General') return -1;
          if (b.scopeTitle === 'General' && a.scopeTitle !== 'General') return 1;
          return a.scopeTitle.localeCompare(b.scopeTitle);
        });

        return { ...group, scopeGroups };
      });

      return context;
    },

    mainTemplate: `{{> header}}

{{#if noteGroups}}
{{#each noteGroups}}
### ⚠️ {{title}}
{{#each notes}}
- {{text}}
{{/each}}
{{/each}}
{{/if}}

{{#each commitGroups}}
### {{title}}
{{#each scopeGroups}}
- {{scopeTitle}}
{{#each commits}}
{{> commit}}
{{/each}}

{{/each}}
{{/each}}

{{> footer}}
`,

    commitPartial: `  - {{subject}}
  {{#if commitLink}}([{{shortHash}}]({{commitLink}})){{else}}{{shortHash}}{{/if}}{{#if authorLink}} — {{authorLink}}{{/if}}{{#if commitDate}} • {{commitDate}}{{/if}}{{#if prLinks}} ({{#each prLinks}}[PR #{{id}}]({{url}}) {{/each}}){{/if}}.{{#if body}} {{{body}}}{{/if}}
`,

    headerPartial: `## v{{version}} - {{date}}`,
    footerPartial: '',
  },
};
