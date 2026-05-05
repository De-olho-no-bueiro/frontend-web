import { NextRequest, NextResponse } from 'next/server';
import { buildBackendApiUrl } from '@/core/utils/backend-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const response = await fetch(buildBackendApiUrl('/web/v1/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      cache: 'no-store',
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') ?? 'application/json';

    if (!response.ok) {
      return new NextResponse(text, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
        },
      });
    }

    const data = JSON.parse(text) as {
      access_token?: string;
      refresh_token?: string;
      userId?: number;
      name?: string | null;
      profilePicture?: unknown;
    };

    const result = NextResponse.json({
      userId: data.userId ?? null,
      name: data.name ?? null,
      profilePicture: data.profilePicture ?? null,
      authenticated: true,
    });

    if (data.access_token) {
      result.cookies.set('userToken', data.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 15 * 60,
      });
    }

    if (data.refresh_token) {
      result.cookies.set('userRefreshToken', data.refresh_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      });
    }

    return result;
  } catch (error) {
    console.error('Proxy login failed:', error);
    return NextResponse.json(
      { message: 'Falha ao consultar backend para login.' },
      { status: 502 },
    );
  }
}
