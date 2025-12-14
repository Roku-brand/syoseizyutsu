import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardItem({ card }) {
  const nav = useNavigate();

  return (
    <div
      className="panel cardItem"
      role="button"
      tabIndex={0}
      onClick={() => nav(`/card/${encodeURIComponent(card.id)}`)}
      onKeyDown={(e) => e.key === "Enter" && nav(`/card/${encodeURIComponent(card.id)}`)}
    >
      <div className="badge">
        <span className="kbd">{card.id}</span>
        <span style={{ color: "rgba(255,255,255,.72)" }}>{card.os}</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 16, fontWeight: 760 }}>
        {card.title}
      </div>
      <div style={{ marginTop: 6, color: "rgba(255,255,255,.70)", fontSize: 13, lineHeight: 1.55 }}>
        {card.summary}
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {(card.tags || []).slice(0, 4).map((t) => (
          <span key={t} className="kbd">{t}</span>
        ))}
      </div>
    </div>
  );
}
