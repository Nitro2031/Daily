---
name: backend-integration
description: |
  IndexedDB / SQLite(WASM) / OPFS を用いたローカル永続化のガイド。
  データ保存・読み込み・マイグレーションを実装する際に参照される。
---

# Backend Integration Skill

## 永続化方式
- 初期：IndexedDB
- 拡張：SQLite(WASM) + OPFS

## 保存形式
- ChecklistItem[] を JSON として保存する。

## マイグレーション
- バージョン番号を保持し、変更時は移行処理を行う。

## バックアップ
- JSON / CSV のエクスポート・インポートを提供する。
