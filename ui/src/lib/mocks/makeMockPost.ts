import type { Post } from '@/server/api/entity/post/types';
import { faker } from '@faker-js/faker';

export function makeMockPost(_id: Post['id'] | null = null): Post {
  const hasUserId = Math.random() > 0.2;
  const hasTitle = Math.random() > 0.2;
  const hasDescription = Math.random() > 0.2;

  return {
    userId: hasUserId ? faker.string.uuid() : null,
    id: _id ? _id : faker.string.uuid(),
    title: hasTitle ? faker.lorem.sentence() : null,
    body: hasDescription ? faker.lorem.paragraphs().replace(/\n/g, '\\n') : null,
  } as unknown as Post;
}
