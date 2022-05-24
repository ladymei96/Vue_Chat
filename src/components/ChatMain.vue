<script setup>
import ChatContent from "@/components/ChatContent.vue";
import imgDefault from "@/assets/img_default.png";
import { ref } from "@vue/reactivity";

const isEmpty = ref(false);
</script>
<template>
  <div>
    <div
      v-if="isEmpty"
      class="flex flex-col items-center justify-center h-full"
    >
      <img :src="imgDefault" alt="chat image" class="w-1/5 mb-4" />
      <p class="text-2xl text-main-color font-bold">開始使用Cherri Chat!</p>
    </div>
    <ChatContent v-else />
  </div>
</template>
