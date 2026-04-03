# RegWatch Web

A Next.js web application for RegWatch. The project is based on the T3 stack style (environment validation, tRPC, and Tailwind), using modern Next.js App Router and TypeScript.

This README documents the tech stack, requirements, setup instructions, scripts, environment variables, testing status, project structure, and licensing. Where details are unknown, TODOs are included for maintainers to fill in.


## Overview

- Framework: Next.js 15 (App Router)
- Language: TypeScript + React 19
- Styling: Tailwind CSS 4
- Data fetching/state: TanStack Query
- API layer: tRPC v11 (server and React Query client)
- Auth: NextAuth.js v5 (beta)
- Validation: Zod
- Env validation: @t3-oss/env-nextjs
- Lint/format: Biome
- Package manager: pnpm
- Release/changelog: standard-version + conventional-changelog
- CI Code Quality (optional): JetBrains Qodana for JS/TS


## Requirements

- Node.js: 18+ (LTS recommended). TODO: Confirm the exact version used in deployment.
- pnpm: 10.x (project specifies packageManager: pnpm@10.13.1)
- A configured .env file (see Environment Variables below)

Optional/CI:
- Docker or CI runner if building in pipelines (you may set SKIP_ENV_VALIDATION during build)
- Vercel CLI for the deploy:prod script (pnpm add -g vercel or npm i -g vercel). TODO: Confirm deployment platform if not Vercel.


## Getting Started

1) Install dependencies
- pnpm install

2) Create your environment file
- Copy ___env to .env.local and fill in values (see the Environment Variables section)

3) Run the app in development
- pnpm dev
- App runs at http://localhost:3000 by default

4) Type checking (optional during dev)
- pnpm typecheck


## Build and Run

- Development: pnpm dev
- Production build: pnpm build
- Production start (after build): pnpm start
- Preview (build + start in one): pnpm preview

Environment validation
- Next.js loads ./src/env.js at startup (see next.config.js). To bypass validation in CI/Docker: set SKIP_ENV_VALIDATION=true.


## Scripts

From package.json:
- dev: next dev --turbo
- build: next build
- start: next start
- preview: next build && next start
- typecheck: tsc --noEmit
- check: biome check .
- check:write: biome check --write .
- check:unsafe: biome check --write --unsafe .
- format:write: biome format --write .
- commit:check: commitlint --edit .git/COMMIT_EDITMSG
- release: standard-version --skip.changelog && pnpm run postrelease
- release:major: standard-version --skip.changelog --release-as major && pnpm run postrelease
- release:minor: standard-version --skip.changelog --release-as minor && pnpm run postrelease
- release:patch: standard-version --skip.changelog --release-as patch && pnpm run postrelease
- postrelease: conventional-changelog -i CHANGELOG.md -s -r 0 -n changelog.config.cjs
- prepare: husky
- deploy:prod: vercel pull --environment=production && vercel build --prod && vercel deploy --prebuilt --prod
- find:unused:components: node scripts/find-unused-components.mjs

Notes
- Biome is used instead of ESLint/Prettier.
- Husky/commitlint enforce Conventional Commits locally.


## Environment Variables

Environment variables are validated via Zod in src/env.js. Server-side and client-exposed vars are listed below.

Server (only available on server):
- API_URL (url)
- AUTH_AUTH0_ID (string)
- AUTH_AUTH0_ISSUER (url)
- AUTH_AUTH0_SECRET (string)
- AUTH_DISCORD_ID (string)
- AUTH_DISCORD_SECRET (string)
- AUTH_SECRET (string) — required in production; optional in development
- AUTH_TRUST_HOST (boolean, default true)
- NODE_ENV (development|test|production, default development)
- PORT (number, default 3000) — optional
- VERCEL_DOMAIN (string) — optional
- WEBFLOW_SITE (url)

Client (must be prefixed with NEXT_PUBLIC_):
- NEXT_PUBLIC_API_PROXY_PREFIX (url, default http://localhost:3000/api/proxy)
- NEXT_PUBLIC_API_URL (url)
- NEXT_PUBLIC_REFERRER_POLICY (string, default no-referrer)
- NEXT_PUBLIC_USE_API_PROXY (boolean, default true)
- NEXT_PUBLIC_WEBFLOW_SITE (url)
- NEXT_PUBLIC_NODE_ENV (development|test|production, default development)

Runtime/Build flags:
- SKIP_ENV_VALIDATION (boolean) — set to true to bypass env validation in CI/Docker builds

Setup tips
- During local development you can often set NEXT_PUBLIC_API_URL to match API_URL if you disable proxying, or leave defaults and use the built-in API proxy (see NEXT_PUBLIC_USE_API_PROXY).
- Never commit secrets; use .env.local for local development and managed secrets in CI.


## Project Structure

- src/app — Next.js App Router routes and pages
- src/components — UI components (atoms/molecules/organisms)
- src/lib — shared utilities, helpers, repositories
- src/server — tRPC routers and server-side API glue
- public — static assets
- scripts — utility scripts (e.g., find-unused-components.mjs)
- tailwind.config.ts, postcss.config.js — Tailwind configuration
- biome.jsonc — Biome settings for lint/format
- next.config.js — Next.js config (imports src/env.js for validation)
- qodana.yaml — JetBrains Qodana configuration
- changelog.config.cjs — Conventional-changelog configuration
- README.md, CHANGELOG.md — documentation

Note: Entry point for the application is managed by Next.js; the dev server starts at index route defined in src/app.


## API, Auth, and Data

- API access is performed via tRPC and/or REST calls configured against API_URL.
- Auth is configured via NextAuth v5 with providers (Auth0, Discord). TODO: Document exact auth flows and required callback URLs.
- State management and data fetching use TanStack Query with tRPC integration.


## Testing

- No test setup is detected in the repository. TODO: Add testing framework (e.g., Vitest/Jest + React Testing Library) and document test commands here.


## Code Quality

- Lint/format: pnpm check, pnpm check:write, pnpm format:write
- Commit style: Conventional Commits enforced via commitlint (pnpm commit:check) and Husky hooks
- Qodana (optional CI step):
  - Config: qodana.yaml (linter jetbrains/qodana-js:2025.2; bootstrap runs pnpm install)
  - Learn more: https://www.jetbrains.com/help/qodana/


## Release and Changelog

- Versioning and release notes are automated using standard-version and conventional-changelog.
- Primary commands:
  - pnpm run release — bump version, create tag, and regenerate CHANGELOG.md (via postrelease)
  - pnpm run release:patch|minor|major — explicit bump type
- Generated changelog: CHANGELOG.md (configured by changelog.config.cjs). Tags follow vX.Y.Z.

Workflow suggestion
- Commit using Conventional Commits.
- When ready, run a release command, then push with tags:
  - pnpm run release
  - git push --follow-tags origin <branch>


## Deployment

- Typical targets: Vercel/Node hosting. TODO: Add deployment specifics (platform, environment setup, domains, and any build-time flags required).
- Vercel (script): pnpm run deploy:prod
  - Requires Vercel CLI installed and logged in (vercel login)
  - Uses vercel pull --environment=production, vercel build --prod, then vercel deploy --prebuilt --prod
- Environment validation: you may need SKIP_ENV_VALIDATION=true in CI images if envs are injected at runtime.


## License

- TODO: Add LICENSE file and specify the license here. If the project is proprietary, note “All rights reserved.”


## Acknowledgements

- Initial scaffolding inspired by create-t3-app patterns (env validation, tRPC) but adapted to this project.