import { apiFetch } from "./client";

/**
 * PUBLIC_INTERFACE
 * fetchAdminSummary retrieves admin dashboard metrics (users/events/reports).
 * If the backend does not provide this endpoint, the admin page will degrade gracefully.
 */
export async function fetchAdminSummary() {
  return apiFetch("/admin/summary", { method: "GET" });
}
