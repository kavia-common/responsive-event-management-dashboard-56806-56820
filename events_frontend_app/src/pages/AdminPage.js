import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminSummary } from "../api/admin";
import Icon from "../shared/Icon";

/**
 * PUBLIC_INTERFACE
 * AdminPage provides a dedicated admin dashboard panel.
 */
export default function AdminPage() {
  const summaryQuery = useQuery({
    queryKey: ["admin", "summary"],
    queryFn: fetchAdminSummary,
    staleTime: 20_000,
    retry: 1
  });

  const summary = useMemo(() => {
    const d = summaryQuery.data;
    if (!d) return null;
    return {
      users: d.users ?? d.userCount ?? null,
      events: d.events ?? d.eventCount ?? null,
      reports: d.reports ?? d.reportCount ?? null,
      pending: d.pending ?? d.pendingCount ?? null
    };
  }, [summaryQuery.data]);

  return (
    <div className="page">
      <div className="adminHero">
        <div className="adminHero__left">
          <div className="adminHero__title">Admin controls</div>
          <div className="adminHero__subtitle">
            Monitor platform health, manage event quality, and track basic metrics.
          </div>
        </div>
        <div className="adminHero__right">
          <div className="pill pill--warn">
            <Icon name="shield" />
            <span className="pill__text">Restricted area</span>
          </div>
        </div>
      </div>

      {summaryQuery.isLoading ? (
        <div className="adminGrid" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="panelCard" key={i}>
              <div className="panelCard__kicker skeletonLine" />
              <div className="panelCard__value skeletonLine skeletonLine--big" />
              <div className="panelCard__hint skeletonLine" />
            </div>
          ))}
        </div>
      ) : summaryQuery.isError ? (
        <div className="errorPanel" role="alert">
          <div className="errorPanel__title">Admin summary unavailable</div>
          <div className="errorPanel__body">
            {String(summaryQuery.error?.message || "Unknown error")}
            <div className="errorPanel__hint">
              If your backend doesn’t expose <span className="mono">/admin/summary</span>, this page will show limited
              info only.
            </div>
          </div>
        </div>
      ) : (
        <div className="adminGrid">
          <AdminCard label="Users" value={summary?.users} hint="Total registered users" icon="shield" />
          <AdminCard label="Events" value={summary?.events} hint="All events in the system" icon="calendar" />
          <AdminCard label="Reports" value={summary?.reports} hint="Flagged items requiring review" icon="bell" />
          <AdminCard label="Pending" value={summary?.pending} hint="Items awaiting moderation" icon="edit" />
        </div>
      )}

      <div className="panelCard panelCard--wide">
        <div className="panelCard__kicker">Operational notes</div>
        <div className="panelCard__hint">
          Configure API connectivity via <span className="mono">REACT_APP_API_BASE</span> or{" "}
          <span className="mono">REACT_APP_BACKEND_URL</span>. WebSocket base (optional) via{" "}
          <span className="mono">REACT_APP_WS_URL</span>.
        </div>
        <div className="divider" />
        <ul className="bullets">
          <li>Review new events for spam and duplicates.</li>
          <li>Track reports volume and address recurring sources.</li>
          <li>Use the Events page to edit or remove problematic listings.</li>
        </ul>
      </div>
    </div>
  );
}

function AdminCard({ label, value, hint, icon }) {
  const display = value === null || value === undefined ? "—" : String(value);
  return (
    <div className="panelCard">
      <div className="panelCard__kicker">
        <Icon name={icon} /> {label}
      </div>
      <div className="panelCard__value">{display}</div>
      <div className="panelCard__hint">{hint}</div>
    </div>
  );
}
