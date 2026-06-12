<script setup lang="ts">
// 首屏顶部骨架屏：轮播图 + 分类 + 推荐专区 灰块占位，避免布局抖动
</script>

<template>
  <view class="home-skeleton">
    <!-- 轮播图占位 -->
    <view class="banner"></view>
    <!-- 分类占位 -->
    <view class="category">
      <view class="cate-item" v-for="i in 10" :key="i">
        <view class="icon"></view>
        <view class="text"></view>
      </view>
    </view>
    <!-- 推荐专区占位 -->
    <view class="hot">
      <view class="hot-item" v-for="i in 2" :key="i"></view>
    </view>
  </view>
</template>

<style lang="scss">
.home-skeleton {
  .banner {
    height: 280rpx;
    margin: 0 20rpx;
    border-radius: 10rpx;
    background-color: #efefef;
  }

  .category {
    display: flex;
    flex-wrap: wrap;
    margin: 20rpx 0;
    padding: 10rpx 0;

    .cate-item {
      width: 150rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20rpx;
    }

    .icon {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-color: #efefef;
    }

    .text {
      width: 60rpx;
      height: 24rpx;
      margin-top: 12rpx;
      border-radius: 6rpx;
      background-color: #efefef;
    }
  }

  .hot {
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;

    .hot-item {
      width: 345rpx;
      height: 350rpx;
      border-radius: 10rpx;
      background-color: #efefef;
    }
  }
}
</style>
