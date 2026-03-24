import XtxGuess from '@/components/XtxGuess.vue'
import XtxSwiper from '@/components/XtxSwiper.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

export type XtxGuessInstance = InstanceType<typeof XtxGuess>
