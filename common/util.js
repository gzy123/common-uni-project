import { apiList } from "@/api";
import { useUserInfoStore } from "@/store/useUserInfoStore";
// 验证手机号格式
export const isMobile = (mobile) => {
  return /^1[3-9]\d{9}$/.test(mobile);
};
export const isEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
// 判断微信环境
export const isWeiXin = function () {
  let ua = window.navigator.userAgent.toLowerCase();
  const b = ua.match(/MicroMessenger/i);
  return b && b.length > 0;
};
/**
 * 把参数拼接到目标url上
 * @param  {String} url
 * @param  {Object || Array} arr
 * 传入参数字符串数组，或对象
 * ['a=1','b=2'] || {a: '1', b: '2'}
 *  @return {String}
 */
export const getParamStr = function (url, arr) {
  let resultStr = "";
  let resultURL = "";
  if (arr instanceof Array) {
    resultStr = arr.join("&");
  } else if (typeof arr === "object") {
    const paramArr = [];
    Object.keys(arr).map((key) => {
      arr[key] != null && paramArr.push(`${key}=${arr[key]}`);
    });
    resultStr = paramArr.join("&");
  }
  if (url.indexOf("?") > -1) {
    resultURL = resultStr === "" ? `${url}` : `${url}&${resultStr}`;
  } else {
    resultURL = resultStr === "" ? `${url}` : `${url}?${resultStr}`;
  }
  return resultURL;
};
/**
 * 把参数拼接
 * @param  {Object} obj
 * 传入对象
 * {a: '1', b: '2', c: '3'}
 *  @return {String} a=1&b=2&c=3格式
 */
export const getQueryStr = (obj = {}) => {
  const isObject = Object.prototype.toString.call(obj) !== "[object Object]";
  if (isObject) return "";
  const params = [];
  const sortList = Object.keys(obj).sort();
  sortList.map((key) => {
    !isEmpty(obj[key]) && params.push(`${key}=${obj[key]}`);
  });
  return params.join("&");
};
/**
 * 数字千分位
 * @param {string number} value
 * @param {string} empty 为空时要展示的值
 * @return {String}
 */
export const toCommaStyle = (num, empty = "--") => {
  if (isEmpty(num)) {
    return empty;
  }
  const intNum = num.toString().split(".")[0];
  const decimals = num.toString().split(".")[1];
  if (decimals != null) {
    return intNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + decimals;
  } else {
    return intNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
export const isEmpty = function (val) {
  return val === "" || val == null || val === false;
};

/**
 * 生成图片全路径
 * @param {*} path
 * @returns
 */
export const createFileAllPath = (path) => {
  if (isEmpty(path)) return "";
  const systemData = uni.getStorageSync("systemData") || {};
  return path.indexOf("http") !== -1
    ? path
    : `${systemData.fileDomainName?.replace(/(\s*$)/g, "")}${path}`;
};
/**
 * 通用处理非空参数
 * list 当前检测目标 key列表
 * rules 当前检测目标 key对应的校验规则
 * source 当前检测目标
 */
export const handleEmpty = (list, rules, source) => {
  let tip = "";
  for (let index = 0; index < list.length; index++) {
    const element = list[index]; // 当前key
    const value = source[element]; // 当前key对应的vaule
    const rulesItem = rules[element]; // 当前key对应的检验规则
    if (isEmpty(value) && typeof rulesItem !== "function") {
      tip = rulesItem;
      break;
    } else if (typeof rulesItem === "function" && rulesItem(value, source)) {
      tip = rulesItem(value, source);
      break;
    }
  }
  return tip;
};

// 通用脱敏，默认脱敏手机号
export const desensitizationData = (
  val,
  reg = /^(\d{3})\d{4}(\d{4})$/,
  replaceChar = "$1****$2"
) => {
  return val?.replace(reg, replaceChar);
};
// toast提示
export const toast = function (txt, time = 2000) {
  uni.showToast({
    title: txt,
    icon: "none",
    duration: time,
  });
};

// 路由跳转封装
export const router = function (urls) {
  uni.navigateTo({
    url: urls,
  });
};

// 不保存页面栈
export const redirectRouter = function (urls) {
  uni.redirectTo({
    url: urls,
  });
};

// 返回
export const goBack = (delta = 1) => uni.navigateBack({ delta });
export const getToken = () => uni.getStorageSync("token");
/**
 * 获取浏览器url中的参数
 */
export const getUrlParam = function (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return "";
};
// 设置storage
export const setStorage = function (key, value) {
  try {
    uni.setStorageSync(key, value);
    return true;
  } catch (e) {
    console.error("setStorage Error:", e);
    return false;
  }
};

// 获取storage
export const getStorage = function (key) {
  try {
    const value = uni.getStorageSync(key);
    return value ? value : null;
  } catch (e) {
    console.error("getStorage Error:", e);
    return null;
  }
};

// 删除storage
export const removeStorage = function (key) {
  try {
    uni.removeStorageSync(key);
    return true;
  } catch (e) {
    console.error("removeStorage Error:", e);
    return false;
  }
};
