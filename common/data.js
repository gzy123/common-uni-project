import { apiList } from "@/api";
import { nextTick } from "vue";
// 处理非法合适的数字格式
export const handleInput = (item, key, reg = /[^\d.]/g) => {
  const value = item[key];
  nextTick(() => {
    item[key] = value.replace(reg, "");
  });
};

export const getGlobalAllSelect = async () => {
  const { data } = await apiList.getGlobalAllSelectApi({
    query: {},
    hasLoading: false,
  });
  uni.setStorageSync("globalSelect", data);
  return Promise.resolve(data);
};
/**
 * 获取系统参数下拉列表
 * @param key
 * @param limit 显示轮询次数 防止服务挂了一直查询死循环
 * @returns
 */
export const getDictList = (key, limit = 2) => {
  try {
    const data = uni.getStorageSync("globalSelect");
    if (!data) {
      getGlobalAllSelect().then((res) => {
        uni.setStorageSync("globalSelect", res);
        limit -= 1;
        limit > 0 && getDictList(key, limit);
      });
    } else {
      return data[key];
    }
  } catch (error) {
    return [];
  }
};
// 获取字典组 文本
export const getDictGroupText = (dictName, value) => {
  const list = getDictList(dictName) || [];
  const item = list.find((item) => item.dictionaryCode === value);
  return item?.dictionaryName ?? "";
};
/**
 * 获取系统按钮权限
 * @param key
 * @param limit 显示轮询次数 防止服务挂了一直查询死循环
 * @returns
 */
export const showPermission = (key) => {
  try {
    const data = uni.getStorageSync("buttonList") || [];
    if (data?.length === 0) return false;
    return data.some((item) => item == key);
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const truncateString = (str, maxLength, suffix) => {
  if (typeof str !== "string") return "";
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + (suffix || "...");
  }
  return str;
};
