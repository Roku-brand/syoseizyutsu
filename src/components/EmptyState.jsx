import React from "react";

export default function EmptyState({ title, note }) {
  return (
    <div className="panel detail">
      <h1 style={{ fontSize: 18 }}>{title}</h1>
      <p style={{ color: "rgba(255,255,255,.72)" }}>{note}</p>
    </div>
  );
}
