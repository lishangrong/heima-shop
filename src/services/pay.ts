import { http } from '@/utils/http'

/**
 * 获取微信支付参数
 * @param data 订单id
 * @returns
 */
export const getPayWxMiniPayAPI = (data: { orderId: string }) => {
  return http<WechatMiniprogram.RequestPaymentOption>({
    url: '/pay/wxPay/miniPay',
    method: 'GET',
    data,
  })
}

/**
 * 模拟支付-内测版
 * @param data 订单id
 * @returns
 */
export const getPayMockAPI = (data: { orderId: string }) => {
  return http({
    url: '/pay/mock',
    method: 'GET',
    data,
  })
}
