import { makeMockObligation } from '@/lib/mocks/makeMockObligation';
import { faker } from '@faker-js/faker';

export async function GET(request: Request) {
  const _id = request.url.split('/').pop() || faker.string.uuid();
  return Response.json(makeMockObligation(_id));
}

export async function PUT(request: Request) {
  const _id = request.url.split('/').pop() || faker.string.uuid();
  return Response.json(makeMockObligation(_id));
}

export async function DELETE() {
  return Response.json(null, { status: 204 });
}

export async function PATCH(request: Request) {
  const _id = request.url.split('/').pop() || faker.string.uuid();
  return Response.json(makeMockObligation(_id));
}
