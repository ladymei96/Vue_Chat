<script setup>
import MemoItem from "@/components/MemoItem.vue";
import { chat, memo } from "@/stores";
import { computed, ref } from "vue";
import { getCurrentDate } from "@/utils/date.js";

const chatStore = chat();
const memoStore = memo();

const memoText = ref("");

const addMemoItem = () => {
  if (!memoText.value) return;
  const currentDate = getCurrentDate();
  memoStore.AddMemoData({
    name: chatStore.selectedName,
    data: {
      date: currentDate,
      text: memoText.value,
    },
  });
  resetMemoText();
};
const removeMemoItem = (index) => {
  memoStore.RemoveMemoData({
    index: index,
    name: chatStore.selectedName,
  });
};

const resetMemoText = () => (memoText.value = "");

const memoList = computed(() => {
  const list = memoStore.totalMemoData[chatStore.selectedName]?.list;
  return list ? list : [];
});
</script>
<template>
  <div
    class="p-6 w-1/4 h-4/6 rounded-md border bg-white shadow-md overflow-auto"
  >
    <textarea
      name="memo"
      id="momo"
      cols="33"
      rows="5"
      class="w-full border border-main-color"
      :placeholder="$t('input.message')"
      v-model.trim="memoText"
    >
    </textarea>
    <button
      class="w-full py-1 mt-1 bg-main-color text-white"
      @click="addMemoItem"
    >
      {{ $t("add.message") }}
    </button>
    <hr v-show="memoList.length" class="my-4 border-1 border-emerald-300" />
    <MemoItem
      v-for="(memo, index) of memoList"
      :key="memo.date"
      :memoData="memo"
      :memoIndex="index"
      @emitRemoveEvent="removeMemoItem(index)"
    />
  </div>
</template>
