import { UIServiceBase } from './base/UIServiceBase'
import { VuetifyBreakpoints } from '~/core/constants/vuetify.constants'
import {
  HOME_HERO_HEADER,
  UPCOMING_EVENTS_HEADER
} from '~/core/constants/user-facing-strings/home-user-strings'
import * as LABEL from '~/core/constants/user-facing-strings/label-strings'

export class HomeUIService extends UIServiceBase {
  get aboutText(): string {
    switch (this.breakpointService.breakpoint.name) {
      case VuetifyBreakpoints.XS:
        return LABEL.ABOUT
      default:
        return LABEL.ABOUT_MEDSCAPE_LIVE
    }
  }

  readonly heroHeader = HOME_HERO_HEADER
  readonly upcomingEventsHeader = UPCOMING_EVENTS_HEADER
}
