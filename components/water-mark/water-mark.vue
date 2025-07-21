<template>
  <view class="water-mark">
    <view class="water-mark-area">
      <view class="water-mark-item" v-for="item in 10" :key="item">
        <view class="water-mark-text" v-for="item in finallyCols" :key="item">
          {{ curTextRule }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserInfoStore } from '@/store/useUserInfoStore';
import dayjs from 'dayjs'
const props = defineProps({
  curText: {
    type: String,
    default: '',
  },
});
const finallyCols = ref(4);
const curTextRule = computed(() => {
    const { user } = useUserInfoStore()
    if (typeof user !== 'object' || user.userName) {
        return props.curText || `${user.userName || '用户'}-${user?.userPhone?.slice(-4)}-${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
    } else {
        return ''
    }
});
</script>

<style lang="scss" scoped>
.water-mark {
  position: fixed;
  left: 0%;
  top: 0%;
  width: 150%;
  height: 120%;
  z-index: 10;
  overflow: hidden;
  pointer-events: none;

  .water-mark-item {
    margin-bottom: 50rpx;
    display: flex;
  }

  .water-mark-area {
    width: 100%;
    height: 100%;
    transform: translateX(-10%) rotate(-10deg);
    .water-mark-text {
      white-space: nowrap;
      display: inline-block;
      color: #EAEAEA;
      font-size: 22rpx;
      margin: 40rpx 80rpx;
    }
  }
}
</style>
