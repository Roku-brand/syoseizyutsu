export const OS_DEFS = [
  { key: "life", label: "人生OS", colorHint: "life" },
  { key: "internal", label: "心の扱い方（内部OS）", colorHint: "internal" },
  { key: "interpersonal", label: "コミュニケーションの極意（対人OS）", colorHint: "relation" },
  { key: "social", label: "社会での立ち回り（社会OS）", colorHint: "social" },
  { key: "action", label: "行動・習慣の技術（行動OS）", colorHint: "action" },
  { key: "future", label: "未来への対応策（未来OS）", colorHint: "future" },
  { key: "extra", label: "追加OS（仮）", colorHint: "extra" }
];

const rawBase = import.meta.env.BASE_URL || "/";
export const BASE_PATH = rawBase.replace(/\/$/, "") || "/";
const withBase = (path) => `${BASE_PATH}${path}`;

export const OS_DATA_PATH = {
  life: withBase("/data/life.json"),
  internal: withBase("/data/internal.json"),
  interpersonal: withBase("/data/relation.json"),
  social: withBase("/data/social.json"),
  action: withBase("/data/action.json"),
  future: withBase("/data/future.json"),
  extra: withBase("/data/extra.json")
};

export const TOP_COPY = `情報の洪水に終止符。これが決定版。
自己啓発・心理学・行動科学・対人術・キャリア論などを 5つのOS・195の項目 に集約した「処世術の体系書」`;

export const TOP_FIXED_GOAL_COPY = "7つのOS・200項目";
