<script setup>
import ChatContent from "@/components/ChatContent.vue";
import AsideList from "@/components/AsideList.vue";
</script>

<template>
  <div class="flex w-full h-screen">
    <AsideList class="w-1/5" />
    <ChatContent class="w-4/5" />
  </div>
</template>
