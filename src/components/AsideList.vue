<script setup>
import { onMounted, reactive, ref } from "vue";
import { fetchFriendList } from "@/api/chatService.js";
import { chat } from "@/stores";

const chatStore = chat();
const friendList = reactive({ list: [] });
const activeFriend = ref("");

const selectFriend = (val) => {
  activeFriend.value = val;
  chatStore.selectedName = val;
};
const setActiveBackground = (val) => {
  return activeFriend.value === val ? "bg-neutral-100" : "";
};
onMounted(async () => {
  friendList.list = await fetchFriendList();
});
</script>

<template>
  <div class="relative z-10 shadow-r-sm">
    <header class="p-4">
      {{ `${$t("friends.list")}(${friendList.list.length})` }}
    </header>
    <div
      v-for="friend of friendList.list"
      :key="friend.name"
      class="p-4 border-t last:border-b border-emerald-300 hover:cursor-pointer"
      :class="setActiveBackground(friend.value)"
      @click="selectFriend(friend.value)"
    >
      <div class="flex">
        <div
          class="w-11 h-11 border border-emerald-300 rounded-full mr-2"
        ></div>
        <div>
          <h3 class="text-xl font-bold">{{ friend.name }}</h3>
          <p class="text-gray-500">{{ friend.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
