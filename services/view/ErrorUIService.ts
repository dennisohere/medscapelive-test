import { UIServiceBase } from './base/UIServiceBase'
import * as ERROR from '~/core/constants/user-facing-strings/error-strings'

export class ErrorUIService extends UIServiceBase {
  readonly serverError = ERROR.SERVER_ERROR_MESSAGE
  readonly invalidSearchParams = ERROR.INVALID_SEARCH_PARAMETERS_MESSAGE
  readonly invalidEmailAddress = ERROR.INVALID_EMAIL_MESSAGE
  readonly errorProcessingEmail = ERROR.ERROR_PROCESSING_EMAIL
  readonly noEvents = ERROR.NO_EVENTS_MESSAGE
  readonly noSearchFilters = ERROR.NO_SEARCH_FILTERS_MESSAGE
  readonly dateOrderError = ERROR.DATE_ORDER_ERROR_MESSAGE
  readonly videoPlayerNotSupported = ERROR.VIDEO_PLAYER_NOT_SUPPORTED
}
