/* eslint-disable no-console */

/**
 * Returns a resolved API base URL from available environment variables.
 * Preference order:
 * 1) REACT_APP_API_BASE
 * 2) REACT_APP_BACKEND_URL
 *
 * Falls back to same-origin "/api" for local proxy-like setups.
 */
function resolveApiBaseUrl() {
  const apiBase = process.env.REACT_APP_API_BASE;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (apiBase && apiBase.trim()) return apiBase.replace(/\/+$/, "");
  if (backendUrl && backendUrl.trim()) return backendUrl.replace(/\/+$/, "");

  return "/api";
}

/**
 * PUBLIC_INTERFACE
 * apiFetch wraps fetch with JSON handling and base URL + error normalization.
 * @param {string} path - API path beginning with "/"
 * @param {RequestInit} [options]
 * @returns {Promise<any>} parsed JSON (if any) or null
 */
export async function apiFetch(path, options = {}) {
  const baseUrl = resolveApiBaseUrl();
  const url = `${baseUrl}${path}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const resp = await fetch(url, { ...options, headers });

  const contentType = resp.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await resp.json().catch(() => null) : await resp.text().catch(() => "");

  if (!resp.ok) {
    const message =
      (body && body.message) ||
      (typeof body === "string" && body) ||
      `Request failed (${resp.status})`;
    const err = new Error(message);
    err.status = resp.status;
    err.body = body;
    throw err;
  }

  return body ?? null;
}

/**
 * PUBLIC_INTERFACE
 * resolveWsUrl returns the WS base URL using REACT_APP_WS_URL when available.
 * It does not open a socket; just resolves the configured URL.
 * @returns {string|null}
 */
export function resolveWsUrl() {
  const ws = process.env.REACT_APP_WS_URL;
  if (ws && ws.trim()) return ws.replace(/\/+$/, "");
  return null;
}
