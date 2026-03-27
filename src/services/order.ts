import type { OrderCreateParams, OrderPreResult, OrderResult } from '@/types/order'
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

/**
 * 提交订单
 * @param data 订单提交参数
 * @returns 订单Id
 */
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return http<{ id: string }>({
    url: '/member/order',
    method: 'POST',
    data,
  })
}

/**
 * 获取订单详情
 * @param id 订单id
 * @returns 订单详情
 */
export const getMemberOrderByIdAPI = (id: string) => {
  return http<OrderResult>({
    url: '/member/order/' + id,
    method: 'GET',
  })
}

/**
 * 模拟发货-内测版
 * @description 在DEV环境下使用，仅在订单状态为待发货时，可模拟发货，调用后订单状态修改为待收货，包含模拟物流。
 * @param id 订单id
 */
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/consignment/${id}`,
  })
}
