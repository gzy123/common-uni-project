/**
 * https://2m065966e6.goho.co  花生壳
 * http://10.10.0.242:18082 测试环境
 * http://10.10.0.218:8082 开发环境
 * https://zldslxtapi.fen360.com 线上
 */
export default {
  baseURL:
    process.env.name === "dev"
      ? "http://10.10.0.254:8315"
      : "https://zscloudzsxcxapi.fen360.com",
  // 静态资源域名
  staticUrl: "https://hwqimg.fen360.com",
  h5Url:
    process.env.name === "dev"
      ? "http://10.10.0.242:8015"
      : "https://zscloudh5.fen360.com",
  contentType: "application/x-www-form-urlencoded;charset=UTF-8",
  envVersion: process.env.name === "dev" ? "develop" : "release",
  // 消息框消失时间
  messageDuration: 3000,
  // 最长请求时间
  timeout: 10000,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  id: 10006,
  pwd: "QWORENTG205N",
  appver: "1.0.0",
  signType: "md5",
  device: "",
};
