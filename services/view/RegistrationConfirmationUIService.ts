import { UIServiceBase } from './base/UIServiceBase'
import * as LABEL from '~/core/constants/user-facing-strings/registration-confirm-form-user-string'

export class RegistrationConfirmationUIService extends UIServiceBase {
  readonly registrationConfirmLabel = LABEL.REGISTRATION_CONFIRM_LABEL
  readonly joinEventLabel = LABEL.JOIN_EVENT_LABEL
  readonly preJoinEventLabel = LABEL.PRE_JOIN_EVENT_LABEL
  readonly addToCalendarLabel = LABEL.ADD_TO_CALENDER_LABEL
  readonly eventDetailsLabel = LABEL.EVENT_DETAILS

  readonly downloadText = LABEL.DOWNLOAD_APP_TEXT
  readonly downloadLinkText = LABEL.DOWNLOAD_APP_LINK_TEXT
}
