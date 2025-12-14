import React from "react";

export default function TagChips({ tags, active, onChange }) {
  return (
    <div className="row">
      <button className={`chip ${active === "" ? "active" : ""}`} onClick={() => onChange("")}>
        すべて
      </button>
      {tags.map((t) => (
        <button
          key={t}
          className={`chip ${active === t ? "active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
