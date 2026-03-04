---
name: architecture
description: |
  ツリー形式チェックリストアプリのアーキテクチャ設計ガイド。
  データ構造、永続化、アプリ全体の構造を設計・変更する際に参照される。
---

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
