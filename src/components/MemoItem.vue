<script setup>
import icnClose from "@/assets/ic_close2.png";

const porps = defineProps({
  memoData: {
    type: Object,
    default() {
      return {
        date: "yyyy/mm/dd hh:mm",
        text: "",
      };
    },
  },
});
const emit = defineEmits(["emitRemoveEvent"]);
</script>
<template>
  <div
    class="w-full px-3 py-2 h-1/4 border border-emerald-300 overflow-auto mb-3"
  >
    <div class="flex justify-between mb-2">
      <p class="text-main-color">{{ memoData.date }}</p>
      <button @click="emit('emitRemoveEvent')">
        <img :src="icnClose" alt="close icon" class="w-2" />
      </button>
    </div>
    <p class="break-all whitespace-normal">{{ memoData.text }}</p>
  </div>
</template>
