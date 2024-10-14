import {
  SHOW_HEADER_FOR_PAGE,
  SCROLL,
  SHOW_HEADER
} from '@/core/constants/message-bus.constants'

export default function StickyHeroHeaderMixin(bannerElementReference: string) {
  return {
    data() {
      return {
        isHeaderShown: false
      }
    },
    mounted() {
      this.$bus.$emit(SHOW_HEADER_FOR_PAGE, false)
      this.$on(SHOW_HEADER, this.onShowHeader)
      window.addEventListener(SCROLL, this.handleScroll)
    },
    beforeUnmount() {
      window.removeEventListener(SCROLL, this.handleScroll)
      this.$off(SHOW_HEADER, this.onShowHeader)
    },
    methods: {
      handleScroll() {
        const homeSearchHeader = this.$refs[bannerElementReference]
        const scrollY = window.scrollY || document.documentElement.scrollTop
        if (
          homeSearchHeader.$el instanceof HTMLElement &&
          scrollY > homeSearchHeader.$el.offsetHeight
        ) {
          if (!this.isHeaderShown) {
            this.$bus.$emit(SHOW_HEADER, true)
          }
        } else if (this.isHeaderShown) {
          this.$bus.$emit(SHOW_HEADER, false)
        }
      },
      onShowHeader(showHeader: boolean) {
        this.isHeaderShown = showHeader
      }
    }
  }
}
