<template>
    <view class="my-remark">
        <view class="my-remark-title">{{props.title}}</view>
        <view class="my-remark-content" v-if="!props.disabled">
            <textarea
                class="my-remark-input"
                :maxlength="props.maxLength"
                v-model.trim="dataSource"
                :auto-height="isPhone"
                :placeholder="props.placeholder"
                placeholder-class="placeHolder"
                :disabled="props.disabled"
            />
            <view class="my-remark-text" v-if="dataSource && !props.disabled">
                <image
                    src="~@/static/common/list_text_del.svg"
                    @click.stop="handleClear"
                    class="my-remark-text-del"
                />
            </view>
        </view>
        <view
            class="my-remark-box"
            :style="{
                'background-color': props.disabledBgColor || '#eef5ff',
                padding: props.disabledPadding || '20rpx 30rpx',
            }"
            :class="props.type === 'input' ? 'input' : ''"
            v-else
        >
            <view v-html="dataSource?.replace(/\n/g, '<br/>') || '/'"></view>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { isPhone } from '@/common/util'
const props = defineProps({
    disabled: Boolean,
    title: String,
    modelValue: [Number, String],
    mode: {
        type: String,
        default: 'row'
    },
    maxLength: {
        type: Number,
        default: -1
    },
    placeholder: {
        type: String,
        default: '请输入'
    }
})
const emit = defineEmits(["update:modelValue"])
const dataSource = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const handleClear = () => {
    dataSource.value = '';
}
</script>

<style lang="scss" scoped>
.my-remark{
    overflow: hidden;
    &-title{
        font-size: 30rpx;
        line-height: 42rpx;
        padding: 26rpx 0 16rpx;
    }
    &-content{
        display: flex;
        align-items: center;
    }
    &-input{
        flex: 1;
    }
    &-text{
        display: flex;
        justify-content: flex-end;
        width: 34rpx;
        height: 100%;
        align-self: flex-start;
        &-del{
            width: 26rpx;
            height: 26rpx;
        }
    }
    &-box{
        background-color: #EEF5FF;
        padding: 20rpx;
        border-radius: 4rpx;
        margin-bottom: 20rpx;
    }
}
</style>