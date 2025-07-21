<script setup>
import { ref, computed } from "vue";
import { isEmpty } from "/common/util";
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  showStart: {
    type: Boolean,
    default: true,
  },
  styleObj: Object,
  codeKey: {
	  type: String,
	  default: 'dictionaryCode'
  },
  nameKey: {
	  type: String,
	  default: 'dictionaryName'
  }
});
const emit = defineEmits("select", "update:modelValue");

const commonSelector = ref(null);
const onPickTime = () => {
  if (props.disabled) return;
  commonSelector.value?.open("bottom");
};
const initVal = ref([0]);
const data = computed({
  get() {
    if (isEmpty(props.modelValue)) {
      return [0];
    }
    let idx;
    for (let i = 0; i < props.dataSource?.length; i++) {
      let code = props.dataSource[i][props.codeKey];
      if (props.modelValue == code) {
        idx = i;
        break;
      }
    }
    initVal.value = [idx]
    return [idx];
  },
  set(value) {
    emit("update:modelValue", value);
  },
});


const onChange = (e) => {
  initVal.value = e.detail.value;
};

const onCancel = () => {
  commonSelector.value?.close();
};

const onOk = () => {
  const idx = initVal.value[0] || 0;
  data.value = props.dataSource[idx][props.codeKey];
  commonSelector.value?.close();
  emit("select", idx);
};

const getDictName = (idx) => {
  if (typeof idx !== "number") {
    return "";
  }
  return props.dataSource[idx][props.nameKey];
};
const handleClear = () => {
  data.value = "";
};
</script>

<template>
  <view class="common-selector" :style="props.styleObj" @click="onPickTime">
    <view class="common-selector-title">
      {{ props.title }}
      <text class="red" v-show="props.showStart && !props.disabled">*</text>
    </view>
    <view
      class="common-selector-content"
      :class="props.disabled ? 'disabled' : 'normal'"
    >
      <text :class="!isEmpty(props.modelValue) ? '' : 'placeHolder'" v-if="!props.disabled">
        {{ !isEmpty(props.modelValue) ? getDictName(data[0]) :  "请选择" }}
      </text>
      <text v-else>{{getDictName(props.modelValue)}}</text>
    </view>
    <uni-popup
      ref="commonSelector"
      background-color="#fff"
      :is-mask-click="false"
    >
      <view class="header">
        <view @click.stop="onCancel" class="cancel">取消</view>
        <view class="title">{{ props.title }}</view>
        <view class="ok" @click.stop="onOk">确认</view>
      </view>
      
      <picker-view
        :value="initVal"
        @change="onChange"
        :immediate-change="true"
        indicatorStyle="height: 84rpx;border:none;"
        indicator-class="checkStyle"
        mask-class="mask-class"
      >
        <picker-view-column>
          <view
            class="items"
            v-for="(item, index) in props.dataSource"
            :key="index"
          >
            {{ item[props.nameKey] }}
          </view>
        </picker-view-column>
      </picker-view>
    </uni-popup>
  </view>
</template>
<style lang="scss" scoped>
.common-selector {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #F6F6F6;
  min-height: 102rpx;
  :deep(.uni-popup) {
	z-index: 999;
  }
  picker-view {
    width: 100%;
    height: 30vh;
  }
  &-title{
    font-size: 30rpx;
  }
  &-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    font-size: 30rpx;
    &.normal {
      &::after {
        content: "";
        background: url("/static/common/icon-arrow.svg") no-repeat center / cover;
        width: 12rpx;
        height: 22rpx;
		    margin: 2rpx 0 0 18rpx;
      }
    }
    .text_del {
      position: absolute;
      right: 60rpx;
      width: 28rpx;
      height: 28rpx;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 20rpx;
    .cancel {
      color: #888888;
    }
    .title {
      font-weight: 500;
    }
    .ok {
      color: #3775F6;
    }
  }
  .items {
    line-height: 78rpx;
    text-align: center;
  }
}
</style>
