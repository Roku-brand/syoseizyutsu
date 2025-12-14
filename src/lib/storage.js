const FAV_KEY = "shoseijutsu:favorites:v1";
const PERSONAL_KEY = "shoseijutsu:personalCards:v1";

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function saveFavorites(set) {
  const arr = Array.from(set);
  localStorage.setItem(FAV_KEY, JSON.stringify(arr));
}

export function toggleFavorite(id) {
  const favs = loadFavorites();
  if (favs.has(id)) favs.delete(id);
  else favs.add(id);
  saveFavorites(favs);
  return favs;
}

export function loadPersonalCards() {
  try {
    const raw = localStorage.getItem(PERSONAL_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function addPersonalCard(card) {
  const current = loadPersonalCards();
  const next = [card, ...current];
  localStorage.setItem(PERSONAL_KEY, JSON.stringify(next));
  return next;
}
