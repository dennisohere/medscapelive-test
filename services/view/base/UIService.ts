import { HomeUIService } from '../HomeUIService'
import { EventsUIService } from '../EventsUIService'
import { HomeMarketingUIService } from '../HomeMarketingUIService'
import { AboutUIService } from '../AboutUIService'
import { LabelUIService } from '../LabelUIService'
import { ImgUIService } from '../ImgUIService'
import { ErrorUIService } from '../ErrorUIService'
import { EmailFormUIService } from '../EmailFormUIService'
import { RegistrationConfirmationUIService } from '../RegistrationConfirmationUIService'
import { RegistrationUnavailableUIService } from '../RegistrationUnavailableUIService'
import { UIServiceBase } from './UIServiceBase'

export class UIService extends UIServiceBase {
  readonly home = new HomeUIService(this.breakpointService)
  readonly homeMarketing = new HomeMarketingUIService(this.breakpointService)
  readonly events = new EventsUIService(this.breakpointService)
  readonly about = new AboutUIService(this.breakpointService)
  readonly label = new LabelUIService(this.breakpointService)
  readonly image = new ImgUIService(this.breakpointService)
  readonly error = new ErrorUIService(this.breakpointService)
  readonly emailForm = new EmailFormUIService(this.breakpointService)
  readonly registrationConfirmation = new RegistrationConfirmationUIService(
    this.breakpointService
  )

  readonly registrationUnavailable = new RegistrationUnavailableUIService(
    this.breakpointService
  )
}
