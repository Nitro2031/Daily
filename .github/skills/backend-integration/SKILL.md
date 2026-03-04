name: backend-integration
description: |
  IndexedDB / SQLite(WASM) / OPFS を用いたローカル永続化のガイド。
  データ保存・読み込み・マイグレーション・バックアップ/リストアを実装する際に参照される。

# Backend Integration Skill

## 永続化方式
- 初期実装は IndexedDB を使用する。
- 大規模化した場合は SQLite(WASM) + OPFS に移行可能な構造にする。
- 永続化層は UI やコンポーネントから分離し、専用モジュールとして実装する。
- データアクセスは Promise ベースで統一する。

---

## 保存形式
- ChecklistItem[] を JSON として保存する。
- ツリー構造は以下の形式を保持する：

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

- 保存時は children を含む完全なツリー構造を JSON 化する。
- SQLite へ移行する場合はフラット化して保存し、読み込み時に再構築する。

---

## IndexedDB の構造
- DB 名：`daily-db`
- ストア名：`checklist`
- キー：`id`
- 値：ChecklistItem（children を含む）

### 基本操作
- `saveChecklist(items: ChecklistItem[])`
- `loadChecklist(): ChecklistItem[]`
- `clearChecklist()`

---

## マイグレーション
- DB バージョン番号を保持する（例：`dbVersion = 1`）。
- スキーマ変更時は `onupgradeneeded` 内で移行処理を行う。
- 旧データはバックアップしてから変換する。
- マイグレーション処理は `migration.js` に分離する。

---

## バックアップ（エクスポート）
- ChecklistItem[] を JSON としてエクスポートする。
- ファイル名は `daily-backup-YYYYMMDD.json` とする。
- エクスポート時は以下を含む：

```json
{
  "version": 1,
  "exportedAt": "2026-03-04T12:00:00Z",
  "items": [...]
}
```

- バージョン番号を含めることで将来の互換性を確保する。

---

## リストア（インポート）
- JSON ファイルを読み込み、`items` を IndexedDB に保存する。
- バージョンが異なる場合は migration を実行する。
- リストア前にユーザーに確認ダイアログを表示する。
- リストア後は UI を再描画する（アプリを再ロードしてもよい）。

---

## SQLite(WASM) + OPFS への移行方針
- 大規模データ（数千ノード以上）になった場合に採用する。
- OPFS に SQLite ファイルを保存し、永続化する。
- テーブル構造例：

```
items(id TEXT PRIMARY KEY, parentId TEXT, title TEXT, checked INTEGER, repeat TEXT, order INTEGER)
```

- 読み込み時にツリー構造を再構築する。

---

## データ整合性
- ノードの追加・削除・移動は永続化層で一貫性を保証する。
- order の更新は UI 層で行い、永続化層に反映する。
- チェック状態の伝播（親→子 / 子→親）は Domain Layer で処理する。

---

## UI との連携
- UI は永続化層に直接アクセスしない。
- app.js または domain.js を介して永続化層を呼び出す。
- バックアップ/リストアは UI メニューから呼び出す。
