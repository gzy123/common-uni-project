<template>
  <uni-popup ref="filePopup" @change="change" :safe-area="false">
    <view class="file-popup">
      <image
        class="file-popup-image"
        mode="widthFix"
        :src="props.banner + '?' + new Date().getTime()"
        v-if="systemData.wechatAuditFlag === 0"
      />
      <view class="file-popup-select">
        <view class="file-popup-select-main" @click="chooseMessageFile">
          <view class="file-popup-select-title">导入微信文件</view>
          <view class="file-popup-select-desc"
            >PDF文件最大支持{{ props.limitSize }}M</view
          >
        </view>
        <view class="file-popup-select-cancel" @click="$refs.filePopup.close()"
          >取消</view
        >
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { onUnmounted, ref, watch } from "vue";
const filePopup = ref(null);
const systemData = ref(uni.getStorageSync("systemData") || {});
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: "bottom",
  },
  limit: {
    type: Number,
    default: 5,
  },
  extension: {
    type: Array,
    default: () => ["pdf"],
  },
  fileType: {
    type: String,
    default: "file",
  },
  banner: {
    type: String,
  },
  limitSize: {
    type: Number,
    default: 60,
  },
});
const emit = defineEmits(["onCancel", "onConfirm"]);

const stopWatch = watch(
  () => props.isShow,
  (n, o) => {
    n ? filePopup.value?.open(props.position) : filePopup.value?.close();
  }
);
onUnmounted(() => {
  // TODO: 销毁手动注销监听
  stopWatch();
});
const change = (e) => {
  if (!e.show) emit("onCancel");
};
const onCancel = () => {
  emit("onCancel");
};

const chooseMessageFile = () => {
  wx.chooseMessageFile({
    count: props.limit,
    type: props.fileType,
    extension: props.extension,
    success: async function (res) {
      emit("onConfirm", res);
    },
  });
};
</script>

<style lang="scss" scoped>
.file-popup {
  &-image {
    display: block;
    width: calc(100vw - 80rpx);
    margin: 60rpx auto;
    border-radius: 20rpx;
  }
  &-select {
    width: 100%;
    min-height: 369rpx;
    background-color: #fff;
    border-radius: 14px 14px 0px 0px;
    &-main {
      text-align: center;
      padding: 50rpx 0 46rpx;
      border-bottom: 20rpx solid #f7f7f7;
    }
    &-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 34rpx;
      font-weight: bold;
      line-height: 48rpx;
      margin-bottom: 8rpx;
      &::before {
        content: "";
        width: 44rpx;
        height: 44rpx;
        margin-right: 16rpx;
        background: url("~@/static/common/icon-wechat.svg") no-repeat center /
          cover;
      }
    }
    &-desc {
      color: #f13030;
      font-size: 26rpx;
      line-height: 36rpx;
    }
    &-cancel {
      text-align: center;
      line-height: 45rpx;
      padding: 44rpx 0;
    }
  }
}
</style>
