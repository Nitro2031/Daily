<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click="menu = !menu" />

        <v-menu v-model="menu" activator="parent">
            <v-list>
                <v-list-item @click="backupData">
                    <v-list-item-title>バックアップを保存</v-list-item-title>
                </v-list-item>

                <v-list-item @click="restoreBackup">
                    <v-list-item-title>バックアップをリストア</v-list-item-title>
                </v-list-item>

                <v-list-item @click="openSettings">
                    <v-list-item-title>設定</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            menu: false
        }
    },
    methods: {
        backupData() {
            // IndexedDB → JSON エクスポート
        },
        restoreBackup() {
            // JSON → IndexedDB インポート
            // ファイル選択ダイアログを開く
        },
        openSettings() {
            // 設定画面を開く
        }
    }
}
</script>
