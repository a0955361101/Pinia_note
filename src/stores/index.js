import { defineStore } from 'pinia';

// useStore 可以是 useUser、useCart 之類的任何東西
// 第一個參數是應用程序中 store 的唯一 id
export const useStore = defineStore('main', {
    // 推薦使用 完整類型推斷的箭頭函式
    state: () => {
        return {
            // 所有屬性都將自動推斷其類型
            count: 0,
            title: 'Pinia',
        };
    },
    getters: {
        // 自動將返回類型推斷為數字
        doubleCount: (state) => state.count * 2,
        doubleCountPlusOne () {
            return this.doubleCount + 1;
        },
    },
    actions: {
        increment () {
            this.count++;
        },
    }
});