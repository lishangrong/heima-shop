<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import GoodsItem from './components/GoodsItem.vue'
import PageSkeleton from './components/PageSkeleton.vue'
import {
  getHomeBannerAPI,
  getHomeCategoryAPI,
  getHomeHotAPI,
  getHomeGuessLikeAPI,
} from '@/services/home'
import type { BannerItem, CategoryItem, HotItem, GuessLikeItem } from '@/types/home'

// ==================== 数据状态类型 ====================
type DataStatus = 'loading' | 'success' | 'error'

// ==================== 轮播图 ====================
const bannerList = ref<BannerItem[]>([])
const bannerStatus = ref<DataStatus>('loading')

const getHomeBannerData = async () => {
  bannerStatus.value = 'loading'
  try {
    const res = await getHomeBannerAPI(1)
    bannerList.value = res.result
    bannerStatus.value = 'success'
  } catch {
    bannerStatus.value = 'error'
  }
}

// ==================== 分类面板 ====================
const categoryList = ref<CategoryItem[]>([])
const categoryStatus = ref<DataStatus>('loading')

const getHomeCategoryData = async () => {
  categoryStatus.value = 'loading'
  try {
    const res = await getHomeCategoryAPI()
    categoryList.value = res.result
    categoryStatus.value = 'success'
  } catch {
    categoryStatus.value = 'error'
  }
}

// ==================== 推荐专区 ====================
const hotList = ref<HotItem[]>([])
const hotStatus = ref<DataStatus>('loading')

const getHomeHotData = async () => {
  hotStatus.value = 'loading'
  try {
    const res = await getHomeHotAPI()
    hotList.value = res.result
    hotStatus.value = 'success'
  } catch {
    hotStatus.value = 'error'
  }
}

// ==================== 猜你喜欢（分页） ====================
const guessLikeList = ref<GuessLikeItem[]>([])
const guessLikeStatus = ref<DataStatus>('loading')
const currentPage = ref(1)
const isFinished = ref(false)
const isLoading = ref(false)

const getHomeGuessLikeData = async () => {
  // 防重入：上一请求未完成时不再发起
  if (isLoading.value) return
  // 无更多数据
  if (isFinished.value) return

  isLoading.value = true
  // 首次加载设置 loading 状态
  if (currentPage.value === 1) {
    guessLikeStatus.value = 'loading'
  }

  try {
    const res = await getHomeGuessLikeAPI(currentPage.value)
    const { items, pages } = res.result

    if (items.length === 0 || currentPage.value >= pages) {
      isFinished.value = true
    }

    // 首页替换，翻页追加
    if (currentPage.value === 1) {
      guessLikeList.value = items
    } else {
      guessLikeList.value = [...guessLikeList.value, ...items]
    }

    guessLikeStatus.value = 'success'
    currentPage.value++
  } catch {
    if (currentPage.value === 1) {
      guessLikeStatus.value = 'error'
    }
    // 翻页失败时不增加页码，下次重试同一页
  } finally {
    isLoading.value = false
  }
}

// ==================== 触底加载 ====================
onReachBottom(() => {
  getHomeGuessLikeData()
})

// ==================== 下拉刷新 ====================
onPullDownRefresh(async () => {
  // 重置所有状态
  currentPage.value = 1
  isFinished.value = false
  isLoading.value = false
  guessLikeList.value = []

  // 并行请求所有数据
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    getHomeGuessLikeData(),
  ])

  uni.stopPullDownRefresh()
})

// ==================== 重试函数 ====================
const retryBanner = () => getHomeBannerData()
const retryCategory = () => getHomeCategoryData()
const retryHot = () => getHomeHotData()
const retryGuessLike = () => getHomeGuessLikeData()

// ==================== 整体骨架屏判断 ====================
const isAllLoading = () => {
  return (
    bannerStatus.value === 'loading' &&
    categoryStatus.value === 'loading' &&
    hotStatus.value === 'loading' &&
    guessLikeStatus.value === 'loading'
  )
}

// ==================== 页面加载 ====================
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
  getHomeGuessLikeData()
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />

  <!-- 骨架屏：全部模块都在加载时展示 -->
  <PageSkeleton v-if="isAllLoading()" />

  <!-- 已有部分数据加载完成时展示内容 -->
  <template v-else>
    <!-- 轮播图 -->
    <view class="section">
      <XtxSwiper v-if="bannerStatus === 'success'" :list="bannerList" />
      <view v-else-if="bannerStatus === 'error'" class="error-tip" @tap="retryBanner">
        <text class="error-text">轮播图加载失败，点击重试</text>
      </view>

      <!-- 分类面板 -->
      <CategoryPanel v-if="categoryStatus === 'success'" :list="categoryList" />
      <view v-else-if="categoryStatus === 'error'" class="error-tip" @tap="retryCategory">
        <text class="error-text">分类加载失败，点击重试</text>
      </view>

      <!-- 推荐专区 -->
      <HotPanel v-if="hotStatus === 'success'" :list="hotList" />
      <view v-else-if="hotStatus === 'error'" class="error-tip" @tap="retryHot">
        <text class="error-text">推荐专区加载失败，点击重试</text>
      </view>

      <!-- 猜你喜欢 -->
      <view class="guess-like">
        <view class="guess-like-header">
          <text class="guess-like-title">猜你喜欢</text>
        </view>

        <template v-if="guessLikeStatus === 'success' || guessLikeStatus === 'error'">
          <view class="goods-list">
            <GoodsItem
              v-for="item in guessLikeList"
              :key="item.id"
              :item="item"
            />
          </view>

          <!-- 加载中提示 -->
          <view v-if="isLoading" class="loading-tip">
            <text class="loading-text">正在加载...</text>
          </view>

          <!-- 没有更多数据 -->
          <view v-if="isFinished && guessLikeList.length > 0" class="no-more-tip">
            <text class="no-more-text">没有更多商品了</text>
          </view>

          <!-- 猜你喜欢加载失败（首页加载失败时展示） -->
          <view
            v-if="guessLikeStatus === 'error' && guessLikeList.length === 0"
            class="error-tip"
            @tap="retryGuessLike"
          >
            <text class="error-text">加载失败，点击重试</text>
          </view>
        </template>

        <!-- 猜你喜欢首次加载占位 -->
        <view v-if="guessLikeStatus === 'loading'" class="loading-tip">
          <text class="loading-text">正在加载...</text>
        </view>
      </view>
    </view>
  </template>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}

.section {
  padding-bottom: 20rpx;
}

// 错误提示
.error-tip {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40rpx 0;

  .error-text {
    font-size: 26rpx;
    color: #999;
    padding: 12rpx 30rpx;
    border: 1rpx solid #ddd;
    border-radius: 30rpx;
  }
}

// 猜你喜欢
.guess-like {
  padding: 0 20rpx;

  .guess-like-header {
    padding: 20rpx 0;
    .guess-like-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
  }
}

// 加载提示
.loading-tip {
  display: flex;
  justify-content: center;
  padding: 30rpx 0;

  .loading-text {
    font-size: 24rpx;
    color: #999;
  }
}

// 没有更多提示
.no-more-tip {
  display: flex;
  justify-content: center;
  padding: 30rpx 0 60rpx;

  .no-more-text {
    font-size: 24rpx;
    color: #ccc;
  }
}
</style>
