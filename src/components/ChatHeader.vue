<script setup>
import { onMounted, ref } from "vue";
import { setI18nLanguage } from "@/i18n";

const LANG_TYPE_TABLE = [
  {
    name: "中文",
    lang: "zh-TW",
  },
  {
    name: "English",
    lang: "en-US",
  },
];
const activeLang = ref("");
const changeLang = (lang) => {
  if (activeLang.value === lang) return;
  activeLang.value = lang;
  setI18nLanguage(lang);
};

onMounted(() => {
  if (!activeLang.value) {
    activeLang.value = localStorage.getItem("lang")
      ? localStorage.getItem("lang")
      : "zh-TW";
  }
});
</script>
<template>
  <header class="bg-main-color flex">
    <div class="py-5 px-6 flex w-5/6 items-center">
      <h1 class="chatTitle__primary">Cherri Chat</h1>
      <div class="ml-auto">
        <button
          type="button"
          v-for="btn of LANG_TYPE_TABLE"
          :key="btn.name"
          class="btn__primary first:mr-2"
          :class="{ 'btn--active': activeLang === btn.lang }"
          @click="changeLang(btn.lang), ($i18n.locale = btn.lang)"
        >
          {{ btn.name }}
        </button>
      </div>
    </div>
    <div class="px-6 flex items-center border-l">
      <div class="w-9 h-9 rounded-full bg-white mr-2"></div>
      <p class="chatTitle__primary">潔西卡</p>
    </div>
  </header>
</template>
