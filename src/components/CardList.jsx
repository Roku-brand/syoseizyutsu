import React, { useMemo, useState } from "react";
import CardItem from "./CardItem.jsx";
import TagChips from "./TagChips.jsx";
import SearchBar from "./SearchBar.jsx";
import EmptyState from "./EmptyState.jsx";

export default function CardList({ cards }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState("id"); // id順デフォルト

  const allTags = useMemo(() => {
    const s = new Set();
    for (const c of cards) (c.tags || []).forEach((t) => s.add(t));
    return Array.from(s).sort((a, b) => a.localeCompare(b, "ja"));
  }, [cards]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const byQ = (c) => {
      if (!query) return true;
      const hay = `${c.title} ${c.summary} ${(c.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(query);
    };
    const byTag = (c) => (tag ? (c.tags || []).includes(tag) : true);

    const arr = cards.filter((c) => byQ(c) && byTag(c));
    if (sort === "id") return [...arr].sort((a, b) => (a.id > b.id ? 1 : -1));
    return arr;
  }, [cards, q, tag, sort]);

  return (
    <div>
      <div className="panel" style={{ padding: 14, marginBottom: 12 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <SearchBar q={q} setQ={setQ} />
          <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="id">ソート：id順（デフォルト）</option>
          </select>
        </div>
        <div className="hr" />
        <TagChips tags={allTags} active={tag} onChange={setTag} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="一致するカードがありません"
          note="検索条件やタグを変更してください。"
        />
      ) : (
        <div className="grid">
          {filtered.map((c) => (
            <CardItem key={c.id} card={c} />
          ))}
        </div>
      )}
    </div>
  );
}
