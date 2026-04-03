import { env } from '@/env';
export default function getBackendUrl() {
  if (typeof window !== 'undefined') {
    return env.NEXT_PUBLIC_API_URL;
  }
  return env.API_URL;
}
