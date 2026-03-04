---
name: coding-standards
description: |
  コーディング規約、命名規則、コンポーネント構造に関するガイド。
  コードを書く際に参照される。
---

# Coding Standards Skill

## Vue
- Composition API を使用する。
- Options API は使用しない。

## 命名
- composable: useXxx
- コンポーネント: BaseXxx.vue / FeatureXxx.vue

## 型定義
- すべてのデータ構造に TypeScript 型を定義する。

## 分離
- UI とロジックを混在させない。
