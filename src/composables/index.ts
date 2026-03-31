import { getMemberAddressAPI } from '@/services/address'
import type { AddressItem } from '@/types/address'
import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

/**
 * 猜你喜欢列表-组合式函数
 * @returns
 */
export const useGuessList = () => {
  const guessRef = ref<XtxGuessInstance>()

  const onScrollToLower = () => {
    guessRef.value?.getMore()
  }

  return {
    guessRef,
    onScrollToLower,
  }
}

/**
 * 收货地址列表-组合式函数
 */
export const useAddress = () => {
  // 收货地址列表
  const addressList = ref<AddressItem[]>([])
  const getMemberAddressList = async () => {
    const res = await getMemberAddressAPI()
    addressList.value = res.result
  }
  return {
    addressList,
    getMemberAddressList,
  }
}
