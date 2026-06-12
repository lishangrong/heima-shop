import XtxSwiper from './XtxSwiper.vue'
import XtxGuess from './XtxGuess.vue'
import XtxGuessSkeleton from './XtxGuessSkeleton.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
    XtxGuessSkeleton: typeof XtxGuessSkeleton
  }
}
