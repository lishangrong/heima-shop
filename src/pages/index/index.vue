<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'
import type { BannerItem, CategoryItem } from '@/types/home'
import { ref } from 'vue'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI(1)
  bannerList.value = res.result
}

const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 自定义轮播图 -->
  <XtxSwiper :list="bannerList" />
  <!-- 分类面板 -->
  <CategoryPanel :list="categoryList" />
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
