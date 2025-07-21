<script setup>
import { computed } from "vue";

const props = defineProps(["checked", "disabled", "node"]);
const emit = defineEmits(["change", "update:checked"]);
const isCheck = computed({
  get() {
    if (props.checked === undefined) {
      return false;
    }
    return props.checked;
  },
  set(value) {
    emit("update:checked", value);
  },
});

const onClick = () => {
  if (props.disabled) {
    return;
  }
  isCheck.value = !isCheck.value;
  emit("change", isCheck.value);
};
</script>

<template>
  <view class="contain-box" @click="onClick">
    <view class="check-box" :class="[{check: props.node === 'check'}, {'active':isCheck }, {'disabled': props.disabled}]">
    </view>
    <view class="tag">
      <slot></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.contain-box {
  display: flex;
  align-items: center;
  .check-box {
    width: 32rpx;
    height: 32rpx;
    border-radius: 17rpx;
    border: 2rpx solid #a0aec0;
    box-sizing: border-box;
    &.disabled{
      background: url("/static/common/check-disabled.png") no-repeat center;
      background-size: 32rpx 32rpx;
      border-radius: 100%;
    }
    &.active {
      border: none;
      background: url("/static/common/tick_sel.svg") no-repeat center;
      background-size: 32rpx 32rpx;
    }
    &.check{
      border-radius: 4rpx !important;
      &.disabled{
        background-image: url('/static/common/check-disabled.png')
      }
      &.active{
        background-image: url('/static/common/checkbox_sel.svg');
        &.disabled{
          background-image: url('/static/common/checkbox-active-disabled.png')
        }
      }
    }
  }
  .tag {
    margin-left: 16rpx;
    white-space: nowrap;
  }
}
</style>
