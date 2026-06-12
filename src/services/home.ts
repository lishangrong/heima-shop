import { http } from '@/utils/http'
import type {
  BannerItem,
  CategoryItem,
  GuessItem,
  HotItem,
  PageParams,
  PageResult,
} from '@/types/home'

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
 * 首页-热门推荐(推荐专区)-小程序
 * @returns 推荐专区列表
 */
export const getHomeHotAPI = () => {
  return http<HotItem[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}

/**
 * 首页-猜你喜欢-小程序(分页)
 * @param data 分页参数(可选) page 页码 / pageSize 每页条数
 * @returns 猜你喜欢分页数据
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    url: '/home/goods/guessLike',
    method: 'GET',
    data,
  })
}
