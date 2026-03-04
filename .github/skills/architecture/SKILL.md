name: architecture
description: |
  Daily（ツリー形式チェックリストアプリ）のアーキテクチャ設計ガイド。
  ブラウザのみで動作する Vue 3 + Vuetify 3 + JavaScript（CDN）構成を前提とし、
  .vue ファイルを loadVueComponent.js で動的ロードする方式に対応する。
  データ構造、永続化、アプリ全体の構造、コンポーネント構成を設計・変更する際に参照される。

---

# Architecture Skill

## アプリ構造（ブラウザ実行・CDN 前提）
- ビルドツール（Vite / Webpack）は使用しない。
- Vue 3 / Vuetify 3 は CDN で読み込む。
- `.vue` ファイルは SFC として扱うが、ブラウザで動的にロードする。
- `loadVueComponent.js` が template / script / style を抽出し、Vue コンポーネントとして登録する。
- ES Modules は使用せず、Vue のグローバル API（Vue.createApp など）を使用する。
- UI とロジックは分離し、composable（useXxx）に集約する。
- データ永続化は IndexedDB または SQLite(WASM) + OPFS（Origin Private File System） を使用する。

---

### ディレクトリ構成
```
Daily/
  .github/
    skills/
      architecture/
        SKILL.md
      ui-design/
        SKILL.md
      state-management/
        SKILL.md
      backend-integration/
        SKILL.md
      coding-standards/
        SKILL.md
      testing/
        SKILL.md
  src/
    components/
      ChecklistItem.vue
      ChecklistTree.vue
      ChecklistEditor.vue
    composables/
      useChecklist.js
    lib/
      loadVueComponent.js
    utils/
      indexedDB.js
      sqlite.js
    assets/
    styles/
    index.js
    index.html
    index.css
    index.vue
  README.md
```

---

## SFC（.vue）ファイルの構造ルール
- `<template>` `<script>` `<style>` の3要素を持つ。
- `<script>` は `export default { ... }` を返す。
- `<style>` はスコープを使わず、loadVueComponent.js により `<style>` タグとして自動注入される。
- Composition APIの `<script setup>` は使用しない（ブラウザ実行では扱えないため）。
- Composition API は使用せず、Options API（data / methods / computed）を基本とする。

---

## loadVueComponent.js の役割
- `.vue` ファイルを fetch で取得する。
- DOMParser で `<template>` を抽出し、Vue コンポーネントの template として設定する。
- `<script>` の内容を `new Function` で実行し、`export default` を取り込む。
- `<style>` を `<style data-path="...">` として head に注入する。
- 同一パスのコンポーネントはキャッシュし、重複ロードを防ぐ。

---

## アプリの初期化フロー
1. index.html で Vue / Vuetify / index.js を読み込む。
2. index.js 内で loadVueComponent.js を使い、index.vue を読み込む。
3. 必要なコンポーネント（TreeView.vue など）も動的に読み込む。
4. createApp(App).use(vuetify).mount('#app') で起動する。

---

## データモデル

```js
interface ChecklistItem {
  id: string;
  title: string;
  checked: boolean;
  repeat: 'none' | 'daily' | 'weekly';
  children: ChecklistItem[];
  order: number;
}
```

---

## モデル設計の基準
- `id` は UUID を使用する。
- `order` は兄弟ノード間の並び順を保証する。
- `children` は再帰構造を持つが、永続化時はフラット化してもよい。

---

## 永続化の方針
- 初期は IndexedDB を使用する。
- 大規模化した場合は SQLite(WASM) + OPFS に移行可能な構造にする。
- 永続化層は composable ではなく UI やコンポーネントから分離し、専用モジュールに切り出す。

---

## マイグレーション戦略
- DB バージョン番号を保持する。
- スキーマ変更時は migration.js に処理を追加する。
- 旧データは必ずバックアップしてから移行する。

---

## Tree 構造のアーキテクチャルルール
- 子タスクの完了状態は親に伝播させる（オプション）。
- 親のチェックは子に伝播させる（オプション）。
- 並び順は order によって管理する。
- ノードの追加・削除・移動は Domain Layer が担当する。

---

## 他の SKILL との関係
- UI の詳細は ui-design/SKILL.md を参照する。
- 状態管理は state-management/SKILL.md を参照する。
- 永続化は backend-integration/SKILL.md を参照する。
- コーディング規約は coding-standards/SKILL.md を参照する。
- テストは testing/SKILL.md を参照する。

---
