import type { OrderPreResult } from '@/types/order'
import { http } from '@/utils/http'

/**
 * 获取订单预创建信息
 * @returns 订单预创建信息
 */
export const getMemberOrderPreAPI = () => {
  return http<OrderPreResult>({
    url: '/member/order/pre',
    method: 'GET',
  })
}

/**
 * 获取订单预创建信息（立即购买）
 * @returns 订单预创建信息（当前订单）
 */
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return http<OrderPreResult>({
    url: '/member/order/pre/now',
    method: 'GET',
    data,
  })
}
