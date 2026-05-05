function buildApiUrl(endpoint: string) {
  return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
}

export async function fetchPublic(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  return fetch(buildApiUrl(endpoint), { ...options, headers });
}

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  return fetch(buildApiUrl(endpoint), { ...options, headers, credentials: 'include' });
}
