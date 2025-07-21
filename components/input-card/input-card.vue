<template>
  <view :class="['input-card', { noCenter: props.isNewline }]">
    <view
      :class="['input-card-val', { rightAilgn: props.inputAlign === 'right' }]"
      v-if="!props.disabled"
    >
      <input
        :maxlength="props.maxlength"
        class="input-text"
        placeholder-class="placeHolder"
        :type="props.inputType"
        v-model.trim="dataSource"
        :placeholder="props.placeholder"
      />
      <view class="text-del" v-if="dataSource && props.clearable">
        <image
          src="~@/static/common/list_text_del.svg"
          @click.stop="handleClear"
          class="text-del-img"
        />
      </view>
    </view>
    <view
      :class="[
        'input-card-val disabled',
        { 'text-left': props.textAlign === 'left' },
      ]"
      v-else
      >{{ formatVal(dataSource, props.format) }}</view
    >
  </view>
</template>

<script setup>
import { computed } from "vue";
import { isPhone } from "@/common/util";
const props = defineProps({
  disabled: Boolean,
  inputType: {
    type: String,
    default: "text",
  },
  inputAlign: {
    type: String,
    default: "left",
  },
  modelValue: [Number, String],
  format: String,
  maxlength: {
    type: [Number, String],
    default: -1,
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  textAlign: {
    type: String,
    default: "right",
  },
});
const emit = defineEmits(["update:modelValue", "input"]);
const dataSource = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const handleClear = () => {
  dataSource.value = "";
};
const formatVal = (value, format) => {
  switch (format) {
    case "bank":
      return value != null
        ? String(value)
            .replace(/\s/g, "")
            .replace(/(.{4})/g, "$1 ")
        : "";
    case "money":
      return value != null
        ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : "";
    default:
      return value ?? "";
  }
};
</script>

<style lang="scss" scoped>
.input-card {
  font-size: 30rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  &-val {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &.rightAilgn {
      text-align: right;
    }
    &.text-left {
      justify-content: flex-start;
    }
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
    &.disabled {
      word-break: break-all;
    }
  }
}
</style>
