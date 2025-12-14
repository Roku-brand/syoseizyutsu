import React from "react";
import { useNavigate } from "react-router-dom";
import { TOP_COPY, TOP_FIXED_GOAL_COPY } from "../lib/constants.js";
import OSGrid from "../components/OSGrid.jsx";

export default function Home() {
  const nav = useNavigate();

  return (
    <div>
      <div className="headerTitle">処世術禄</div>

      <div className="copyBox">
        <div style={{ whiteSpace: "pre-line" }}>{TOP_COPY}</div>
        <div className="hr" />
        <div className="badge">
          <span className="kbd">{TOP_FIXED_GOAL_COPY}</span>
          <span style={{ color: "rgba(255,255,255,.75)" }}>
            （将来の目標値として固定表示）
          </span>
        </div>
      </div>

      <div className="sectionTitle">Entry</div>
      <div className="panel cardItem">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 680 }}>人生OS（3D螺旋ギャラリー）</div>
            <div style={{ color: "rgba(255,255,255,.68)", fontSize: 13, marginTop: 4 }}>
              3Dは“選択UI”のみ。詳細は2Dで開きます。
            </div>
          </div>
          <button className="btn primary" onClick={() => nav("/life")}>
            開く
          </button>
        </div>
        <div className="helpText" style={{ marginTop: 10 }}>
          操作：ドラッグで回転／ホイールで上下移動（スマホは上下スワイプでも可）
        </div>
      </div>

      <div className="sectionTitle">OS</div>
      <OSGrid />
    </div>
  );
}
