export const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://backend-q7yq.onrender.com/api';

export function buildBackendApiUrl(endpoint: string) {
  return `${BACKEND_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}
