---
name: tree-checklist
description: |
  ツリー形式チェックリスト（Daily/Weeklyタスク管理）の実装方針。
  Vue3 + Vuetify3 を用いた UI、データ構造、永続化、繰り返しロジックの基準を定義する。
  チェックリスト機能・ツリー構造・繰り返し処理・ローカル永続化に関する実装時に参照する。
---

# Tree Checklist Skill Guide

## 1. アプリ概要
- ツリー形式のチェックリストを管理する Web アプリ。
- 「毎日」「毎週」などの繰り返しタスクを自動リセットできる。
- ローカルのみで動作し、ユーザーのデータはブラウザ内に保存される。
- 例: デイリーミッション、ゴミ捨て、習慣トラッキング。

---

## 2. 技術スタックの前提
- **Vue 3 (Composition API)**
- **Vuetify 3**
- **Vite**
- **JavaScript CDN**
- **IndexedDB または SQLite(WASM) + OPFS**（永続化）
- **JSON/CSV エクスポート**（バックアップ）

---

## 3. UI 実装方針（Vuetify3）

### 3.1 Treeview
- `v-treeview` を使用する。
- 各ノードは以下のプロパティを持つ：
  - `id`: 一意のID
  - `title`: 表示名
  - `children`: 子ノード
  - `checked`: チェック状態
  - `repeat`: `"daily" | "weekly" | "none"`
  - `order`: 並び順

### 3.2 操作性
- ノードの追加・編集・削除をモーダルまたはスライドパネルで行う。
- ドラッグ&ドロップで並び替え可能にする。
- モバイル操作を前提に、タップ領域を広めに確保する。

### 3.3 表示ルール
- チェック済みタスクは薄く表示する。
- 子タスクが全て完了した場合、親も自動で完了扱いにする（オプション）。
- 折りたたみ状態はローカルに保存する。

---

## 4. データモデル

```js
interface ChecklistItem {
  id: string;
  title: string;
  checked: boolean;
  repeat: 'none' | 'daily' | 'weekly';
  children: ChecklistItem[];
  order: number;
}

## 5. 永続化

- IndexedDB または SQLite(WASM) + OPFS を使用する。
- データは JSON として保存する。
- スキーマ変更時はバージョン番号を持ち、マイグレーション処理を行う。

## 6. バックアップ

- JSON または CSV 形式でエクスポート・インポートを提供する。
- バックアップデータにはバージョン番号を含める。

## 7. 繰り返しロジック

### 7.1 Daily
- 毎日 00:00 に checked = false にリセットする。
- 最終リセット日時を保存し、アプリ起動時に判定する。

### 7.2 Weekly
- 毎週指定曜日にリセットする。
- 週の開始曜日は設定で変更可能。

### 7.3 手動リセット
- 全タスクを手動でリセットする機能も提供する。

## 8. コーディング規約

- Vue 3 Composition API を使用する。
- useXxx() の形で composable を作成し、ロジックを分離する。
- すべてのデータ構造に TypeScript 型を定義する。
- UI コンポーネントは BaseXxx.vue（汎用）と FeatureXxx.vue（機能別）に分ける。

## 9. ディレクトリ構成（推奨）

src/
  components/
    Base/
    Checklist/
  composables/
    useChecklist.ts
    useRepeat.ts
    useStorage.ts
  db/
    schema.ts
    migration.ts
  pages/
  styles/

## 10. テスト方針

- 単体テスト：チェックロジック、繰り返しロジック、データ変換。
- UIテスト：Treeview の操作、ドラッグ&ドロップ。
- 永続化テスト：保存・読み込み・マイグレーション。

