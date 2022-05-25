import { defineStore } from "pinia";

export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    selectedName: "",
    messageList: [],
  }),
  getters: {
    isEmpty: (state) => state.selectedName === "",
  },
  actions: {},
});
