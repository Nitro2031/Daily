name: state-management
description: |
  Daily（ツリー形式チェックリストアプリ）の状態管理ガイド。
  Vue 3（CDN）+ SFC ローダー + Options API 構成に最適化し、
  UI・永続化層・ドメインロジックの責務を明確に分離する。

# State Management Skill

## 基本方針
- グローバルな状態管理ライブラリ（Vuex / Pinia）は使用しない。
- 状態は Options API の data / computed / methods で管理する。
- UI（コンポーネント）と永続化（IndexedDB / SQLite）の間に Domain Layer を置く。
- Domain Layer がツリー構造の操作（追加・削除・移動・チェック伝播）を担当する。

---

## 状態の種類
Daily の状態は 3 層に分かれる：

### 1. UI 状態（View State）
- メニューの開閉
- ノードの折りたたみ状態
- 選択中のノード ID
- 編集ダイアログの表示状態  
→ コンポーネント内の data で管理する。

### 2. アプリ状態（App State）
- ChecklistItem[]（ツリー構造）
- 今日の繰り返しタスクのリセット状態  
→ app.js または index.vue の data で管理する。

### 3. 永続化状態（Persistent State）
- IndexedDB / SQLite に保存されるデータ  
→ backend-integration が担当する。

---

## Domain Layer（状態管理の中心）
UI と永続化を直接つなげず、必ず Domain Layer を経由する。

### Domain Layer の責務
- ノードの追加
- ノードの削除
- ノードの移動（ドラッグ&ドロップ）
- チェック状態の伝播（親→子 / 子→親）
- 並び順（order）の更新
- ツリー構造の検索・再構築

### Domain Layer の例（domain.js）
```js
export function toggleCheck(item) {
  item.checked = !item.checked
  item.children.forEach(child => setCheckRecursive(child, item.checked))
}

export function setCheckRecursive(item, value) {
  item.checked = value
  item.children.forEach(child => setCheckRecursive(child, value))
}

export function addChild(parent, newItem) {
  parent.children.push(newItem)
  parent.children.sort((a, b) => a.order - b.order)
}
```

## Options API による状態管理
- data に ChecklistItem[] を保持する。
- computed で派生状態（未完了数など）を計算する。
- methods で Domain Layer を呼び出す。
```js
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    toggle(item) {
      toggleCheck(item)
      this.save()
    },
    save() {
      saveChecklist(this.items)
    }
  }
}
```

---

## 繰り返しタスク（repeat）の処理
- repeat は 'none' | 'daily' | 'weekly' を持つ。
- 日付が変わったタイミングで以下を行う：
 - daily → checked を false に戻す
 - weekly → 週初めに false に戻す
- この処理は app.js の起動時に実行する。

---

## データの同期
- UI 操作 → Domain Layer → 永続化 → UI 再描画
 という一方向の流れを守る。
- 永続化層は UI に直接触れない。
- UI は永続化層に直接触れない。

---

## 非同期処理
- IndexedDB / SQLite は Promise ベースで扱う。
- UI は await を使って保存完了を待つ。
- 保存中はローディング UI を表示する。

---

## 禁止事項
- Composition API（ref / reactive / setup）
- グローバル状態管理ライブラリ（Vuex / Pinia）
- UI コンポーネント内でツリー構造を直接操作すること
- 永続化ロジックを UI に書くこと
- children を直接書き換える複雑な処理（Domain Layer に委譲）

---

## 他の SKILL との関係
- アプリ構造は architecture/SKILL.md を参照する。
- UI の詳細は ui-design/SKILL.md を参照する。
- 永続化は backend-integration/SKILL.md を参照する。
- コーディング規約は coding-standards/SKILL.md を参照する。
- テストは testing/SKILL.md を参照する。
