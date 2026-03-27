import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'

export const useAdressStore = defineStore('address', {
  state: () => ({
    selectedAddress: null as AddressItem | null,
  }),

  actions: {
    changeSelectedAddress(val: AddressItem) {
      this.selectedAddress = val
    },
  },
})
