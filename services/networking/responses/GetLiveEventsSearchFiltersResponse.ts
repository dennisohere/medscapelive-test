import LiveEventSearchFilter from '~/models/LiveEventSearchFilter'

export default class GetLiveEventSearchFiltersResponse {
  readonly searchFilters: LiveEventSearchFilter[] = []
  readonly allLocations?: string[]
}
