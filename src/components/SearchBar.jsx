import React from "react";

export default function SearchBar({ q, setQ }) {
  return (
    <input
      className="input"
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder="検索：タイトル / 要約 / タグ"
      aria-label="search"
    />
  );
}
