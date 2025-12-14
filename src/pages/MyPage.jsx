import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadAllCards, loadOSCards } from "../lib/data.js";
import { addPersonalCard, loadFavorites, loadPersonalCards } from "../lib/storage.js";
import CardItem from "../components/CardItem.jsx";
import EmptyState from "../components/EmptyState.jsx";

function nowId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `P-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}

export default function MyPage() {
  const nav = useNavigate();

  const [all, setAll] = useState([]);
  const [fav, setFav] = useState(() => loadFavorites());
  const [personal, setPersonal] = useState(() => loadPersonalCards());
  const [extraCards, setExtraCards] = useState([]);

  const [form, setForm] = useState({
    id: nowId(),
    title: "",
    summary: "",
    essence: "",
    pitfalls: "",
    strategy: "",
    tags: ""
  });

  useEffect(() => {
    let alive = true;
    loadAllCards().then((cards) => {
      if (!alive) return;
      setAll(cards);
      setFav(loadFavorites());
    });
    loadOSCards("extra").then((cards) => {
      if (!alive) return;
      setExtraCards(cards);
    });
    return () => (alive = false);
  }, [personal.length]);

  const favCards = useMemo(() => {
    const ids = new Set(Array.from(fav));
    return all.filter((c) => ids.has(c.id));
  }, [all, fav]);

  const onAdd = () => {
    if (!form.title.trim() || !form.summary.trim()) {
      alert("タイトルと要約は必須です。");
      return;
    }
    const card = {
      id: form.id.trim() || nowId(),
      title: form.title.trim(),
      summary: form.summary.trim(),
      essence: form.essence.trim() || "（未記入）",
      pitfalls: form.pitfalls.trim() || "（未記入）",
      strategy: form.strategy.trim() || "（未記入）",
      tags: form.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      os: "extra"
    };
    const next = addPersonalCard(card);
    setPersonal(next);
    setForm({ id: nowId(), title: "", summary: "", essence: "", pitfalls: "", strategy: "", tags: "" });
    alert("追加しました（extraに反映）。");
  };

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div className="sectionTitle">My Page</div>
          <div style={{ fontSize: 20, fontWeight: 740 }}>マイページ（β）</div>
        </div>
        <button className="btn" onClick={() => nav("/")}>Home</button>
      </div>

      <div className="sectionTitle">お気に入り一覧（localStorage）</div>
      {favCards.length === 0 ? (
        <EmptyState title="お気に入りはまだありません" note="カード詳細からお気に入りに追加できます。" />
      ) : (
        <div className="grid">
          {favCards.map((c) => (
            <CardItem key={c.id} card={c} />
          ))}
        </div>
      )}

      <div className="sectionTitle" style={{ marginTop: 18 }}>個人追加（β）</div>
      <div className="panel" style={{ padding: 14 }}>
        <div className="helpText" style={{ marginBottom: 10 }}>
          追加カードは localStorage に保存され、OS「追加OS（仮）」(extra) の一覧に反映されます。
        </div>

        <div className="row">
          <input className="input" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="id（例：P-YYYYMMDD-HHMM）" />
          <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="タイトル（必須）" />
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <input className="input" style={{ minWidth: 320, flex: 1 }} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="要約（必須）" />
          <input className="input" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="タグ（カンマ区切り）例：交渉,距離感" />
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <input className="input" style={{ minWidth: 320, flex: 1 }} value={form.essence} onChange={(e) => setForm({ ...form, essence: e.target.value })} placeholder="本質" />
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <input className="input" style={{ minWidth: 320, flex: 1 }} value={form.pitfalls} onChange={(e) => setForm({ ...form, pitfalls: e.target.value })} placeholder="落とし穴" />
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <input className="input" style={{ minWidth: 320, flex: 1 }} value={form.strategy} onChange={(e) => setForm({ ...form, strategy: e.target.value })} placeholder="戦略" />
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={onAdd}>追加する</button>
          <button className="btn" onClick={() => nav("/os/extra")}>追加OSの一覧を見る</button>
        </div>
      </div>

      <div className="sectionTitle" style={{ marginTop: 18 }}>参考：追加OS（extra）現在の内容</div>
      {extraCards.length === 0 ? (
        <EmptyState title="extraが空です" note="上でカードを追加すると反映されます。" />
      ) : (
        <div className="grid">
          {extraCards.slice(0, 6).map((c) => (
            <CardItem key={c.id} card={c} />
          ))}
        </div>
      )}
    </div>
  );
}
