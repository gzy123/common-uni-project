import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
const onShare = () => {
  const systemData = uni.getStorageSync("systemData") || {};
  const params = {
    title: systemData.appletShareTitle,
    path: "/pages/Home/index",
    imageUrl: systemData.appletShareImageUrl,
    desc: systemData.appletShareDesc,
  };
  onShareAppMessage(() => params);

  const onShareTimelineHandle = (query) => {
    // 判断是否是从分享卡片进入的
    if (query.from === "sharetimeline") {
      console.log("从分享卡片进入");
      uni.switchTab({
        url: "/pages/Home/index", // 这里应该是你的首页路径
      });
    }
  };
  onShareTimeline(() => ({
    query: "from=sharetimeline",
    title: systemData.appletShareTitle,
    imageUrl: systemData.appletShareImageUrl,
  }));
  return { onShareAppMessage, onShareTimelineHandle, onShareTimeline };
};

export default onShare;
