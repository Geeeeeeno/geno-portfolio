# GENO / ジーノ — Portfolio

ジーノのポートフォリオサイトです。採用・テクノロジー・クリエイティブを軸に、制作物とプロフィールをまとめています。

## 構成

静的サイト（HTML / CSS / JS）です。ビルドや外部 CDN・外部フォントは使いません。

- `index.html` — ページ本体
- `style.css` — スタイル
- `main.js` — アニメーション・ナビ・ライトボックス
- `assets/` — 画像・favicon（Works のサムネイルは `assets/img/*-desktop.webp` / `*-mobile.webp`）

## ローカル確認

```bash
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080/` を開いてください。GitHub Pages のサブパス `/geno-portfolio/` でも相対パスのみで動作します。

## ライセンス

© 2026 GENO / ジーノ
