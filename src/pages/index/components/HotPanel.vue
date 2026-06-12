<script setup lang="ts">
import type { HotItem } from '@/types/home'

defineProps<{
  list: HotItem[]
}>()
</script>

<template>
  <view class="panel hot" v-for="item in list" :key="item.id">
    <view class="title">
      <text class="title-text">{{ item.title }}</text>
      <text class="title-desc">{{ item.alt }}</text>
    </view>
    <view class="goods">
      <view class="goods-item" v-for="(src, index) in item.pictures" :key="index">
        <image class="image" mode="aspectFill" lazy-load :src="src"></image>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
/* 推荐专区 */
.panel.hot {
  margin: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  overflow: hidden;

  .title {
    display: flex;
    align-items: center;
    padding: 24rpx;

    .title-text {
      font-size: 32rpx;
      color: #262626;
      font-weight: 500;
    }

    .title-desc {
      margin-left: 18rpx;
      font-size: 24rpx;
      color: #7f7f7f;
    }
  }

  .goods {
    display: flex;
    padding: 0 24rpx 24rpx;

    .goods-item {
      flex: 1;
      height: 260rpx;
      margin-right: 12rpx;
      border-radius: 10rpx;
      overflow: hidden;
      background-color: #efefef;

      &:last-child {
        margin-right: 0;
      }
    }

    .image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
