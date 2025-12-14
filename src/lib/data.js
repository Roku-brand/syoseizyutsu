import { OS_DATA_PATH } from "./constants.js";
import { loadPersonalCards } from "./storage.js";

async function fetchJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

export async function loadOSCards(osKey) {
  const path = OS_DATA_PATH[osKey];
  const base = path ? await fetchJSON(path) : [];
  const personal = loadPersonalCards();

  // personal/extraは、extra一覧に反映（要件）
  if (osKey === "extra") {
    const personalExtra = personal.map((c) => ({ ...c, os: "extra" }));
    return normalize([...personalExtra, ...base]);
  }
  return normalize(base);
}

export async function loadAllCards() {
  const keys = Object.keys(OS_DATA_PATH);
  const list = await Promise.all(keys.map((k) => loadOSCards(k)));
  const all = list.flat();
  return normalize(all);
}

function normalize(cards) {
  const arr = Array.isArray(cards) ? cards : [];
  // id重複を避ける（後勝ち）
  const map = new Map();
  for (const c of arr) {
    if (!c?.id) continue;
    map.set(c.id, {
      id: String(c.id),
      title: String(c.title ?? ""),
      summary: String(c.summary ?? ""),
      essence: String(c.essence ?? ""),
      pitfalls: String(c.pitfalls ?? ""),
      strategy: String(c.strategy ?? ""),
      tags: Array.isArray(c.tags) ? c.tags.map(String) : [],
      os: String(c.os ?? "")
    });
  }
  // id順ソート（デフォルト要件）
  return Array.from(map.values()).sort((a, b) => (a.id > b.id ? 1 : -1));
}
