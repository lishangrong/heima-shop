import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

/**
 * 添加收货地址
 * * @param data
 * @returns
 */
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    url: '/member/address',
    method: 'POST',
    data,
  })
}

/**
 * 获取收货地址列表
 * @returns 收货地址列表
 */
export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    url: '/member/address',
    method: 'GET',
  })
}

/**
 * 获取收货地址详情
 * @param id 地址id
 * @returns
 */
export const getMemberAddressByIdAPI = (id: string) => {
  return http<AddressItem>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}

/**
 * 更新收货地址
 * @param id 地址id
 * @param data 更新参数
 * @returns
 */
export const putMemberAddressByIdAPI = (id: string, data: AddressParams) => {
  return http({
    url: `/member/address/${id}`,
    method: 'PUT',
    data,
  })
}
