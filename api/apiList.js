/**
 * requestType: request 常规流请求post/get, uploadFile 上传文件流请求
 * method 用于 request
 * url api地址 一般/开头
 * prefix 额外参数 如token 是否需要
 */
export default {
  // 获取数据字典
  getGlobalAllSelectApi: {
    method: "get",
    url: "/zs/cloud/mapi/common/getSearchConditionAllData",
  },
};
