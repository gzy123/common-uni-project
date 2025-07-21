<template>
  <view class="time-selector" :style="props.styleObj">
    <view class="time-selector-title">
      {{ props.title }}
      <text class="red" v-show="props.showStart && !props.disabled">*</text>
    </view>
    <view
      class="time-selector-content"
      :class="props.disabled ? 'disabled' : 'normal'"
      @click="openDatePick"
    >
      <view
        class="time-selector-content-value"
        v-if="props.disabled || (beginTime && endTime)"
      >
        {{ beginTime ? `${beginTime}至 ${endTime}` : "" }}
      </view>
      <view class="time-selector-content-value" v-else>
        <text class="time-selector-content-placeholder">请选择</text>
      </view>
    </view>
    <Calendar
      :clearDate="false"
      :hideSecond="false"
      :insert="false"
      :range="true"
      :showMonth="false"
      @confirm="dateChange"
      @maskClose="close"
      ref="datePick"
    />
  </view>
</template>

<script setup>
import { computed, ref } from "vue";
import { isEmpty } from "@/common/util";
import Calendar from "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar.vue";

const props = defineProps({
  beginTime: {
    type: String,
    default: "",
  },
  endTime: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  model: {
    type: String,
    default: "date",
  },
  showStart: {
    type: Boolean,
    default: true,
  },
  styleObj: Object,
  isNeedLongTime: {
    type: Boolean,
    default: false,
  },
  isSelectEnd: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue", "inputBegin"]);
const datePick = ref(null);
const beginTime = computed({
  get() {
    return props.beginTime;
  },
  set(value) {
    emit("update:beginTime", value);
  },
});
const endTime = computed({
  get() {
    return props.endTime;
  },
  set(value) {
    emit("update:endTime", value);
  },
});
const dateChange = (e) => {
  const { before, after } = e.range;
  const times = sortTime(before, after);
  beginTime.value = times.start;
  endTime.value = times.end;
};
const sortTime = (start, end) => {
  if (start && !end) {
    return {
      start,
      end: start,
    };
  }
  const tempStart = parseInt(start.replace(/-/g, ""));
  const tempEnd = parseInt(end.replace(/-/g, ""));
  return tempStart > tempEnd
    ? {
        start: end,
        end: start,
      }
    : {
        start,
        end,
      };
};
const close = () => {
  setTimeout(() => {
    datePick.value[0] && datePick.value[0].close();
  }, 20);
};
const openDatePick = () => {
  if (props.disabled) return;
  datePick.value.open();
};
</script>

<style lang="scss" scoped>
.time-selector {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 30rpx;
  background-color: #fff;
  min-height: 102rpx;
  border-bottom: 1rpx solid #f1f2f3;
  &-content {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 24rpx 0 20rpx;
    &-value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    &-placeholder {
      color: #a0aec0;
    }
    &.normal {
      &::after {
        content: "";
        width: 30rpx;
        height: 30rpx;
        margin-left: 20rpx;
        background: url("/static/notary/box_date_icon.svg") no-repeat center /
          cover;
      }
    }
  }
}
</style>
