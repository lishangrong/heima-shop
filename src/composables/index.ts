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
