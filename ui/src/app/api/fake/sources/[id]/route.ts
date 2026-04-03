import { makeMockSource } from '@/lib/mocks/makeMockSource';

export async function GET(_request: Request) {
  return Response.json(makeMockSource());
}

// Accept body but ignore it for now to preserve mock behavior
export async function PUT(request: Request) {
  try {
    await request.json();
  } catch {
    // ignore body parsing errors in mock
  }
  return Response.json(makeMockSource());
}

export async function PATCH(request: Request) {
  try {
    await request.json();
  } catch {
    // ignore body parsing errors in mock
  }
  return Response.json(makeMockSource());
}

export async function DELETE() {
  return new Response(null, { status: 204 });
}
