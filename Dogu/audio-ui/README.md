# Dogu Audio UI

## 直接開ける静的版

`index.html` をブラウザでそのまま開くと、Node.js や npm がなくても音声教材を利用できます。

## Vite + Vue 版

Vite + Vue 版は `vite-app/` に移動しました。

### 実行手順（Node.js がインストールされている場合）

1. `cd Dogu/audio-ui`
2. `npm install`
3. `npm run dev`
4. ブラウザで `http://localhost:5173` を開く

## 現在の状態

- `audio-ui/index.html` : 直接開ける静的版
- `audio-ui/vite-app/index.html` : Vite + Vue 版のエントリ
- `audio-ui/public/` : 画像・音声アセット

## 注意

この環境では `node` / `npm` が見つからないため、Vite アプリの依存関係インストールはできませんでした。Node.js をインストールすると Vite 版も起動できます。
