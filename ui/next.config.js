/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { env } from './src/env.js';

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  redirects: async () => {
    return [
      {
        source: '/privacy-policy',
        destination: `${env.WEBFLOW_SITE}/privacy-policy`,
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: `${env.WEBFLOW_SITE}/terms-of-service`,
        permanent: true,
      },
    ];
  },
};

export default config;
