import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    API_URL: z.string().url(),
    AUTH_AUTH0_ID: z.string(),
    AUTH_AUTH0_ISSUER: z.string().url(),
    AUTH_AUTH0_SECRET: z.string(),
    AUTH_DISCORD_ID: z.string().optional(),
    AUTH_DISCORD_SECRET: z.string().optional(),
    AUTH_SECRET: process.env.NODE_ENV === 'production' ? z.string() : z.string().optional(),
    AUTH_TRUST_HOST: z.boolean().default(true),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.number().or(z.nan()).default(3000).optional(),
    VERCEL_DOMAIN: z.string().optional(),
    WEBFLOW_SITE: z.string().url(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_API_PROXY_PREFIX: z.string().url().default('http://localhost:3000/api/proxy'),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_REFERRER_POLICY: z.string().default('no-referrer'),
    NEXT_PUBLIC_USE_API_PROXY: z.boolean().default(true),
    NEXT_PUBLIC_WEBFLOW_SITE: z.string().url(),
    NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    API_URL: process.env.API_URL,
    AUTH_AUTH0_ID: process.env.AUTH_AUTH0_ID,
    AUTH_AUTH0_ISSUER: process.env.AUTH_AUTH0_ISSUER,
    AUTH_AUTH0_SECRET: process.env.AUTH_AUTH0_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST === 'true',
    NEXT_PUBLIC_API_PROXY_PREFIX: process.env.NEXT_PUBLIC_API_PROXY_PREFIX,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_REFERRER_POLICY: process.env.NEXT_PUBLIC_REFERRER_POLICY,
    NEXT_PUBLIC_USE_API_PROXY: process.env.NEXT_PUBLIC_USE_API_PROXY === 'true',
    NEXT_PUBLIC_WEBFLOW_SITE: process.env.NEXT_PUBLIC_WEBFLOW_SITE,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    VERCEL_DOMAIN: process.env.VERCEL_DOMAIN,
    WEBFLOW_SITE: process.env.WEBFLOW_SITE,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
