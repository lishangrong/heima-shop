<script setup lang="ts">
import type { HotItem } from '@/types/home'

defineProps<{
  list: HotItem[]
}>()
</script>

<template>
  <view class="hot-panel" v-if="list.length">
    <view class="hot-header">
      <text class="hot-title">推荐专区</text>
    </view>
    <view class="hot-list">
      <navigator
        v-for="item in list"
        :key="item.id"
        class="hot-item"
        hover-class="none"
        :url="`/pages/index/index?id=${item.id}&type=${item.type}`"
      >
        <image
          v-if="item.pictures.length"
          class="hot-image"
          mode="aspectFill"
          :src="item.pictures[0]"
          lazy-load
        />
        <view class="hot-info">
          <text class="hot-name">{{ item.title }}</text>
          <text class="hot-alt">{{ item.alt }}</text>
        </view>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.hot-panel {
  margin: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;

  .hot-header {
    margin-bottom: 20rpx;
    .hot-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .hot-list {
    display: flex;
    gap: 16rpx;
  }

  .hot-item {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .hot-images,
  .hot-image {
    width: 100%;
    height: 200rpx;
    border-radius: 8rpx;
    background-color: #efefef;
  }

  .hot-info {
    margin-top: 12rpx;

    .hot-name {
      display: block;
      font-size: 26rpx;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .hot-alt {
      display: block;
      font-size: 22rpx;
      color: #999;
      margin-top: 4rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
