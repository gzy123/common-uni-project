<template>
  <view
    :class="['input-card', { row: props.mode === 'row' }]"
    :style="props.styleObj"
  >
    <view class="input-card-title" v-if="props.title"
      >{{ props.title
      }}<text class="red" v-if="!props.disabled || showPointer">*</text></view
    >
    <view class="input-card-val" @click="handleFocus">
      <input
        :maxlength="props.maxLength"
        class="input-hidden"
        :focus="isFocus"
        @blur="blurHandle"
        :type="props.inputType"
        v-model.trim="dataSource"
        @input="inputHandle"
        placeholder="请输入"
      />
      <view
        :class="['input-content', { focus: isFocus }, { red: errorStyle }]"
        v-if="!isEmpty(dataSource) || isFocus"
        >{{ toCommaStyle(dataSource, "") }}</view
      >
      <text class="placeHolder" v-else>{{
        props.disabled ? "" : "请输入"
      }}</text>
      <view class="text-right">
        <view class="text-del" v-if="!props.disabled && dataSource">
          <image
            src="~@/static/common/list_text_del.svg"
            @click.stop="handleClear"
            class="text-del-img"
          />
        </view>
        <view class="text-unit" v-if="props.unit">{{ props.unit }}</view>
      </view>
    </view>
    <view class="input-card-tip" v-if="props.showUpperMoney">
      <text :class="[{ light: !isEmpty(dataSource) }]">
        {{ isEmpty(dataSource) ? "大写回显区域" : smallToBig(dataSource) }}
      </text>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, nextTick } from "vue";
import { isEmpty, toCommaStyle, smallToBig } from "/common/util";
const props = defineProps({
  disabled: Boolean,
  title: String,
  showPointer: {
    type: Boolean,
    default: false,
  },
  inputType: {
    type: String,
    default: "digit",
  },
  modelValue: [Number, String],
  mode: {
    type: String,
    default: "row",
  },
  maxLength: {
    type: Number,
    default: -1,
  },
  styleObj: {
    type: Object,
    default: () => {
      return {};
    },
  },
  showUpperMoney: {
    type: Boolean,
    default: true,
  },
  isCheck: {
    type: Boolean,
    default: false,
  },
  unit: {
    type: String,
  },
  isInteger: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "input"]);
const errorStyle = ref(false);
const isFocus = ref(false);
const focusTime = ref("");
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
const handleFocus = () => {
  if (!props.disabled) {
    isFocus.value = true;
    if (props.isCheck) {
      errorStyle.value = false;
      focusTime.value = new Date().getTime();
    }
  }
};
const blurHandle = (event) => {
  isFocus.value = false;
  if (event.detail.value) dataSource.value = Number(event.detail.value);
  if (props.isCheck) {
    // FIXME: 特殊处理，ios 修改focus，第二次会并发执行blur事件
    const time = new Date().getTime() - focusTime.value > 1500;
    time &&
      emit("input", (bool) => {
        errorStyle.value = bool;
      });
  }
};
const inputHandle = (event) => {
  nextTick(() => {
    if (!props.isInteger) {
      dataSource.value = event.detail.value.replace(
        /^(\-)*(\d+)\.(\d\d).*$/,
        "$1$2.$3"
      );
    } else {
      dataSource.value = event.detail.value.replace(/\D/g, "");
    }
  });
};
</script>

<style lang="scss" scoped>
.input-card {
  padding: 26rpx 30rpx 0 0;
  font-size: 30rpx;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-bottom: 1rpx solid #f1f2f3;
  &-tip {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    min-height: 60rpx;
    padding: 4rpx 32rpx;
    background-color: #fff6ec;
    color: #ce9175;
    font-size: 26rpx;
    .light {
      color: #dc5d01;
    }
  }
  &-val {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16rpx 0 24rpx;
    position: relative;
    min-height: 40rpx;
    .text-right {
      display: flex;
      align-items: center;
    }
    .input-text {
      flex: 1;
    }
    .input-hidden {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: -1;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .input-content {
      position: relative;
      z-index: 1;
      min-height: 40rpx;
      line-height: 40rpx;
      &.focus::after {
        display: block;
        content: "";
        position: absolute;
        right: -6rpx;
        top: 0;
        width: 4rpx;
        height: 100%;
        animation: animationFocus 0.8s ease infinite;
      }
    }
    @keyframes animationFocus {
      from {
        background-color: transparent;
      }
      to {
        background-color: #1dca6d;
      }
    }
    .text-del {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 50rpx;
      height: 32rpx;
      &-img {
        width: 28rpx;
        height: 28rpx;
      }
    }
    .text-unit {
      margin-left: 12rpx;
      font-size: 32rpx;
      line-height: 45rpx;
    }
  }
  &.row {
    align-items: center;
    flex-direction: row;
    padding-top: 0;
    padding-right: 0;
    min-height: 102rpx;
    .input-card-val {
      margin: 0;
      justify-content: flex-end;
    }
  }
}
</style>
