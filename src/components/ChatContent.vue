<script setup>
import icSearch from "@/assets/ic_search.png";
import icnNote from "@/assets/ic_note.png";
import icnSent from "@/assets/ic_sent.png";
import icnClose from "@/assets/ic_close1.png";
import MemoBlock from "@/components/MemoBlock.vue";

import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
import { chat, memo } from "@/stores";
import { fetchMessageData } from "@/api/chatService.js";

const chartStore = chat();
const memoStore = memo();

const isSearchDisplay = ref(false);
const isMemoDisplay = ref(false);
const searchKey = ref("");
const messageText = ref("");
const activeBtn = ref("");
const messageData = reactive({ data: {} });

const showSearchBar = () => {
  isMemoDisplay.value = false;
  isSearchDisplay.value = !isSearchDisplay.value;
};
const showMemoBlock = () => {
  isSearchDisplay.value = false;
  isMemoDisplay.value = !isMemoDisplay.value;
  memoStore.ChangeOpenStatus({
    name: chartStore.selectedName,
    status: isMemoDisplay.value,
  });
};
const resetInput = () => {
  messageText.value = "";
  searchKey.value = "";
};
const resetSearchBtn = () => {
  isSearchDisplay.value = false;
};
const initMemoDisplayValue = (name) => {
  isMemoDisplay.value = memoStore.totalMemoData[name].isOpen;
};
const getMessageData = async (name) => {
  messageData.data = await fetchMessageData(name);
};
const getMemoData = async (name) => {
  if (!memoStore.totalMemoData[name]?.list) {
    memoStore.GetMemoData(name);
  }
};

const showMessageList = computed(() => {
  if (!searchKey.value) return messageData.data?.list;
  const result = messageData.data.list.reduce((accum, currentEle) => {
    let newEle = currentEle;
    if (currentEle.includes(searchKey.value)) {
      newEle = currentEle.replace(
        searchKey.value,
        `<span class="bg-yellow-300 text-black">${searchKey.value}</span>`
      );
    }
    accum.push(newEle);
    return accum;
  }, []);
  return result;
});
const count = computed(() => {
  if (!messageData.data?.list) return 0;
  const result = showMessageList.value.filter((ele) => {
    return ele.includes("</span>");
  });
  return result.length;
});

watch(
  () => chartStore.selectedName,
  (newVal) => {
    resetInput();
    resetSearchBtn();
    getMessageData(newVal);
    getMemoData(newVal);
    initMemoDisplayValue(newVal);
  }
);
watchEffect(() => {
  activeBtn.value = isSearchDisplay.value
    ? "searchBtn"
    : isMemoDisplay.value
    ? "mempBtn"
    : "";
});

onMounted(async () => {
  getMessageData(chartStore.selectedName);
  getMemoData(chartStore.selectedName);
});
</script>
<template>
  <div class="h-full flex flex-col">
    <header class="px-5 py-3 flex justify-between shadow-md relative z-10">
      <div class="flex items-center space-x-1.5">
        <div class="w-9 h-9 border border-emerald-300 rounded-full"></div>
        <p class="text-xl font-bold">{{ messageData.data?.name }}</p>
      </div>
      <div class="flex items-center space-x-1.5">
        <button
          class="btn__basic btn__basic--hover"
          :class="{ 'btn__basic--active': activeBtn === 'searchBtn' }"
          @click="showSearchBar()"
        >
          <img :src="icSearch" alt="search icon" class="w-8 h-8" />
        </button>
        <button
          class="btn__basic btn__basic--hover"
          :class="{ 'btn__basic--active': activeBtn === 'mempBtn' }"
          @click="showMemoBlock()"
        >
          <img :src="icnNote" alt="note icon" class="w-8 h-8" />
        </button>
      </div>
    </header>
    <div
      v-show="isSearchDisplay"
      class="border-b border-emerald-300 flex items-center"
    >
      <input
        type="text"
        class="w-5/6 text-ellipsis px-6 py-4 focus:outline-none"
        :placeholder="$t('input.message')"
        v-model.trim="searchKey"
      />
      <div class="pr-6 flex space-x-4 ml-auto">
        <span class="text-gray-500">{{ $t("num.items", [count]) }}</span>
        <button @click="searchKey = ''">
          <img :src="icnClose" alt="close icon" class="w-6" />
        </button>
      </div>
    </div>
    <div class="p-6 flex flex-col items-end justify-end space-y-1 flex-1">
      <p
        v-for="text of showMessageList"
        :key="text"
        class="px-5 py-1 bg-main-color text-white rounded-full"
        v-html="text"
      ></p>
    </div>
    <div class="border-t border-emerald-300 flex items-center">
      <input
        type="text"
        class="w-90% text-ellipsis px-4 py-6 focus:outline-none"
        :placeholder="$t('input.message')"
        v-model="messageText"
      />
      <button class="ml-auto pr-6">
        <img :src="icnSent" alt="sent icon" class="w-10" />
      </button>
    </div>
    <MemoBlock v-show="isMemoDisplay" class="absolute right-2 top-36" />
  </div>
</template>
