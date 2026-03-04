name: architecture
description: |
 Daily（ツリー形式チェックリストアプリ）のアーキテクチャ設計ガイド。
 ブラウザのみで動作する Vue 3 + Vuetify 3 + JavaScript（CDN）構成を前提とし、
.vue ファイルを loadVueComponent.js で動的ロードする方式に対応する。
 データ構造、永続化、アプリ全体の構造、コンポーネント構成を設計・変更する際に参照される。

# Architecture Skill

## アプリ構造
- Vue 3（Composition API）を前提とする。
- UI とロジックは分離し、composable（useXxx）に集約する。
- データ永続化は IndexedDB または SQLite(WASM) + OPFS を使用する。

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

## モデル設計の基準
- `id` は UUID を使用する。
- `order` は兄弟ノード間の並び順を保証する。
- `children` は再帰構造を持つが、永続化時はフラット化してもよい。

## 永続化の方針
- 初期は IndexedDB を使用する。
- 大規模化した場合は SQLite(WASM) + OPFS に移行可能な構造にする。
- 永続化層は composable ではなく専用モジュールに切り出す。

## マイグレーション戦略
- DB バージョン番号を保持する。
- スキーマ変更時は migration.js に処理を追加する。
- 旧データは必ずバックアップしてから移行する。

## Tree 構造のアーキテクチャルルール
- 子タスクの完了状態は親に伝播させる（オプション）。
- 親のチェックは子に伝播させる（オプション）。
- 並び順は order によって管理する。
- ノードの追加・削除・移動は Domain Layer が担当する。

## 他の SKILL との関係
- UI の詳細は ui-design/SKILL.md を参照する。
- 状態管理は state-management/SKILL.md を参照する。
- 永続化は backend-integration/SKILL.md を参照する。
- コーディング規約は coding-standards/SKILL.md を参照する。
- テストは testing/SKILL.md を参照する。
