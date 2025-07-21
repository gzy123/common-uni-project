import { defineStore } from "pinia";
import { apiList } from "@/api";

export const useBussniessStore = defineStore("useCityInfoStore", {
  state: () => {
    return {
      systemData: {},
    };
  },
  actions: {
    async getInitSystemParam(fn) {
      const { data } = await apiList.initSystemParam({
        query: {},
        hasLoading: false,
      });
      uni.setStorageSync("systemData", data || {});
      typeof fn === "function" && fn(data);
    },
  },
  persist: {
    enabled: true,
  }, // 开启持久化
});
