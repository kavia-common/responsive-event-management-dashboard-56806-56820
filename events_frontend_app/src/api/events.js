import { apiFetch } from "./client";

/**
 * PUBLIC_INTERFACE
 * listEvents fetches events from the backend. If the backend doesn't exist yet,
 * the UI can still run but will surface an error state.
 */
export async function listEvents() {
  return apiFetch("/events", { method: "GET" });
}

/**
 * PUBLIC_INTERFACE
 * createEvent creates a new event.
 * @param {object} payload
 */
export async function createEvent(payload) {
  return apiFetch("/events", { method: "POST", body: JSON.stringify(payload) });
}

/**
 * PUBLIC_INTERFACE
 * updateEvent updates an existing event by id.
 * @param {string} id
 * @param {object} payload
 */
export async function updateEvent(id, payload) {
  return apiFetch(`/events/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

/**
 * PUBLIC_INTERFACE
 * deleteEvent deletes an event by id.
 * @param {string} id
 */
export async function deleteEvent(id) {
  return apiFetch(`/events/${encodeURIComponent(id)}`, { method: "DELETE" });
}
