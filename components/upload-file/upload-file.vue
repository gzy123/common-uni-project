<template>
  <view class="file">
    <view
      class="file-item"
      v-for="(item, index) in props.dataSource || []"
      :key="index"
    >
      <view
        class="file-item-close"
        v-if="props.isUpload"
        @click="deleteHandle(index)"
      ></view>
      <image
        mode="aspectFill"
        @click="previewImage(createFileAllPath(item.filePath || item.fileName))"
        :src="createFileAllPath(item.filePath || item.fileName)"
        class="file-item-image"
        v-if="checkImgType(item.filePath || item.fileName)"
      />
      <view
        class="file-icon"
        @click="openDocument(createFileAllPath(item.filePath || item.fileName))"
        v-else
      >
        <view class="file-icon-img">
          <image
            mode="widthFix"
            :src="showFileIcon(item.filePath || item.fileName)"
            style="width: 100%"
          />
        </view>
      </view>
      <view class="ellipsis" v-if="item.fileName">{{ item.fileName }}</view>
    </view>
    <view class="file-item" v-if="isShowAdd" @click="addHandle">
      <view class="add"></view>
      <view class="file-item-label" v-if="props.fileLabel">{{
        props.fileLabel
      }}</view>
    </view>
    <!-- 选择上传类型 -->
    <choose-picture
      :isSelectFile="props.isSelectFile"
      :extension="props.extension"
      :fileType="props.fileType"
      :isShow="showChooseType"
      @onCancel="showChooseType = false"
      @onConfirm="onUplolad"
    />
  </view>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import { createFileAllPath, getFileExt, checkImgType } from "@/common/util";
const props = defineProps({
  dataSource: {
    type: Array,
    default: [],
  },
  isUpload: {
    type: Boolean,
    default: true,
  },
  maxLength: {
    type: Number,
    default: 30,
  },
  isClick: {
    type: Boolean,
    default: true,
  },
  fileLabel: {
    type: String,
    default: "",
  },
  isSelectFile: {
    type: Boolean,
    default: true,
  },
  maxSize: {
    type: Number,
    default: 30 * 1024 * 1024,
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
const emit = defineEmits(["deleteHandle", "onFile"]);
const showChooseType = ref(false);
const apiList = inject("$API");
const fileUrl = uni.getStorageSync("fileUrl");
const isShowAdd = computed(() => {
  return props.isUpload && props.dataSource?.length < props.maxLength;
});
const addHandle = () => {
  if (!props.isClick) return;
  showChooseType.value = true;
};
const deleteHandle = (index) => {
  if (!props.isClick) return;
  uni.showModal({
    title: "确认删除?",
    confirmText: "确认",
    success: async (res) => {
      if (res.cancel) {
        return;
      }
      emit("deleteHandle", index);
    },
  });
};

const previewImage = (path) => {
  uni.previewImage({
    urls: [path],
  });
};
const openDocument = (path) => {
  uni.downloadFile({
    url: path,
    success: (res) => {
      wx.openDocument({
        filePath: res.tempFilePath,
        success: function (res) {
          console.log("打开文档成功");
        },
        fail: function (res) {
          console.log("打开文档失败");
        },
      });
    },
  });
};
const showFileIcon = (path) => {
  const filePath = (path + "").toLowerCase();
  const suffix = getFileExt(filePath).ext;
  switch (suffix) {
    case "pdf":
      return "/static/file/images_pdf.png";
    case "doc":
    case "docx":
      return "/static/file/images_word.png";
    case "xlsx":
    case "xls":
      return "/static/file/images_excel.png";
    case "ppt":
    case "pptx":
      return "/static/file/images_ppt.png";
    default:
      return "";
  }
};
// 全局状态锁，防止重复操作
let isLoading = false;
const onUplolad = async (res) => {
  if (isLoading) return;
  isLoading = true;
  showChooseType.value = false;
  try {
    uni.showLoading({
      title: "上传中，请稍等",
    });
    for (const file of res.tempFiles) {
      // FIXME: 限制最大上传次数
      if (props.dataSource?.length >= props.maxLength) break;
      if (file.size > props.maxSize) {
        uni.showToast({ title: "文件大小不能超过30M", icon: "none" });
        break;
      }

      const { data: uploadData } = await apiList.uploadFile({
        query: { filePath: file.path },
        hasLoading: false,
      });
      const { fileId, fileType, ...params } = uploadData;
      props.dataSource.push(params);
    }
    emit("onFile", props.dataSource);
  } catch (error) {
    console.error("[Upload Error]", error);
    // 统一错误处理（可扩展为上报监控）
    if (error.errMsg?.includes("network")) {
      uni.showToast({ title: "网络异常，请重试", icon: "none" });
    }
  } finally {
    isLoading = false;
    uni.hideLoading(); // 确保最终执行
  }
};
</script>

<style lang="scss" scoped>
.file {
  display: flex;
  flex-wrap: wrap;

  .file-item {
    width: 180rpx;
    margin: 0 16rpx 30rpx 0;
    position: relative;
    font-size: 0;

    &-image {
      width: 180rpx;
      height: 180rpx;
    }

    &-label {
      font-size: 24rpx;
      color: #a0aec0;
      text-align: center;
      margin-top: 16rpx;
    }

    .ellipsis {
      color: #888;
      font-size: 28rpx;
      margin-top: 4rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-close {
      position: absolute;
      right: -16rpx;
      top: -16rpx;
      z-index: 1;
      width: 40rpx;
      height: 40rpx;
      background: url("~@/static/file/pic_del.svg") no-repeat center;
      background-size: 28rpx;
    }

    .add {
      width: 180rpx;
      height: 180rpx;
      background: url("~@/static/file/pic_add_def.svg") no-repeat center / cover;
    }

    &.photo {
      background: url("~@/static/file/camera.png") no-repeat;
      background-position: top center;
      background-size: 180rpx 180rpx;
    }

    .file-icon {
      width: 180rpx;
      height: 180rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f3f3f3;

      &-img {
        width: 65rpx;
        height: 87rpx;

        &.pdf {
          background: url("~@/static/file/images_pdf.png") no-repeat center;
        }

        &.word {
          background: url("~@/static/file/images_word.png") no-repeat center /
            cover;
        }

        &.excel {
          background: url("~@/static/file/images_excel.png") no-repeat center /
            cover;
        }

        &.ppt {
          background: url("~@/static/file/images_ppt.png") no-repeat center /
            cover;
        }
      }
    }
  }

  &-label {
    font-size: 24rpx;
    color: #a0aec0;
    text-align: center;
    margin-top: 16rpx;
  }

  .ellipsis {
    color: #888;
    font-size: 28rpx;
    margin-top: 4rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-close {
    position: absolute;
    right: -16rpx;
    top: -16rpx;
    z-index: 1;
    width: 40rpx;
    height: 40rpx;
    background: url("~@/static/file/pic_del.svg") no-repeat center;
    background-size: 28rpx;
  }

  .add {
    width: 180rpx;
    height: 180rpx;
    background: url("~@/static/file/pic_add_def.svg") no-repeat center / cover;
  }

  &.photo {
    background: url("~@/static/file/camera.png") no-repeat;
    background-position: top center;
    background-size: 180rpx 180rpx;
  }

  .file-icon {
    width: 180rpx;
    height: 180rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;

    &-img {
      width: 65rpx;
      height: 87rpx;
    }
  }
}
</style>
