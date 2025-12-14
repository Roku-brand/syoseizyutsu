import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OS_DEFS } from "../lib/constants.js";
import { loadOSCards } from "../lib/data.js";
import CardList from "../components/CardList.jsx";
import LifeSpiral3D from "../components/LifeSpiral3D.jsx";

export default function OSList({ osKey: propOS, mode }) {
  const params = useParams();
  const nav = useNavigate();
  const osKey = propOS ?? params.osKey;

  const osDef = useMemo(() => OS_DEFS.find((o) => o.key === osKey), [osKey]);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");
    loadOSCards(osKey)
      .then((data) => {
        if (!alive) return;
        setCards(data);
        setLoading(false);
      })
      .catch((e) => {
        if (!alive) return;
        setErr(String(e?.message ?? e));
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [osKey]);

  if (!osDef) {
    return (
      <div className="panel detail">
        <h1>OSが見つかりません</h1>
        <button className="btn" onClick={() => nav("/")}>
          Homeへ
        </button>
      </div>
    );
  }

  // 人生OS（3D）
  const isLife = osKey === "life" || mode === "spiral";

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div className="sectionTitle">OS</div>
          <div style={{ fontSize: 20, fontWeight: 740 }}>{osDef.label}</div>
        </div>
        <button className="btn" onClick={() => nav("/")}>Home</button>
      </div>

      {loading && (
        <div className="panel detail">
          <p style={{ color: "rgba(255,255,255,.75)" }}>読み込み中…</p>
        </div>
      )}

      {!loading && err && (
        <div className="panel detail">
          <h1>読み込みエラー</h1>
          <p>{err}</p>
        </div>
      )}

      {!loading && !err && isLife ? (
        <>
          <div className="canvasWrap">
            <LifeSpiral3D cards={cards} />
          </div>
          <div className="helpText" style={{ marginTop: 12 }}>
            ヒント：カードをタップ/クリックすると詳細（2D）へ遷移します。
          </div>
        </>
      ) : null}

      {!loading && !err && !isLife ? (
        <CardList cards={cards} />
      ) : null}
    </div>
  );
}
