<template>
  <uni-popup ref="popup" background-color="#fff" @change="change">
    <view
      class="pictrue-item"
      @click="choosefile('camera')"
      v-if="props.isSelectPhoto"
      >拍照</view
    >
    <view
      class="pictrue-item"
      @click="choosefile('album')"
      v-if="props.isSelectPhoto"
      >从相册中选取</view
    >
    <view
      class="pictrue-item noBorder"
      @click="chooseMessageFile"
      v-if="props.isSelectFile"
      >从微信中选取文件</view
    >
    <view class="pictrue-cancel" @click="onCancel">取消</view>
  </uni-popup>
</template>

<script setup>
import { onUnmounted, ref, watch } from "vue";
const popup = ref(null);
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "bottom",
  },
  isSelectFile: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
    default: 10,
  },
  isSelectPhoto: {
    type: Boolean,
    default: true,
  },
  extension: {
    type: Array,
    default: () => [
      "xlsx",
      "xls",
      "doc",
      "docx",
      "zip",
      "rar",
      "war",
      "png",
      "jpg",
      "pdf",
    ],
  },
  fileType: {
    type: String,
    default: "all",
  },
});
const emit = defineEmits(["onCancel", "onConfirm"]);

const stopWatch = watch(
  () => props.isShow,
  (n, o) => {
    n ? popup.value?.open(props.position) : popup.value?.close();
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

const choosefile = (sourceType) => {
  uni.chooseImage({
    count: props.limit,
    sourceType: [sourceType],
    success: (res) => {
      emit("onConfirm", res);
    },
  });
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
@import "./choose-picture.scss";
</style>
