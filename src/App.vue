<script setup>
import ChatBlock from "@/components/ChatBlock.vue";
import AsideList from "@/components/AsideList.vue";
import { onMounted, getCurrentInstance } from "vue";
import { setI18nLanguage } from "@/i18n";

onMounted(() => {
  const { proxy } = getCurrentInstance();
  const vueInstance = proxy;
  if (!localStorage.getItem("lang")) {
    setI18nLanguage("zh-TW");
  }
  vueInstance.$i18n.locale = localStorage.getItem("lang");
});
</script>

<template>
  <div class="flex w-full h-screen">
    <AsideList class="w-1/5" />
    <ChatBlock class="w-4/5" />
  </div>
</template>
