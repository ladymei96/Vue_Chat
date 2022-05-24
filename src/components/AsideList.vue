<script setup>
import { reactive } from "vue";

const emit = defineEmits(["emitSelectUser"]);

const userList = reactive([
  {
    name: "保羅",
    text: "大家好，我是保羅~",
  },
  {
    name: "傑克",
    text: "大家好，我是傑克~",
  },
  {
    name: "傑森",
    text: "大家好，我是傑森~",
  },
]);
const emitSelectUser = (userName) => {
  emit("emitSelectUser", userName);
};
</script>

<template>
  <div>
    <header class="p-4">
      {{ `${$t("friends.list")}(${userList.length})` }}
    </header>
    <div
      v-for="user of userList"
      :key="user.name"
      class="p-4 border-t last:border-b border-emerald-400"
      @click="emitSelectUser(user.name)"
    >
      <div class="flex">
        <div
          class="w-11 h-11 border border-emerald-400 rounded-full mr-2"
        ></div>
        <div>
          <h3 class="text-xl font-bold">{{ user.name }}</h3>
          <p class="text-gray-500">{{ user.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
