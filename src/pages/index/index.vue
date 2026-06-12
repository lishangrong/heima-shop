<script setup lang="ts">
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import HomeSkeleton from './components/HomeSkeleton.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'

// 轮播图
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI(1)
  bannerList.value = res.result
}
// 分类
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
// 推荐专区
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 首屏数据状态：加载中 / 加载失败
const isLoading = ref(false)
const isError = ref(false)
// 并行加载首屏顶部数据（轮播图 + 分类 + 推荐专区）
const loadTopData = async () => {
  isLoading.value = true
  isError.value = false
  try {
    await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  } catch {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

onLoad(() => {
  loadTopData()
})

// 猜你喜欢组件实例（暴露 getMore / resetData）
const guessRef = ref<{ getMore: () => void; resetData: () => void }>()
// 触底加载更多（防重逻辑在 XtxGuess 内部的 isLoading/isFinish 中处理）
onReachBottom(() => {
  guessRef.value?.getMore()
})
// 下拉刷新：重载顶部数据 + 猜你喜欢重置回第一页
onPullDownRefresh(async () => {
  await loadTopData()
  guessRef.value?.resetData()
  guessRef.value?.getMore()
  uni.stopPullDownRefresh()
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />

  <!-- 首屏加载中：骨架屏（仅首次无数据时显示） -->
  <HomeSkeleton v-if="isLoading && bannerList.length === 0" />

  <!-- 首屏加载失败：错误提示 + 重试按钮（仅首次无数据时显示，避免白屏/空转） -->
  <view v-else-if="isError && bannerList.length === 0" class="error-state">
    <text class="error-text">加载失败，点击重试</text>
    <button class="retry-btn" size="mini" plain @tap="loadTopData">重试</button>
  </view>

  <!-- 正常内容 -->
  <template v-else>
    <!-- 自定义轮播图 -->
    <XtxSwiper :list="bannerList" />
    <!-- 分类面板 -->
    <CategoryPanel :list="categoryList" />
    <!-- 推荐专区 -->
    <HotPanel :list="hotList" />
    <!-- 猜你喜欢（独立分页，触底加载更多） -->
    <XtxGuess ref="guessRef" />
  </template>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;

  .error-text {
    margin-bottom: 24rpx;
    font-size: 28rpx;
    color: #999;
  }

  .retry-btn {
    color: #27ba9b;
    border-color: #27ba9b;
    font-size: 28rpx;
  }
}
</style>
