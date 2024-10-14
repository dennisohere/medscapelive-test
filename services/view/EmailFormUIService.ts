import { UIServiceBase } from './base/UIServiceBase'
import * as LABEL from '~/core/constants/user-facing-strings/email-form-user-string'
import { SUPPORT_LINK } from '~/core/constants/router-paths'

export class EmailFormUIService extends UIServiceBase {
  readonly supportLink = SUPPORT_LINK
  readonly title = LABEL.EMAIL_FORM_TITLE
  readonly body = LABEL.EMAIL_FORM_BODY
  readonly cmePrompt = LABEL.CME_EMAIL_FORM_PROMPT
  readonly checkInPrompt = LABEL.CHECKIN_EMAIL_FORM_PROMPT
  readonly checkInPromptEventClose =
    LABEL.CHECKIN_EMAIL_FORM_PROMPT_EVENT_CLOSED

  readonly buttonText = LABEL.EMAIL_FORM_BUTTON_TEXT
  readonly contactText = LABEL.CONTACT
  readonly welcomeText = LABEL.WELCOME_TEXT
  readonly checkInButtonText = LABEL.CHECKIN_BUTTON_TEXT
  readonly registerPrompt = LABEL.REGISTER_TO_EVENT_PROMPT
  readonly nonRegisteredPromptP2PEvent = LABEL.P2P_NON_REGISTERED_USER_PROMPT
  readonly registerWithDifferentEmailPrompt =
    LABEL.REGISTER_WITH_DIFFERENT_EMAIL_PROMPT
}
