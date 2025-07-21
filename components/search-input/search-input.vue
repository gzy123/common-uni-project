<template>
  <view class="search-input">
    <slot name="activity"></slot>
    <view class="search-input-box">
      <view class="search-input-main">
        <view class="search-input-icon"></view>
        <input
          type="text"
          confirm-type="search"
          v-model.trim="searchQuery"
          @confirm="search"
          :placeholder="props.placeholder"
          placeholder-style="color: #a0aec0"
          @focus="onFocus"
          @input="onInput"
          @blur="isInput = false"
          class="search-input-content"
          :maxlength="props.maxlength"
        />
        <view
          class="search-input-clear"
          @click="clearAll"
          v-if="!isEmpty(searchQuery) && props.clearable"
        >
          <image
            class="search-input-clear-icon"
            src="/static/common/list_text_del.svg"
          />
        </view>
      </view>
      <slot name="operate"></slot>
      <slot name="filters"></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { isEmpty } from "@/common/util";
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
  placeholder: {
    type: String,
    default: "任务编号、任务名称、经办人",
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  isEmitInput: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: -1,
  },
});
const emit = defineEmits(["update:modelValue", "search", "input"]);
const searchQuery = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (props.isEmitInput) {
      emit("input", value);
    }
    emit("update:modelValue", value);
  },
});
const search = (e) => {
  const value = e.detail.value;
  emit("search", value);
};
const onInput = (e) => {
  const value = e.detail.value;
  emit("onInput", value);
};
const clearAll = () => {
  searchQuery.value = "";
  emit("search", "");
};
</script>

<style lang="scss" scoped>
.search-input {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 10;
  &-box {
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    min-height: 130rpx;
    background-color: #fff;
  }
  &-main {
    flex: 1;
    height: 70rpx;
    background-color: #f6f6f6;
    font-size: 30rpx;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
  }
  &-icon {
    width: 70rpx;
    height: 70rpx;
    background: url("~@/static/common/Icons_search.svg") no-repeat center;
    background-size: 30rpx;
  }
  &-content {
    flex: 1;
    font-size: 28rpx;
  }
  &-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70rpx;
    height: 70rpx;
    &-icon {
      width: 30rpx;
      height: 30rpx;
    }
  }
}
</style>
