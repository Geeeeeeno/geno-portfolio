# GENO / ジーノ — Portfolio

ジーノのポートフォリオサイトです。採用・テクノロジー・クリエイティブを軸に、制作物とプロフィールをまとめています。

## 公開URL

- メイン: https://geno-portfolio.pages.dev/ （Cloudflare Pages）
- 旧URL（停止は未定）: https://geno-portfolio-site.vercel.app/ （Vercel）、https://geeeeeeno.github.io/geno-portfolio/ （GitHub Pages）

## 構成

静的サイト（HTML / CSS / JS）です。ビルドは使いません（日本語フォントのみ Google Fonts の Noto Sans JP を読み込みます）。

- `index.html` — トップ（About / Works / Gallery）
- `about.html` — 自己紹介ページ（作品と更新日、使っている道具と技術）
- `works-data.js` — 作品の更新日と「NEW」表示の日数。日付はここだけ直せば両ページに反映
- `style.css` — スタイル
- `main.js` — アニメーション・ナビ・カテゴリー絞り込み・更新日表示・ライトボックス
- `sitemap.xml` / `robots.txt` — 検索エンジン向け（メインの Cloudflare Pages URL）
- `assets/` — 画像・favicon・apple-touch-icon・OGP画像（`assets/og/`）。Works のサムネイルは `assets/img/*-desktop.webp` / `*-mobile.webp`

Works の絞り込みは `?works=ygo|orica|game|ai|archive` で直接開けます（旧 `?works=real` は `ygo` に読み替え）。

## ローカル確認

```bash
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080/` を開いてください。GitHub Pages のサブパス `/geno-portfolio/` でも相対パスのみで動作します。

## ライセンス

© 2026 GENO / ジーノ
