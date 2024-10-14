import { UIServiceBase } from './base/UIServiceBase'
import * as LABEL from '~/core/constants/user-facing-strings/registration-unavailable-user-string'

export class RegistrationUnavailableUIService extends UIServiceBase {
  readonly registrationUnavailableLabel = LABEL.REGISTRATION_UNAVAILABEL_LABEL
  readonly registrationUnavailableMessage =
    LABEL.REGISTRATION_UNAVAILABEL_MESSAGE
}
