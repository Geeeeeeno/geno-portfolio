/*
  作品の更新日（ここだけ直せば、トップのWorksカードと自己紹介ページの両方に反映されます）
  - updated: "YYYY-MM-DD"（日本時間）。確かめられない日付は書かずに null にすると表示しません。
  - 根拠: 各アプリの本番デプロイ日（2026-10-22 以前は Vercel、2026-10-31 から Cloudflare Pages）、またはこのリポジトリの git 履歴。
  - newDays: 更新日からこの日数のあいだ「NEW」ラベルを出します。
*/
window.GENO_WORKS = {
  newDays: 10,
  works: {
    "orica-pack":  { title: "パック開封",               cat: "遊戯王",     url: "https://orica-pack.pages.dev/",          updated: "2026-10-31" }, // Cloudflare Pages 本番 2026-10-31（第1期〜第13期）
    "orica-real9": { title: "本物カードで9枚",          cat: "遊戯王",     url: "https://orica-real9.pages.dev/",         updated: "2026-10-22" }, // Vercel本番 2026-10-22 14:31
    "orica-maker": { title: "オリカメーカー",           cat: "オリカ",     url: "https://orica-maker.pages.dev/",         updated: "2026-10-22" }, // Vercel本番 2026-10-22 09:48
    "orica-9":     { title: "私を構成する9枚（オリカ）", cat: "オリカ",     url: "https://orica-9.pages.dev/",             updated: "2026-10-22" }, // Vercel本番 2026-10-22 09:48
    "hoshiame":    { title: "ほしあめ夜市",             cat: "ゲーム",     url: "https://hoshiame-yoichi.pages.dev/",     updated: "2026-10-21" }, // GitHub main / Vercel本番 2026-10-21 20:11
    "maze":        { title: "ねこねこネオン迷路",       cat: "ゲーム",     url: "https://maze-time-attack.pages.dev/",    updated: "2026-10-21" }, // GitHub main / Vercel本番 2026-10-21 20:14
    "ai-gallery":  { title: "AIイラスト ギャラリー",    cat: "AIイラスト", url: "index.html#gallery",                      updated: "2026-10-19" }  // このリポジトリに画像を追加 2026-10-19
  }
};
