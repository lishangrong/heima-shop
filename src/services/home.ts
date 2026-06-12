import { http } from '@/utils/http'
import type { BannerItem, CategoryItem, HotItem, GuessLikeItem, PageResult } from '@/types/home'

/**
 * 获取首页banner
 * @param distributionSite 活动 banner 位置，1 代表首页，2 代表商品分类页，默认为 1
 * @returns
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: {
      distributionSite,
    },
  })
}

/**
 * 首页-前台分类-小程序
 * @returns 分类列表
 */
export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}

/**
 * 首页-推荐专区
 * @returns 推荐列表
 */
export const getHomeHotAPI = () => {
  return http<HotItem[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}

/**
 * 首页-猜你喜欢
 * @param page 页码，默认 1
 * @param pageSize 每页条数，默认 10
 * @returns 分页商品列表
 */
export const getHomeGuessLikeAPI = (page = 1, pageSize = 10) => {
  return http<PageResult<GuessLikeItem>>({
    url: '/home/goods/guessLike',
    method: 'GET',
    data: {
      page,
      pageSize,
    },
  })
}
