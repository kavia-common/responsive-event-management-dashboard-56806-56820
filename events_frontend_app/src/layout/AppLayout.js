import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import HeaderBar from "../shared/HeaderBar";
import Icon from "../shared/Icon";

/**
 * Simple route metadata for header titles.
 */
function usePageTitle() {
  const location = useLocation();
  return useMemo(() => {
    if (location.pathname.startsWith("/admin")) return "Admin Dashboard";
    if (location.pathname.startsWith("/events")) return "Events";
    return "Dashboard";
  }, [location.pathname]);
}

/**
 * PUBLIC_INTERFACE
 * AppLayout provides the global shell: sidebar navigation, header with notifications,
 * and a responsive content area.
 */
export default function AppLayout() {
  const title = usePageTitle();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="appShell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`} aria-label="Primary navigation">
        <div className="sidebar__brand">
          <div className="brandMark" aria-hidden="true">
            <span className="brandMark__dot" />
          </div>
          <div className="sidebar__brandText">
            <div className="sidebar__brandName">EventHub</div>
            <div className="sidebar__brandTag">Dashboard</div>
          </div>
        </div>

        <nav className="sidebar__nav">
          <NavLink
            to="/events"
            className={({ isActive }) => `navItem ${isActive ? "navItem--active" : ""}`}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon name="calendar" />
            <span>Events</span>
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) => `navItem ${isActive ? "navItem--active" : ""}`}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon name="shield" />
            <span>Admin</span>
          </NavLink>
        </nav>

        <div className="sidebar__footer">
          <div className="pill">
            <Icon name="link" />
            <span className="pill__text">
              {process.env.REACT_APP_FRONTEND_URL ? "Configured" : "No FRONTEND_URL"}
            </span>
          </div>
          <div className="sidebar__footnote">Theme: light • modern</div>
        </div>
      </aside>

      <div className="mainArea">
        <HeaderBar
          title={title}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
          sidebarOpen={sidebarOpen}
        />
        <main className="content" role="main">
          <Outlet />
        </main>
      </div>

      {sidebarOpen ? (
        <button
          type="button"
          className="backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
    </div>
  );
}
