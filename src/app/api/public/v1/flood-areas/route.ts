import { NextResponse } from 'next/server';
import { buildBackendApiUrl } from '@/core/utils/backend-api';

export async function GET() {
  try {
    const response = await fetch(buildBackendApiUrl('/public/v1/flood-areas'), {
      cache: 'no-store',
    });

    const text = await response.text();

    return new NextResponse(text, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') ?? 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy flood-areas failed:', error);
    return NextResponse.json(
      { message: 'Falha ao consultar backend para areas de alagamento.' },
      { status: 502 },
    );
  }
}
