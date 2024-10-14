import {
  SHOW_HEADER_FOR_PAGE,
  UPDATE_APP_BAR_OPTIONS
} from '~/core/constants/message-bus.constants'
import { blueAppBarOptionsNoExtension } from '~/models/view/AppBarOptions'

export const EmailFormPageHeaderMixin = {
  mounted() {
    this.$bus.$emit(SHOW_HEADER_FOR_PAGE, true)
    this.$bus.$emit(UPDATE_APP_BAR_OPTIONS, blueAppBarOptionsNoExtension)
  }
}
