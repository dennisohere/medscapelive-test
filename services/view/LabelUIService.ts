import { UIServiceBase } from './base/UIServiceBase'
import * as LABEL from '~/core/constants/user-facing-strings/label-strings'

export class LabelUIService extends UIServiceBase {
  readonly eventInfo = LABEL.EVENT_INFO
  readonly search = LABEL.SEARCH
  readonly aboutMedscapeLive = LABEL.ABOUT_MEDSCAPE_LIVE
  readonly about = LABEL.ABOUT
  readonly home = LABEL.HOME
  readonly events = LABEL.EVENTS
  readonly viewAllEvents = LABEL.VIEW_ALL_EVENTS
  readonly allSpecialties = LABEL.ALL_SPECIALTIES
  readonly allLocations = LABEL.ALL_LOCATIONS
  readonly specialty = LABEL.SPECIALTY
  readonly location = LABEL.LOCATION
  readonly anyDates = LABEL.ANY_DATES
  readonly from = LABEL.FROM
  readonly to = LABEL.TO
  readonly email = LABEL.EMAIL
  readonly accredited = LABEL.ACCREDITED
  readonly liveNow = LABEL.LIVENOW
  readonly register = LABEL.REGISTER
}
