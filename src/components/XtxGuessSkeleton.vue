<script setup lang="ts">
// 猜你喜欢-骨架屏：首屏加载时灰块占位，避免布局抖动
</script>

<template>
  <view class="guess-skeleton">
    <view class="guess-item" v-for="i in 6" :key="i">
      <view class="image"></view>
      <view class="line"></view>
      <view class="line short"></view>
      <view class="price"></view>
    </view>
  </view>
</template>

<style lang="scss">
.guess-skeleton {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;

  .guess-item {
    width: 345rpx;
    margin-bottom: 20rpx;
    padding: 16rpx;
    border-radius: 10rpx;
    background-color: #fff;
    box-sizing: border-box;
  }

  .image {
    width: 100%;
    height: 260rpx;
    border-radius: 10rpx;
    background-color: #efefef;
  }

  .line,
  .price {
    margin-top: 16rpx;
    height: 28rpx;
    border-radius: 6rpx;
    background-color: #efefef;
  }

  .line.short {
    width: 60%;
  }

  .price {
    width: 40%;
    height: 32rpx;
  }
}
</style>
