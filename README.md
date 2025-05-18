# 📱 SearXNGでUBlacklist通知をモバイル最適化

## 📝 概要

このユーザースクリプトは、SearXNGの検索結果ページに表示される **UBlacklist の通知をモバイル表示時に見やすく再配置** します。  
スマートフォンやタブレットでの表示では、通知が検索フィルタと同一行に表示されて**折り返されてしまう**ことがあり、視認性が低下していました。  
このスクリプトは、通知をフィルタ行から**分離して独立した1行に表示**することで、レイアウトを崩さず明瞭に通知を確認できるようにします。

---

## 📦 主な特徴

- ✅ モバイル画面（768px以下）でのみ動作
- 🔍 UBlacklist通知を自動検出
- 📌 通知を `.search_filters` の直後に独立行として再配置
- 🎨 フォントサイズや余白を調整し自然な見た目に
- 🧠 `MutationObserver` により動的に変化するUIにも対応

---

## 🚀 インストール方法

1. ブラウザに **[Violentmonkey](https://violentmonkey.github.io/)** または **[Tampermonkey](https://www.tampermonkey.net/)** を導入  
2. スクリプトをインストール  
   👉 [このスクリプトをインストールする](https://raw.githubusercontent.com/koyasi777/searxng-ublacklist-mobile-notice-fix/main/searxng-ublacklist-notice-mobile-fix.user.js)

---

## 🌐 対応サイト

以下のような SearXNG インスタンスに対応：

```js
// @match        *://*/searx/search*
// @match        *://*/searxng/search*
// @match        *://searx.*/*
// @match        *://*.searx.*/*
```

---

## 🔧 技術的なポイント

- `window.matchMedia('(max-width: 768px)')` でモバイル判定
- `.ub-button` を含む `span` を対象に通知を検出
- `.search_filters` のスタイルに合わせて通知を再配置
- 通知を `<div>` で囲んで1行表示に統一（改行強制）
- `DOMContentLoaded`・`load`・`MutationObserver` で動的DOM対応

---

## 🧪 テスト済み環境

- ✅ Chrome (Tampermonkey)
- ✅ Firefox (Violentmonkey)
- ✅ Android / iOS モバイル表示

---

## 📜 ライセンス

MIT License  
自由に改変・再配布可能です。自己責任でご利用ください。

---

> 折り返される通知は、見逃される。  
> モバイルUIでも、伝えるべき情報はしっかり表示。
