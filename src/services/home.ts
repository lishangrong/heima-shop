import { http } from '@/utils/http'
import type { BannerItem, CategoryItem } from '@/types/home'

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
