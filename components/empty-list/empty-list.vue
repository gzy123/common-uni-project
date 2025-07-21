<template>
  <view :class="['empty-list', props.className]" :style="props.styleObj">
    <image
      class="empty-list-logo"
      :src="`${props.imgUrl}`"
      :style="props.imgStyle"
    />
    <view
      class="empty-list-text"
      :style="props.textStyle"
      v-text="props.title"
    ></view>
    <view class="empty-list-desc" v-if="props.desc" v-html="props.desc"></view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import config from "@/config";

const props = defineProps({
  imgUrl: {
    type: String,
    default: "/static/empty/icon_null.png",
  },
  className: String,
  title: {
    type: String,
    default: "暂无数据",
  },
  styleObj: {
    type: Object,
    default: () => {
      return {};
    },
  },
  imgStyle: {
    type: Object,
    default: () => {
      return {};
    },
  },
  textStyle: {
    type: Object,
    default: () => {
      return {};
    },
  },
  desc: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.empty-list {
  text-align: center;
  width: 100%;
  margin: 134rpx 0;
  &.no-margin {
    margin: 0;
  }
  &-logo {
    width: 132rpx;
    height: 140rpx;
    margin-bottom: 10rpx;
  }
  &-text {
    font-size: 28rpx;
    color: #181818;
    margin-bottom: 14rpx;
    font-weight: bold;
  }
  &-desc {
    font-size: 28rpx;
    color: #666666;
  }
}
</style>
