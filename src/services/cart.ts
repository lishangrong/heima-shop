import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

/**
 * 添加到购物车
 * @param data 商品id和数量
 * @returns
 */
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data,
  })
}

/**
 * 获取购物车列表
 * @returns 购物车列表
 */
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    url: '/member/cart',
    method: 'GET',
  })
}

/**
 * 删除购物车商品
 * @param data 请求体参数 ids SKUID 集合
 * @returns
 */
export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return http({
    url: `/member/cart`,
    method: 'DELETE',
    data,
  })
}
