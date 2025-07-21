<template>
  <view :class="['input-card', { noCenter: props.isNewline }]">
    <view class="input-card-title"
      >{{ props.title }}{{ " "
      }}<text class="red" v-if="props.showStart && !props.disabled"
        >*</text
      ></view
    >
    <view class="input-card-val" v-if="!props.disabled">
      <input
        @blur="blurhandle"
        :class="['input-text', { red: errorStyle }]"
        placeholder-class="placeHolder"
        :type="props.inputType"
        v-model.trim="dataSource"
        @focus="focushandle"
        v-if="!props.isNewline"
        :maxlength="props.maxLength"
        @input="handleInput"
        placeholder="请输入"
      />
      <textarea
        :class="['textarea-text', { red: errorStyle }]"
        :maxlength="props.maxLength"
        v-model.trim="dataSource"
        @blur="blurhandle"
        :auto-height="true"
        placeholder="请输入"
        placeholder-class="placeHolder"
        v-else
      />
      <view class="text-del" v-if="dataSource">
        <image
          src="~@/static/common/list_text_del.svg"
          @click.stop="handleClear"
          class="text-del-img"
        />
      </view>
    </view>
    <view :class="['input-card-val', { red: errorStyle }]" v-else>{{
      dataSource
    }}</view>
  </view>
</template>

<script setup>
import { computed, ref, nextTick } from "vue";
import {
  testIdentity,
  isMobile,
  isEmpty,
  isEmail,
  validateUnifiedSocialCreditCode,
  isPhone,
} from "@/common/util";
const props = defineProps({
  disabled: Boolean,
  title: String,
  inputType: {
    type: String,
    default: "text",
  },
  modelValue: [Number, String],
  format: String,
  mode: {
    type: String,
    default: "row",
  },
  maxLength: {
    type: Number,
    default: -1,
  },
  isNeedEmitInput: {
    type: Boolean,
    default: false,
  },
  showStart: {
    type: Boolean,
    default: true,
  },
  rules: {
    type: String,
  },
  regExp: {
    type: [Object, String],
    // default: () => /[\u4E00-\u9FA5]/g
  },
  checkParams: {
    type: Object,
  },
  minTip: {
    type: String,
  },
  maxTip: {
    type: String,
  },
  isNewline: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "input", "clear"]);
const errorStyle = ref(false);
const dataSource = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const blurhandle = () => {
  if (!props.rules) return;
  switch (props.rules) {
    case "rate":
      if (!/^\d+(\.\d{1,2})?$/.test(dataSource.value)) {
        errorStyle.value = true;
        return uni.showToast({
          title: "请输入正确的贷款利率",
          icon: "none",
        });
      } else {
        errorStyle.value = false;
        emit("input", dataSource.value); // 格式化输入框的值
      }
      break;
    case "phone":
      if (!isMobile(dataSource.value) && !isEmpty(dataSource.value)) {
        errorStyle.value = true;
        return uni.showToast({
          title: "请输入正确的手机号",
          icon: "none",
        });
      } else {
        errorStyle.value = false;
      }
      break;
    case "email":
      if (!isEmail(dataSource.value) && !isEmpty(dataSource.value)) {
        errorStyle.value = true;
        return uni.showToast({
          title: "请输入正确的电子邮箱",
          icon: "none",
        });
      } else {
        errorStyle.value = false;
      }
      break;
    default:
      break;
  }
};
const handleInput = (event) => {
  if (props.regExp) {
    nextTick(() => {
      dataSource.value = event.detail.value?.replace(props.regExp, "");
    });
  }
};
const handleClear = () => {
  dataSource.value = "";
  emit("clear", "");
};
const focushandle = () => {
  errorStyle.value = false;
};
</script>

<style lang="scss" scoped>
.input-card {
  font-size: 30rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #f1f2f3;
  min-height: 102rpx;
  &.noCenter {
    display: block;
    .input-card-val {
      text-align: left;
      margin-top: 10rpx;
      justify-content: flex-start;
    }
  }
  &-title {
    white-space: nowrap;
    margin-right: 6rpx;
  }
  &-val {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;
    .input-text {
      flex: 1;
    }
    .textarea-text {
      width: 100%;
      max-height: 100rpx;
      padding: 0 0 8rpx;
    }
    .text-del {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50rpx;
      height: 32rpx;
      &-img {
        width: 28rpx;
        height: 28rpx;
      }
    }
    &.noCenter {
      padding: 30rpx 0;
    }
  }
}
</style>
