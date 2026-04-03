import { makeMockPost } from '@/lib/mocks/makeMockPost';
import type { Posts } from '@/server/api/entity/post/types';

export async function GET(_request: Request) {
  const items: Posts = Array.from({ length: 100 }, (_, _index) => {
    return makeMockPost();
  });

  return Response.json(items);
}

export async function POST(request: Request) {
  const _data = await request.json();

  console.info({ _data });
  return Response.json(makeMockPost());
}
