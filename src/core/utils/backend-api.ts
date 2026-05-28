export const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3000/api';

export function buildBackendApiUrl(endpoint: string) {
  return `${BACKEND_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}
