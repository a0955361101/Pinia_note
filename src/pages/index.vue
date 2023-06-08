<script setup>
import { useStore } from '../stores/index';
import { storeToRefs } from 'pinia';
const store = useStore();
const { title } = storeToRefs(store); // 解構測試
// title.value = 'test';
// console.log('title: ', title.value);


// store.increment(); // actions test

const handleState = () => {
    // 替換 state
    // 調用 $state 方法替換掉 store 整個狀態
    store.$state = {
        count: 2,
        title: 'Hello World'
    };

};

const handlePatch = () => {
    // 除了直接使用 store.count  修改值,也可以調用 $patch 方法
    // 它能同時應用多個更改
    // 用法一
    // store.$patch({
    //     count: store.count + 1,
    //     title: 'shadow'
    // });
    // 用法二
    store.$patch((state) => {
        store.count++;
        store.title = store.count % 2 === 0 ? '就在哪裡躺好' : '在哪裡跌倒';
    });
};


const handleCount = (event) => {
    if (event === '+') {
        // 通過 store 實例直接訪問狀態來讀取和寫入
        store.count++;
    } else if (event === '-' && store.count > 0) {
        store.count--;
    } else {
        // store 上的 $reset 方法將狀態重置為初始值
        store.$reset();
    }
};

// 訂閱狀態
store.$subscribe((mutation, state) => {
    mutation.type; // 'direct' | 'patch object' | 'patch function'
    mutation.storeId; //'main'
    mutation.payload; // to cartStore.$patch()
    // 當狀態發生變化時,持續儲存到本地端
    localStorage.setItem('state', JSON.stringify(state));
});

// store.$subscribe((callback) => { }, { detached: true }); // 讓訂閱在組件卸載後仍可保留


</script>

<template>
    <div class="title">
        {{ title }}
    </div>
    <div class="container">
        <button class="btn" @click="handleCount('+')">+</button>
        <input type="text" v-model="store.count">
        <button class="btn" @click="handleCount('-')">-</button>
    </div>
    <div>doubleCount: {{ store.doubleCount }}</div>
    <div>doubleCountPlusOne: {{ store.doubleCountPlusOne }}</div>
    <div class="btnWrap">
        <button class="btn" @click="handleCount('reset')">reset</button>
        <button class="btn" @click="handleState()">state</button>
        <button class="btn" @click="handlePatch()">patch</button>
    </div>
</template>

<style scope lang="scss">
.title {
    text-align: center;
    margin: 20px 0;
}

.container {
    display: flex;
    justify-content: center;

    input {
        max-width: 100px;
        text-align: center;
        border-radius: 6px;
        margin: 0 15px;
    }
}

.btnWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    button {
        margin-right: 6px;
    }
}
</style>