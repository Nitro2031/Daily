---
name: ui-design
description: |
  Vuetify3 を用いた UI 実装ガイド。
  Treeview、操作性、アクセシビリティ、UI コンポーネント作成時に参照される。
---

# UI Design Skill

## Treeview
- Vuetify の v-treeview を使用する。
- チェックボックス、折りたたみ、ドラッグ&ドロップをサポートする。
- ノードは ChecklistItem 型に準拠する。

## 操作性
- モバイル操作を前提にタップ領域を広めにする。
- ノード編集はモーダルまたはスライドパネルで行う。

## 表示ルール
- チェック済みタスクは薄く表示する。
- 子タスクがすべて完了したら親も完了扱いにできる（オプション）。
- 折りたたみ状態はローカルに保存する。

## コンポーネント分類
- BaseXxx.vue（汎用）
- FeatureXxx.vue（機能別）
