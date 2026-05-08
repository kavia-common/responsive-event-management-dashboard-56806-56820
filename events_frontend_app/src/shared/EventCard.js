import React, { useMemo } from "react";
import Icon from "./Icon";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString([], { weekday: "short", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

/**
 * PUBLIC_INTERFACE
 * EventCard renders an event summary with edit/delete actions.
 */
export default function EventCard({ event, onEdit, onDelete, deleting }) {
  const title = event.title || event.name || "Untitled event";
  const when = useMemo(() => formatDate(event.date || event.startTime || event.startsAt), [event.date, event.startTime, event.startsAt]);
  const location = event.location || event.venue || event.address || "Unknown location";
  const category = event.category || event.tag || "General";
  const description = event.description || event.summary || "";

  return (
    <article className="eventCard">
      <div className="eventCard__top">
        <div className="eventCard__title">{title}</div>
        <div className="eventCard__badge">{category}</div>
      </div>

      <div className="eventCard__meta">
        <div className="metaRow">
          <Icon name="calendar" />
          <span>{when}</span>
        </div>
        <div className="metaRow">
          <Icon name="map" />
          <span className="truncate">{location}</span>
        </div>
      </div>

      {description ? <div className="eventCard__desc">{description}</div> : <div className="eventCard__desc muted">No description</div>}

      <div className="eventCard__actions">
        <button type="button" className="ghostButton" onClick={onEdit} aria-label="Edit event">
          <Icon name="edit" /> Edit
        </button>
        <button
          type="button"
          className="dangerButton"
          onClick={onDelete}
          aria-label="Delete event"
          disabled={deleting}
        >
          <Icon name="trash" /> Delete
        </button>
      </div>
    </article>
  );
}
