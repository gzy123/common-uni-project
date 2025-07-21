import { defineStore } from "pinia";
import { apiList } from "@/api";
import { getStorage } from "@/common/util";
/**
 * TODO: 获取当前初始数据 从缓存取，没有则设默认值 defaultVal
 * @param {*} data 缓存数据
 * @param {*} key 对应的数据key
 * @param {*} defaultVal 默认值
 * @returns key对应的值
 */
const getCurInitData = (data, key = "privacyAuth", defaultVal = 0) => {
  if (typeof data !== "string" || !data) return defaultVal;
  const userInfo = JSON.parse(data || "{}");
  return userInfo[key] || defaultVal;
};
export const useUserInfoStore = defineStore("userInfoStore", {
  state: () => {
    return {
      userInfo: null,
      showFlowRuleModal: uni.getStorageSync("showFlowRuleModal") || false,
    };
  },
  actions: {
    async getUserInfo(fn) {
      const token = uni.getStorageSync("token");
      if (!token) return;
      // 获取用户信息
      const { data } = await apiList.getUserInfo({
        query: {},
        hasLoading: false,
      });
      this.userInfo = data;
      typeof fn === "function" && fn(data);
      console.log("userInfo", data);
    },
    clearUserInfo() {
      this.userInfo = null;
      uni.removeStorageSync("token");
      return Promise.resolve();
    },
    saveUserInfo(info) {
      this.userInfo = info;
    },
    setShowFlowRuleModal(state) {
      this.showFlowRuleModal = state;
    },
    async getUserRecommendCode(fn) {
      const { data } = await $api.getUserInfo({
        query: {},
        hasLoading: false,
      });
      this.saveUserInfo(data);
      typeof fn === "function" && fn(data);
    },
    setPrivateLockState(state) {
      this.userInfo.privateLockState = state;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    // strategies: [{
    // 	storage: localStorage,
    // 	paths: ["userInfo", "user", "logo"],
    // }, ],
  },
});
