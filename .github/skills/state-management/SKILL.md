---
name: state-management
description: |
  チェックリストの状態管理、繰り返しロジック、チェック状態の更新に関するガイド。
  状態管理ロジックを実装・変更する際に参照される。
---

# State Management Skill

## 状態管理の原則
- Composition API を使用する。
- useChecklist / useRepeat / useStorage にロジックを分離する。

## 繰り返しロジック

### Daily
- 毎日 00:00 に checked = false にリセット。
- 最終リセット日時を保存し、起動時に判定。

### Weekly
- 毎週指定曜日にリセット。
- 週の開始曜日は設定可能。

### Manual Reset
- 全タスクを手動でリセット可能。

## チェック状態の伝播
- 子が全て完了 → 親も完了扱い（オプション）
- 親をチェック → 子もチェック（オプション）
