import { defineStore } from "pinia";
import { fetchMemoData, SetLocalMemoData } from "@/api/memoService.js";

export const useMemoStore = defineStore({
  id: "memo",
  state: () => ({
    totalMemoData: {},
  }),
  actions: {
    InitMemoData(name) {
      this.totalMemoData[name] = {};
      this.totalMemoData[name].isOpen = false;
    },
    GetMemoData(name) {
      const res = fetchMemoData(name);
      if (!this.totalMemoData[name]) {
        this.InitMemoData(name);
      }
      this.totalMemoData[name].list = res;
    },
    AddMemoData({ name = "", data = {} }) {
      this.totalMemoData[name].list.push(data);
      this.UpadteMemoDataList(name);
    },
    RemoveMemoData({ index, name = "" }) {
      this.totalMemoData[name].list.splice(index, 1);
      this.UpadteMemoDataList(name);
    },
    UpadteMemoDataList(name) {
      const params = {
        name,
        data: this.totalMemoData[name].list,
      };
      SetLocalMemoData(params);
    },
    ChangeOpenStatus({ name = "", status }) {
      this.totalMemoData[name].isOpen = status;
    },
  },
});
