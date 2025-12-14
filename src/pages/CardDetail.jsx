import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadAllCards } from "../lib/data.js";
import { loadFavorites, toggleFavorite } from "../lib/storage.js";

export default function CardDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const decodedId = useMemo(() => decodeURIComponent(id || ""), [id]);

  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favSet, setFavSet] = useState(() => loadFavorites());

  useEffect(() => {
    let alive = true;
    setLoading(true);
    loadAllCards()
      .then((cards) => {
        if (!alive) return;
        setAll(cards);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setAll([]);
        setLoading(false);
      });
    return () => (alive = false);
  }, []);

  const card = useMemo(() => all.find((c) => c.id === decodedId), [all, decodedId]);
  const isFav = favSet.has(decodedId);

  if (loading) {
    return (
      <div className="panel detail">
        <p style={{ color: "rgba(255,255,255,.75)" }}>読み込み中…</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="panel detail">
        <h1>カードが見つかりません</h1>
        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn" onClick={() => nav(-1)}>戻る</button>
          <button className="btn" onClick={() => nav("/")}>Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="panel detail">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="meta">
          <span className="kbd">{card.id}</span>
          <span className="kbd">{card.os}</span>
        </div>
        <div className="row">
          <button className="btn" onClick={() => nav(-1)}>戻る</button>
          <button className="btn" onClick={() => nav("/")}>Home</button>
        </div>
      </div>

      {/* 1. タイトル */}
      <h1 style={{ marginTop: 10 }}>{card.title}</h1>

      {/* 2. 要約 */}
      <h2>要約</h2>
      <p>{card.summary}</p>

      {/* 3. 本質 */}
      <h2>本質</h2>
      <p>{card.essence}</p>

      {/* 4. 落とし穴 */}
      <h2>落とし穴</h2>
      <p>{card.pitfalls}</p>

      {/* 5. 戦略 */}
      <h2>戦略</h2>
      <p>{card.strategy}</p>

      {/* 6. タグ表示、id表示 */}
      <h2>タグ / ID</h2>
      <div className="row" style={{ marginTop: 6 }}>
        <span className="kbd">{card.id}</span>
        {(card.tags || []).map((t) => (
          <span key={t} className="kbd">{t}</span>
        ))}
      </div>

      {/* 7. お気に入りボタン（β） */}
      <h2>お気に入り（β）</h2>
      <div className="row" style={{ marginTop: 6 }}>
        <button
          className={`btn ${isFav ? "primary" : ""}`}
          onClick={() => setFavSet(toggleFavorite(decodedId))}
        >
          {isFav ? "お気に入り解除" : "お気に入りに追加"}
        </button>
        <button className="btn" onClick={() => nav("/me")}>マイページβへ</button>
      </div>

      <div className="smallEnd">このカードはここで完結します</div>
    </div>
  );
}
