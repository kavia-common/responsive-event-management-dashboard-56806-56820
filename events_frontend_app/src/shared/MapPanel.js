import React, { useMemo } from "react";
import Icon from "./Icon";

function hashToPercent(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 10_000;
  return h / 100;
}

/**
 * PUBLIC_INTERFACE
 * MapPanel is a lightweight placeholder "map" visualization without external map deps.
 * If a real map is needed later, this can be swapped for Mapbox/Google Maps.
 */
export default function MapPanel({ events }) {
  const pins = useMemo(() => {
    return (events || []).map((e) => {
      const key = String(e.location || e.venue || e.address || e.title || e.id || "");
      const x = hashToPercent(`${key}-x`);
      const y = hashToPercent(`${key}-y`);
      return { event: e, x, y };
    });
  }, [events]);

  return (
    <div className="mapLayout">
      <section className="mapCanvas" aria-label="Map view (placeholder)">
        <div className="mapCanvas__grid" aria-hidden="true" />
        {pins.map((p) => (
          <div
            key={p.event.id || p.event._id || `${p.event.title}-${p.x}-${p.y}`}
            className="mapPin"
            style={{ left: `${10 + p.x * 80}%`, top: `${10 + p.y * 80}%` }}
            title={p.event.title || p.event.name || "Event"}
            aria-label={p.event.title || p.event.name || "Event"}
          >
            <Icon name="map" size={16} />
          </div>
        ))}
        <div className="mapCanvas__legend">
          <span className="muted">Map is a UI placeholder.</span> Pins are deterministically placed from location text.
        </div>
      </section>

      <aside className="mapList" aria-label="Event list">
        <div className="mapList__header">
          <div className="mapList__title">
            <Icon name="calendar" /> Events ({events.length})
          </div>
        </div>
        <div className="mapList__items">
          {events.map((e) => (
            <div key={e.id || e._id || `${e.title}-${e.location}`} className="mapListItem">
              <div className="mapListItem__title">{e.title || e.name || "Untitled"}</div>
              <div className="mapListItem__sub truncate">{e.location || e.venue || e.address || "Unknown"}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
