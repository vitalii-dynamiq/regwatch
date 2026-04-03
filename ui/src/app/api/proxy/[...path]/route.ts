import { env } from '@/env';
import { NextRequest, NextResponse } from 'next/server';

const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  // Typically recalc by runtime or not useful to set manually
  'content-length',
  'content-encoding',
]);

function filterHeaders(headers: Headers): Headers {
  const out = new Headers();
  headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      out.set(key, value);
    }
  });
  return out;
}

function getBackendBase(): string {
  const base = env.API_URL;
  if (!base) {
    throw new Error('API_URL is not set');
  }
  return base.replace(/\/+$/, '');
}

function buildTargetUrl(req: NextRequest, path: string[]): string {
  const backendBase = getBackendBase();
  const pathname = `/${path.join('/')}`.replace(/\/{2,}/g, '/');
  const search = req.nextUrl.search || '';
  return `${backendBase}${pathname}${search}`;
}

// Await params before using it (Next.js 15: params is async in Route Handlers)
async function proxy(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path = [] } = await context.params;
  const targetUrl = buildTargetUrl(req, path);

  const incomingHeaders = filterHeaders(req.headers);
  // Ensure the Host header is not leaked; fetch will set the proper one.
  incomingHeaders.delete('host');

  // Forward the request; include body only when appropriate
  const method = req.method.toUpperCase();
  const hasBody = !['GET', 'HEAD'].includes(method);
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const response = await fetch(targetUrl, {
    method,
    headers: incomingHeaders,
    body: hasBody ? body : undefined,
    redirect: 'manual',
  });

  const outgoingHeaders = filterHeaders(response.headers);
  const res = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: outgoingHeaders,
  });

  return res;
}

// Handle common HTTP methods by delegating to the same proxy
export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

// ... existing code ...
export async function POST(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(req, context);
}

// Basic OPTIONS handler (mostly unnecessary for same-origin, but safe to include)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    },
  });
}
