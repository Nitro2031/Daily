name: ui-design
description: |
  Daily（ツリー形式チェックリストアプリ）の UI 実装ガイド。
  Vue 3 + Vuetify 3（CDN）+ SFC ローダー方式を前提とし、
  TreeView、操作性、アクセシビリティ、UI コンポーネント作成時に参照される。

---

# UI Design Skill

## 基本方針
- Vue 3 / Vuetify 3 は CDN で読み込む。
- .vue ファイルは loadVueComponent.js により template/script/style を動的ロードする。
- script は Options API（data / methods / computed）を使用する。
- Vuetify コンポーネントはグローバル API（v-container, v-btn など）を使用する。
- モバイル操作を前提とし、タップ領域・操作性を最優先する。

---

## TreeView（チェックリストツリー）
- Vuetify の v-treeview を使用する。
- ノードは ChecklistItem 型に準拠する。
- チェックボックス、折りたたみ、ドラッグ&ドロップをサポートする。
- ノードの UI は以下を含む：
  - チェックボックス
  - タイトル
  - 子タスク数
  - 編集ボタン
  - 並び替えハンドル（ドラッグ用）

### 表示ルール
- チェック済みタスクは不透明度を下げて表示する。
- 子タスクがすべて完了したら親も完了扱いにできる（オプション）。
- 折りたたみ状態はローカルに保存する（localStorage または IndexedDB）。

---

## 操作性（モバイル最適化）
- タップ領域は 40px 以上を確保する。
- ノードの編集はモーダルまたはスライドパネルで行う。
- 長押しでドラッグ開始できるようにする。
- スクロールとドラッグが競合しないように UI を調整する。

---

## コンポーネント分類
- BaseXxx.vue（汎用 UI コンポーネント）
  - BaseButton.vue
  - BaseDialog.vue
  - BaseTextField.vue
- FeatureXxx.vue（機能別 UI コンポーネント）
  - TreeView.vue
  - ChecklistItem.vue
  - RepeatSetting.vue

---

## スタイルガイド
- SFC の `<style>` は loadVueComponent.js により自動注入される。
- スコープは使用しない（CDN + ローダー方式のため）。
- カラーパレットは Vuetify のテーマに準拠する。
- 余白は Vuetify の spacing utilities（pa-2, ma-3 など）を使用する。

---

## アクセシビリティ
- チェックボックスはキーボード操作に対応する。
- ノードの折りたたみは aria-expanded を設定する。
- 色だけで状態を判断させない（チェック済みはアイコン＋色で表現）。

---

## レイアウト
- 画面全体は v-container / v-main / v-app-bar を基本とする。
- モバイルでは 1 カラム、PC では 2 カラム以上を許容する。
- ヘッダーには以下を配置する：
  - 今日の日付
  - メニュー（設定・バックアップ）

---

## コンポーネント設計ルール
- Options API を使用し、data / methods / computed を明確に分離する。
- props は明示的に型（String, Number, Boolean, Array, Object）を指定する。
- emit は 'update:xxx' を基本とする。
- UI ロジックは UI コンポーネント内に閉じ込め、永続化ロジックは持たせない。

---

## TreeView の UI 状態管理
- 折りたたみ状態は UI 層で管理する（state-management とは分離）。
- チェック状態は ChecklistItem の checked を直接更新する。
- 並び替えは UI 層で order を更新し、永続化層に反映する。

---

## 他の SKILL との関係
- アプリ構造は architecture/SKILL.md を参照する。
- 状態管理は state-management/SKILL.md を参照する。
- 永続化は backend-integration/SKILL.md を参照する。
- コーディング規約は coding-standards/SKILL.md を参照する。
- テストは testing/SKILL.md を参照する。
