import React from "react";
import "./PlatformFilter.css";

export default function PlatformFilter({ active, onChange }) {
  const options = [
    { value: "all", label: "All Platforms" },
    { value: "youtube", label: "▶ YouTube Shorts" },
    { value: "instagram", label: "◈ Instagram Reels" },
  ];
  return (
    <div className="platform-filter">
      {options.map((o) => (
        <button
          key={o.value}
          className={`pf-btn ${active === o.value ? "pf-btn--active" : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
