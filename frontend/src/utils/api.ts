const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl;
  }
  const isLocal = window.location.hostname.includes("localhost") || window.location.hostname.includes("127.0.0.1");
  return isLocal ? "http://localhost:5000/api" : "https://nextcall-backend.vercel.app/api";
};

const API_BASE_URL = getApiBaseUrl();

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("nextcall_token");
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}
