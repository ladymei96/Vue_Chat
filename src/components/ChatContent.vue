<script setup>
import icSearch from "@/assets/ic_search.png";
import icnNote from "@/assets/ic_note.png";
import icnSent from "@/assets/ic_sent.png";
import icnClose from "@/assets/ic_close1.png";

import { reactive, ref } from "@vue/reactivity";
const props = defineProps({
  userName: {
    type: String,
    default: "保羅",
  },
});
const isSearchDisplay = ref(true);
const changeStatus = () => {
  isSearchDisplay.value = !isSearchDisplay.value;
};
const messageList = reactive(["保羅", "你好，我是潔西卡", "我喜歡吃的食物有", "各種巧克力口味的甜點"]);
/** 近來拿到 name 從 pinia 拿好了
 * 打 mock api 取回聊天紀錄
 * 加個 loading...
 */
</script>
<template>
  <div class="h-full flex flex-col">
    <header class="px-5 py-3 flex justify-between shadow-md relative z-10">
      <div class="flex items-center space-x-1.5">
        <div class="w-9 h-9 border border-emerald-400 rounded-full"></div>
        <p class="text-xl font-bold">{{ userName }}</p>
      </div>
      <div class="flex items-center space-x-1.5">
        <button
          class="hover:border rounded-full p-1 hover:bg-gray-100"
          @click="changeStatus()"
        >
          <img :src="icSearch" alt="search icon" class="w-8 h-8" />
        </button>
        <button class="btn--hover">
          <img :src="icnNote" alt="note icon" class="w-8 h-8" />
        </button>
      </div>
    </header>
    <div
      v-show="isSearchDisplay"
      class="border-b border-emerald-400 flex items-center"
    >
      <input
        type="text"
        class="w-5/6 px-6 py-4"
        :placeholder="$t('input.message')"
      />
      <div class="pr-6 flex space-x-4 ml-auto">
        <span class="text-gray-500">{{ $t("num.items", [1]) }}</span>
        <button>
          <img :src="icnClose" alt="sent icon" class="w-6" />
        </button>
      </div>
    </div>
    <div class="p-6 flex flex-col items-end justify-end space-y-1 flex-1">
      <p
        v-for="text of messageList"
        :key="text"
        class="px-5 py-1 bg-main-color text-white rounded-full"
      >
        {{ text }}
      </p>
    </div>
    <div class="relative border-t border-emerald-400">
      <input
        type="text"
        class="w-full px-4 py-6"
        :placeholder="$t('input.message')"
      />
      <button class="absolute right-10 top-4">
        <img :src="icnSent" alt="sent icon" class="w-10" />
      </button>
    </div>
  </div>
</template>
