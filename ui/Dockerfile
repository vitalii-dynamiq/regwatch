FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV SKIP_ENV_VALIDATION=true
ENV NEXT_TELEMETRY_DISABLED=1

ARG NEXT_PUBLIC_API_URL=http://localhost:3000
ARG NEXT_PUBLIC_USE_API_PROXY=true
ARG NEXT_PUBLIC_API_PROXY_PREFIX=http://localhost:3000/api/proxy
ARG NEXT_PUBLIC_WEBFLOW_SITE=https://example.com
ARG NEXT_PUBLIC_NODE_ENV=development
ARG NEXT_PUBLIC_REFERRER_POLICY=no-referrer

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_USE_API_PROXY=$NEXT_PUBLIC_USE_API_PROXY
ENV NEXT_PUBLIC_API_PROXY_PREFIX=$NEXT_PUBLIC_API_PROXY_PREFIX
ENV NEXT_PUBLIC_WEBFLOW_SITE=$NEXT_PUBLIC_WEBFLOW_SITE
ENV NEXT_PUBLIC_NODE_ENV=$NEXT_PUBLIC_NODE_ENV
ENV NEXT_PUBLIC_REFERRER_POLICY=$NEXT_PUBLIC_REFERRER_POLICY

RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
