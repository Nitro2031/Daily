# Copilot Instructions — Tree Checklist App (Vue3 + Vuetify3)

このプロジェクトは「ツリー形式チェックリスト（Daily/Weekly タスク管理）」を実装する Web アプリです。GitHub Copilot は以下の方針に従ってコード提案を行ってください。

Copilot は .github/skills 以下の SKILL.md を必要に応じて参照し、
architecture を中心仕様として扱うこと。

## 1. 技術スタックの前提
- Vue 3（Composition API）
- Vuetify 3
- JavaScript CDN
- Vite
- IndexedDB または SQLite(WASM) + OPFS（ローカル永続化）
- JSON/CSV バックアップ

## 2. UI 実装方針（Vuetify3）
- v-treeview を使用して階層構造を表示する。
- ノードは以下のプロパティを持つ：
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
- チェックボックス、折りたたみ、ドラッグ&ドロップ編集をサポートする。
- モバイル操作を前提に、タップ領域を広めにする。
- UI コンポーネントは BaseXxx.vue（汎用）と FeatureXxx.vue（機能別）に分ける。

## 3. データ永続化
- 初期は IndexedDB を使用し、将来的に SQLite(WASM) + OPFS に移行可能な構造にする。
- データは JSON として保存する。
- スキーマ変更時はバージョン番号を持ち、マイグレーション処理を行う。

## 4. 繰り返しロジック
### Daily
- 毎日 00:00 に checked = false にリセットする。
- 最終リセット日時を保存し、アプリ起動時に判定する。

### Weekly
- 毎週指定曜日にリセットする。
- 週の開始曜日は設定で変更可能。

### Manual Reset
- 全タスクを手動でリセットする機能も提供する。

## 5. ディレクトリ構成（推奨）
```
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
```
## 6. コーディング規約
- Composition API を使用する。
- ロジックは composable（useXxx()）に分離する。
- すべてのデータ構造に TypeScript 型を定義する。
- UI とロジックを混在させない。

## 7. Copilot に求める振る舞い
- 上記仕様に沿ったコード提案を行うこと。
- データモデル・繰り返しロジック・永続化方式を尊重すること。
- Vue3 + Vuetify3 のベストプラクティスに従うこと。
- 不要な外部ライブラリを提案しないこと。
- UI コンポーネントは再利用性を重視して提案すること。
- データ構造の変更が必要な場合は、理由と影響範囲をコメントで示すこと。

## 8. Copilot が優先的に生成すべきもの
- composable（useChecklist, useRepeat, useStorage）
- Treeview UI コンポーネント
- 永続化ロジック（IndexedDB / SQLite）
- バックアップ（JSON/CSV）処理
- Daily/Weekly リセット処理
- マイグレーション処理

## 9. Copilot が避けるべきもの
- Options API の使用
- UI とロジックの混在
- 不要な外部依存の追加
- データ構造を勝手に変更すること
- プロジェクト方針と異なる設計提案

## 10. 目的
このファイルは、GitHub Copilot が「ツリー形式チェックリストアプリを正しい設計方針で実装するためのガイド」として参照することを目的とする。
