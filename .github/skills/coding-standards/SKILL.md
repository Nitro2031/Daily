name: coding-standards
description: |
  コーディング規約、命名規則、コンポーネント構造に関するガイド。
  Daily アプリの Vue 3 + Vuetify 3（CDN）+ SFC ローダー + Options API 構成に最適化された規約。
  コードを書く際に参照する。

# Coding Standards Skill

## 基本方針
- Vue 3 は CDN + グローバル API を使用する。
- .vue ファイルは loadVueComponent.js により template/script/style を動的ロードする。
- script は Options API（data / methods / computed）を使用する。
- TypeScript は使用しない（JavaScript のみ）。

---

## コンポーネント構造
- SFC は `<template>`, `<script>`, `<style>` の 3 要素を持つ。
- `<script>` は `export default { ... }` を返す。
- `<script setup>` は使用しない（ブラウザ実行環境では非対応）。
- `<style>` はスコープを使用しない（loadVueComponent.js により自動注入される）。

---

## 命名規則
- コンポーネント名：`BaseXxx.vue`（汎用） / `FeatureXxx.vue`（機能別）
- メソッド：動詞 + 名詞（例：`addItem`, `toggleCheck`, `saveData`）
- データ：名詞（例：`items`, `menu`, `selectedId`）
- イベント：`update:xxx` を基本とする
- ファイル名：ケバブケースは使用せず、パスカルケースで統一する（例：`TreeView.vue`）

---

## コーディングスタイル
- インデントはスペース 2 つ。
- セミコロンは使用しない。
- クォートはシングルクォートを使用する。
- 可能な限り、コードはシンプルで読みやすく保つ。
- 不要なコードやコメントは削除する。

---

## データ管理
- データは必ず `data()` 内で定義する。
- データの変更は必ず `this` を通じて行う（直接変更しない）。
- コンポーネント間の通信は props とイベントを使用する（グローバル状態管理は使用しない）。

---

## イベントハンドリング
- イベントハンドラーはできるだけシンプルに保ち、複雑なロジックはメソッドに切り出す。
- イベント名は `update:xxx` を基本とする（例：`update:count`）。

---

## CSS スタイル
- CSS は必要に応じてクラス名を付け、スタイルの重複を避ける。
- スコープは使用しない（loadVueComponent.js により自動注入されるため）。
- クラス名は BEM などの命名規則を使用して、スタイルの一貫性を保つ。

---

## コードの再利用性
- コードの再利用性を高めるため、共通のロジックは mixin やユーティリティ関数に切り出す。
- コンポーネントはできるだけ単一の責務を持つように設計する。
- 可能な限り、コードの一貫性を保つために同じスタイルで記述する。

---

## コードレビュー
- コードレビューを積極的に行い、品質を保つ。
- レビューでは、コードの可読性、保守性、パフォーマンス、セキュリティなどをチェックする。
- フィードバックは建設的に行い、改善点を具体的に指摘する。

---

## 分離された責務
- UI とロジックを混在させず、責務を明確に分離する。
- UI は template 内で完結させ、ロジックは script 内で完結させる。
- 永続化（IndexedDB / SQLite）は backend-integration に委譲する。
- ツリー構造の操作（追加・削除・移動）は domain.js に切り出す。
- コンポーネントは「表示とイベント発火」に専念する。

---

## コメントと可読性
- 関数の目的が明確でない場合は 1 行コメントを付ける。
- ネストは 3 階層以内に抑える。
- 長いメソッドは分割する。
- コメントは必要最低限に留め、コード自体が意図を伝えるようにする。

---

## パフォーマンスとセキュリティ
- 不必要な再レンダリングを避けるため、データの変更は最小限に抑える。
- ユーザー入力は適切にサニタイズし、XSS 攻撃などのセキュリティリスクを防ぐ。
- アクセシビリティを考慮し、適切な ARIA 属性を使用する。

---

## Vue 3 の使用
- Vue 3 を使用する際は、CDN からグローバル APIを使用する。
- Composition API の ref/reactive は使用せず、Options API を使用する。
- SFC ローダーも CDN から読み込む。
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/@vue/compiler-sfc@3/dist/compiler-sfc.global.js"></script>
```

---

## Options API の書き方
- data / methods / computed を明確に分離する。
- this を使用する前提で記述する。
- Composition API の ref/reactive は使用しない。

```js
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubled() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  }
}
```

---

## 禁止事項
- Composition API（setup, ref, reactive, computed など）
- script setup
- TypeScript
- スコープ付き style（scoped）
- UI と永続化ロジックの混在
- 1 ファイルに複数コンポーネントを定義すること

---

## 他の SKILL との関係
- アプリ構造は architecture/SKILL.md を参照する。
- UI の詳細は ui-design/SKILL.md を参照する。
- 状態管理は state-management/SKILL.md を参照する。
- 永続化は backend-integration/SKILL.md を参照する。
- テストは testing/SKILL.md を参照する。

---

## その他の規約
- 依存関係は最小限に抑える（外部ライブラリは必要な場合のみ）。
- パフォーマンスを考慮し、不要な再レンダリングを避ける。
- テストは可能な限り行い、コードの品質を保つ。
- ドキュメントは必要に応じて更新し、コードの意図を明確にする。
