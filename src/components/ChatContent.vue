<script setup>
import icSearch from "@/assets/ic_search.png";
import icnNote from "@/assets/ic_note.png";
import icnSent from "@/assets/ic_sent.png";
import icnClose from "@/assets/ic_close1.png";

import { onMounted, reactive, ref, watch } from "vue";
import { useChatStore } from "@/stores/chat.js";
import { fetchMessageData } from "@/api/chatService.js";

const chartStore = useChatStore();

const isSearchDisplay = ref(false);
const highlightText = ref("");
const messageText = ref("");
const messageData = reactive({ data: {} });

const changeStatus = () => (isSearchDisplay.value = !isSearchDisplay.value);
const resetInput = () => {
  messageText.value = "";
  highlightText.value = "";
};
const getMessageData = async (name) => {
  messageData.data = await fetchMessageData(name);
};
watch(
  () => chartStore.selectedName,
  (newVal) => {
    resetInput();
    getMessageData(newVal);
  }
);
onMounted(async () => {
  getMessageData(chartStore.selectedName);
});
</script>
<template>
  <div class="h-full flex flex-col">
    <header class="px-5 py-3 flex justify-between shadow-md relative z-10">
      <div class="flex items-center space-x-1.5">
        <div class="w-9 h-9 border border-emerald-400 rounded-full"></div>
        <p class="text-xl font-bold">{{ messageData.data?.name }}</p>
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
        class="w-5/6 text-ellipsis px-6 py-4 focus:outline-none"
        :placeholder="$t('input.message')"
        v-model="highlightText"
      />
      <div class="pr-6 flex space-x-4 ml-auto">
        <span class="text-gray-500">{{ $t("num.items", [1]) }}</span>
        <button @click="highlightText = ''">
          <img :src="icnClose" alt="sent icon" class="w-6" />
        </button>
      </div>
    </div>
    <div class="p-6 flex flex-col items-end justify-end space-y-1 flex-1">
      <p
        v-for="text of messageData.data.list"
        :key="text"
        class="px-5 py-1 bg-main-color text-white rounded-full"
      >
        {{ text }}
      </p>
    </div>
    <div class="border-t border-emerald-400 flex items-center">
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
  </div>
</template>
