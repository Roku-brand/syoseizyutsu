import React from "react";
import { useNavigate } from "react-router-dom";
import { OS_DEFS } from "../lib/constants.js";

export default function OSGrid() {
  const nav = useNavigate();

  return (
    <div className="grid">
      {OS_DEFS.map((os) => (
        <div
          key={os.key}
          className="panel cardItem"
          role="button"
          tabIndex={0}
          onClick={() => (os.key === "life" ? nav("/life") : nav(`/os/${os.key}`))}
          onKeyDown={(e) => e.key === "Enter" && (os.key === "life" ? nav("/life") : nav(`/os/${os.key}`))}
        >
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
            {os.label}
          </div>
          <div style={{ color: "rgba(255,255,255,.68)", fontSize: 13, lineHeight: 1.55 }}>
            {os.key === "life"
              ? "3D螺旋でカードを選択し、詳細は2Dで閲覧します。"
              : "一覧・検索・タグフィルタ・ソート（id順）に対応。"}
          </div>
        </div>
      ))}
    </div>
  );
}
