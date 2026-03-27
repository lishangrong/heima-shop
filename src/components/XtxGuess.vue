<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import { onMounted, ref } from 'vue'
import type { GuessItem } from '@/types/home'
import type { PageParams } from '@/types/global'

// 分页参数
const pageParams: Required<PageParams> = {
  page: import.meta.env.DEV ? 30 : 1,
  pageSize: 10,
}
// 结束标识
const finish = ref(false)
// 猜你喜欢列表
const guessList = ref<GuessItem[]>([])
const getHomeGoodsGuessLikeData = async () => {
  if (finish.value) {
    return uni.showToast({
      title: '没有更多数据~',
      icon: 'none',
    })
  }
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  guessList.value = [...guessList.value, ...res.result.items]
  if (res.result.pages > pageParams.page) {
    pageParams.page++
  } else {
    finish.value = true
  }
}
// 重置数据
const resetData = () => {
  pageParams.page = 1
  finish.value = false
  guessList.value = []
}
onMounted(() => {
  getHomeGoodsGuessLikeData()
})

// 暴露方法
defineExpose({
  getMore: getHomeGoodsGuessLikeData,
  resetData,
})
//
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name"> {{ item.name }} </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text"> {{ finish ? '没有更多数据~' : '正在加载...' }} </view>
</template>

<style lang="scss">
@import '@/components/styles/XtxGuess.scss';
</style>
