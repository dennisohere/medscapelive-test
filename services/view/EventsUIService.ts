import { UIServiceBase } from './base/UIServiceBase'

export class EventsUIService extends UIServiceBase {
  get eventSearchHeader(): string {
    return 'Events'
  }

  readonly eventSearchResults = 'Events Found'

  readonly eventLocationOnline = 'Online'

  readonly eventMngSourceValue = 'MNG'

  readonly mngEventIndustryInfo = 'Information from industry'
}
