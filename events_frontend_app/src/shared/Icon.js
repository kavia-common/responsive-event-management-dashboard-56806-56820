import React from "react";

/**
 * A tiny inline icon set.
 */
const paths = {
  menu: "M4 6h16M4 12h16M4 18h16",
  bell: "M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0",
  search: "M21 21l-4.3-4.3m1.3-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  x: "M6 6l12 12M18 6L6 18",
  calendar:
    "M7 3v2M17 3v2M4 8h16M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2",
  shield:
    "M12 2l8 4v6c0 5-3.4 9.7-8 10-4.6-.3-8-5-8-10V6l8-4",
  map: "M9 18l-6 2V6l6-2 6 2 6-2v14l-6 2-6-2zM9 4v14M15 6v14",
  plus: "M12 5v14M5 12h14",
  edit: "M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.1l-1.8-1.8a1.5 1.5 0 0 0-2.1 0L4 16v4",
  trash: "M6 7h12M9 7V5h6v2m-7 3v10m4-10v10m4-10v10M8 7l1 14h6l1-14"
};

/**
 * PUBLIC_INTERFACE
 * Icon renders an inline SVG icon by name.
 */
export default function Icon({ name, size = 20 }) {
  const d = paths[name] || paths.search;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="icon"
    >
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
