<script setup lang="ts">
import type { GuessLikeItem } from '@/types/home'

defineProps<{
  item: GuessLikeItem
}>()
</script>

<template>
  <navigator
    class="goods-item"
    hover-class="none"
    :url="`/pages/index/index?id=${item.id}`"
  >
    <view class="goods-img-wrapper">
      <image
        class="goods-img"
        mode="aspectFill"
        :src="item.picture"
        lazy-load
      />
    </view>
    <view class="goods-info">
      <text class="goods-name ellipsis">{{ item.name }}</text>
      <text v-if="item.desc" class="goods-desc ellipsis">{{ item.desc }}</text>
      <view class="goods-price-row">
        <text class="goods-price">
          <text class="symbol">¥</text>{{ item.price }}
        </text>
        <text v-if="item.orderNum" class="goods-order">{{ item.orderNum }}人已购买</text>
      </view>
    </view>
  </navigator>
</template>

<style lang="scss">
.goods-item {
  width: calc(50% - 10rpx);
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;

  .goods-img-wrapper {
    width: 100%;
    height: 340rpx;
    background-color: #efefef;
  }

  .goods-img {
    width: 100%;
    height: 100%;
  }

  .goods-info {
    padding: 16rpx 16rpx 20rpx;

    .goods-name {
      font-size: 26rpx;
      color: #333;
      line-height: 1.4;
    }

    .goods-desc {
      display: block;
      font-size: 22rpx;
      color: #999;
      margin-top: 6rpx;
    }

    .goods-price-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-top: 12rpx;
    }

    .goods-price {
      color: #ff4d4f;
      font-size: 32rpx;
      font-weight: bold;

      .symbol {
        font-size: 24rpx;
        font-weight: normal;
      }
    }

    .goods-order {
      font-size: 20rpx;
      color: #999;
    }
  }
}
</style>
