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
