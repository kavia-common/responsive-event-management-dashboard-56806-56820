import React, { useMemo } from "react";
import Icon from "./Icon";

function nowTimeLabel() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * PUBLIC_INTERFACE
 * NotificationsPanel shows recent system notifications. This is UI-only for now.
 */
export default function NotificationsPanel({ open, onClose }) {
  const items = useMemo(
    () => [
      { id: "n1", title: "New event suggested", body: "A nearby meetup matches your interests.", time: nowTimeLabel() },
      { id: "n2", title: "Admin action required", body: "1 event is pending review.", time: nowTimeLabel() }
    ],
    []
  );

  if (!open) return null;

  return (
    <div className="notificationsPanel" role="dialog" aria-label="Notifications">
      <div className="notificationsPanel__header">
        <div className="notificationsPanel__title">
          <Icon name="bell" /> Notifications
        </div>
        <button type="button" className="iconButton" aria-label="Close notifications" onClick={onClose}>
          <Icon name="x" />
        </button>
      </div>
      <div className="notificationsPanel__body">
        {items.map((n) => (
          <div key={n.id} className="notifItem">
            <div className="notifItem__top">
              <div className="notifItem__title">{n.title}</div>
              <div className="notifItem__time">{n.time}</div>
            </div>
            <div className="notifItem__body">{n.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
