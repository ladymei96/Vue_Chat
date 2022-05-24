<script setup>
import ChatHeader from "@/components/ChatHeader.vue";
import ChatMain from "@/components/ChatMain.vue";
</script>

<template>
  <div class="flex flex-col">
    <ChatHeader class="flex-none" />
    <main class="grow">
      <ChatMain class="h-full" />
    </main>
  </div>
</template>
