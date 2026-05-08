import React from "react";
import { Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * NotFoundPage is shown for unknown routes.
 */
export default function NotFoundPage() {
  return (
    <div className="page">
      <div className="panelCard panelCard--wide">
        <div className="panelCard__kicker">404</div>
        <div className="panelCard__value">Page not found</div>
        <div className="panelCard__hint">
          Return to <Link to="/events">Events</Link>.
        </div>
      </div>
    </div>
  );
}
