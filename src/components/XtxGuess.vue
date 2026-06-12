<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import type { GuessItem, PageParams } from '@/types/home'
import { onMounted, ref } from 'vue'

// 分页参数（page/pageSize 不参与渲染，使用普通对象即可）
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}
// 列表数据
const guessList = ref<GuessItem[]>([])
// 请求在途标志：防止上一请求未完成时重复发起同一分页请求
const isLoading = ref(false)
// 无更多标志：后端返回空数组或页码超过总页数时置为 true，并停止请求
const isFinish = ref(false)
// 加载失败标志：用于底部「加载失败，点击重试」
const isError = ref(false)

/** 获取/追加下一页数据 */
const getMore = async () => {
  // 已无更多 或 正在请求 → 直接拦截，避免重复请求
  if (isFinish.value || isLoading.value) return
  isLoading.value = true
  isError.value = false
  try {
    const res = await getHomeGoodsGuessLikeAPI(pageParams)
    // 追加当前页数据
    guessList.value.push(...res.result.items)
    // 空数组 或 已到最后一页 → 标记无更多
    if (res.result.items.length === 0 || pageParams.page >= res.result.pages) {
      isFinish.value = true
    } else {
      // 仅在成功后递增页码；失败则保留当前页码以便重试同一页
      pageParams.page++
    }
  } catch {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

/** 重置为第一页（供下拉刷新调用） */
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  isFinish.value = false
  isError.value = false
}

// 组件挂载后加载首屏第一页
onMounted(() => {
  getMore()
})

// 暴露方法给父组件（页面在 onReachBottom / onPullDownRefresh 中调用）
defineExpose({
  getMore,
  resetData,
})
</script>

<template>
  <!-- 标题 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>

  <!-- 首屏加载：骨架屏占位 -->
  <XtxGuessSkeleton v-if="isLoading && guessList.length === 0" />

  <!-- 商品列表 -->
  <view class="guess" v-else>
    <navigator
      class="guess-item"
      hover-class="none"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" lazy-load :src="item.picture"></image>
      <view class="name">{{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>

  <!-- 底部加载状态 -->
  <view class="loading-text">
    <text v-if="isError" class="error" @tap="getMore">加载失败，点击重试</text>
    <text v-else-if="isFinish">没有更多商品了~</text>
    <text v-else-if="isLoading && guessList.length > 0">正在加载...</text>
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}

/* 标题 */
.caption {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100rpx;

  .text {
    display: flex;
    align-items: center;
    padding: 0 28rpx 0 30rpx;
    font-size: 28rpx;
    color: #262626;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url('@/static/images/bubble.png');
      background-size: contain;
    }

    &::before {
      margin-right: 14rpx;
    }

    &::after {
      margin-left: 14rpx;
    }
  }
}

/* 商品列表 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;

  .guess-item {
    width: 345rpx;
    padding: 24rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
    box-sizing: border-box;
  }

  .image {
    width: 304rpx;
    height: 304rpx;
    background-color: #efefef;
  }

  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .small {
    font-size: 80%;
  }
}

/* 底部加载状态文案 */
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 40rpx;

  .error {
    color: #cf4444;
  }
}
</style>
