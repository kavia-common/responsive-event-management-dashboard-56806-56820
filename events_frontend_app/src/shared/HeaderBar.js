import React, { useMemo, useState } from "react";
import Icon from "./Icon";
import NotificationsPanel from "./NotificationsPanel";

/**
 * PUBLIC_INTERFACE
 * HeaderBar renders the top bar: hamburger for mobile, title, search, and notifications.
 */
export default function HeaderBar({ title, onToggleSidebar, sidebarOpen }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const envLabel = useMemo(() => process.env.REACT_APP_NODE_ENV || "development", []);

  return (
    <header className="headerBar">
      <div className="headerBar__left">
        <button
          type="button"
          className="iconButton headerBar__menuButton"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
        >
          <Icon name="menu" />
        </button>
        <div className="headerBar__titleBlock">
          <h1 className="headerBar__title">{title}</h1>
          <div className="headerBar__subtitle">
            Environment: <span className="mono">{envLabel}</span>
          </div>
        </div>
      </div>

      <div className="headerBar__center" role="search">
        <div className="searchField">
          <Icon name="search" />
          <input
            className="searchField__input"
            type="search"
            placeholder="Search events, locations, hosts..."
            aria-label="Search"
            onChange={() => {
              // Intentionally no global search in this scope; pages own filtering.
            }}
          />
        </div>
      </div>

      <div className="headerBar__right">
        <button
          type="button"
          className="iconButton"
          aria-label="Notifications"
          aria-expanded={notificationsOpen ? "true" : "false"}
          onClick={() => setNotificationsOpen((v) => !v)}
        >
          <span className="badgeDot" aria-hidden="true" />
          <Icon name="bell" />
        </button>

        <div className="userChip" aria-label="Current user">
          <span className="userChip__avatar" aria-hidden="true">
            U
          </span>
          <span className="userChip__name">User</span>
        </div>
      </div>

      <NotificationsPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </header>
  );
}
