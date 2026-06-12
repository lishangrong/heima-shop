<script setup lang="ts">
/**
 * 首页骨架屏
 * 在数据加载完成前展示占位内容，避免白屏
 */
</script>

<template>
  <view class="skeleton">
    <!-- 轮播图占位 -->
    <view class="skeleton-swiper">
      <view class="skeleton-block shimmer"></view>
    </view>

    <!-- 分类面板占位 -->
    <view class="skeleton-category">
      <view v-for="i in 10" :key="i" class="category-item">
        <view class="skeleton-circle shimmer"></view>
        <view class="skeleton-text shimmer"></view>
      </view>
    </view>

    <!-- 推荐专区占位 -->
    <view class="skeleton-hot">
      <view class="skeleton-title shimmer"></view>
      <view class="hot-list">
        <view v-for="i in 3" :key="i" class="hot-item">
          <view class="skeleton-block shimmer hot-img"></view>
          <view class="skeleton-text shimmer" style="width: 60%"></view>
        </view>
      </view>
    </view>

    <!-- 猜你喜欢占位 -->
    <view class="skeleton-goods">
      <view class="skeleton-title shimmer"></view>
      <view class="goods-list">
        <view v-for="i in 4" :key="i" class="goods-item">
          <view class="skeleton-block shimmer goods-img"></view>
          <view class="skeleton-text shimmer" style="width: 80%"></view>
          <view class="skeleton-text shimmer" style="width: 40%"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.skeleton {
  padding-bottom: 20rpx;

  // 闪烁动画
  @keyframes shimmer {
    0% {
      background-position: -600rpx 0;
    }
    100% {
      background-position: 600rpx 0;
    }
  }

  .shimmer {
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
    background-size: 1200rpx 100%;
    animation: shimmer 1.4s ease infinite;
  }

  // 通用占位块
  .skeleton-block {
    background-color: #f2f2f2;
    border-radius: 8rpx;
  }

  .skeleton-circle {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background-color: #f2f2f2;
  }

  .skeleton-text {
    height: 24rpx;
    background-color: #f2f2f2;
    border-radius: 4rpx;
    margin-top: 12rpx;
  }

  .skeleton-title {
    width: 200rpx;
    height: 32rpx;
    background-color: #f2f2f2;
    border-radius: 4rpx;
    margin-bottom: 20rpx;
  }

  // 轮播图
  .skeleton-swiper {
    height: 280rpx;
    .skeleton-block {
      width: 100%;
      height: 100%;
    }
  }

  // 分类面板
  .skeleton-category {
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0;
    .category-item {
      width: 150rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 16rpx;
    }
    .skeleton-text {
      width: 80rpx;
    }
  }

  // 推荐专区
  .skeleton-hot {
    padding: 20rpx;
    .hot-list {
      display: flex;
      gap: 16rpx;
    }
    .hot-item {
      flex: 1;
    }
    .hot-img {
      height: 200rpx;
    }
  }

  // 猜你喜欢
  .skeleton-goods {
    padding: 20rpx;
    .goods-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx;
    }
    .goods-item {
      width: calc(50% - 8rpx);
      background-color: #fff;
      border-radius: 12rpx;
      padding: 16rpx;
    }
    .goods-img {
      height: 340rpx;
    }
  }
}
</style>
