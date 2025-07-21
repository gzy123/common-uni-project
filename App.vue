<template>
  <view class="common-tabbar-module"></view>
</template>
<script>
import { useBussniessStore } from "@/store/useBussniessStore.js";
import { getGlobalAllSelect } from "@/common/data";
let activityTimer = null;
export default {
  onLaunch: function (e) {},
  onShareAppMessage: function () {},
  onShow: function () {
    // console.log('App Show')
    console.log("App Launch getUpdateManager", uni.canIUse("getUpdateManager"));
    if (uni.canIUse("getUpdateManager")) {
      const updateManager = uni.getUpdateManager();
      updateManager?.onCheckForUpdate(function (res) {
        console.log("App Launch getUpdateManager onCheckForUpdate", res);
        // 请求完新版本信息的回调
        if (res?.hasUpdate) {
          updateManager.onUpdateReady(function () {
            uni.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function (res) {
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              },
            });
          });
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            uni.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
            });
          });
        }
      });
    }
  },
  onHide: function () {
    if (activityTimer) {
      clearTimeout(activityTimer);
      activityTimer = null;
    }
    // console.log('App Hide')
  },
};
</script>

<style lang="scss">
/* #ifdef H5 */
uni-page-head {
  display: none;
}
/* #endif */
/*每个页面公共css */
@import "@/static/common.scss";

/* #ifndef APP-NVUE */
@import "@/static/customicons.css";

// 引入字体文件
@import "@/static/font/iconfont.css";
@font-face {
  font-family: DIN Alternate;
  src: url("/static/DIN-BoldAlternate.otf");
}
// 设置整个项目的背景色
page {
  background-color: #f8f8f8;
}

view {
  box-sizing: border-box;
}

/* #endif */
.red {
  color: #f13030;
}
.gray-color {
  color: #8c9aab;
}
.bule-color {
  color: #4f88ff;
}
.green-color {
  color: #1dca6d;
}
.green-color-v2 {
  color: #5bc788;
}
.red-color {
  color: #ff6060;
}
.yellow-color {
  color: #ff811f;
}
.brown-color {
  color: #c79c24;
}
.orange-color {
  color: #f28e2a;
}
.placeHolder {
  color: #a0aec0;
}
.bold {
  font-weight: bold;
}
.uv-form-item__body__left__content__required {
  color: #e83833 !important;
  font-size: 30rpx !important;
}
/* 针对安卓机隐藏滚动条的样式 */
.hidden-scroll-scrollbar ::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}
</style>
