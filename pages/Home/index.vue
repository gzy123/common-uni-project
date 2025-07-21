<template>
  <view class="home"> 首页 </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, inject, computed } from "vue";
import config from "@/config";
import { router, isEmpty, createFileAllPath, toast } from "@/common/util";
import { debounce } from "lodash";
const $api = inject("$API");

onLoad((options) => {});
</script>

<style lang="scss" scoped>
@import "index.scss";
</style>
