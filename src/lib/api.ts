export function getApiBaseUrl() {
  // SSR or getStaticProps
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || "http://backend:8000/api";
  }

  // When running on the client (browser)
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
}

export function apiUrl(path: string): string {
  const base = getApiBaseUrl();

  // Ensure there is exactly one slash between base and path
  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  return `${base}${path}`;
}