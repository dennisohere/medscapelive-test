import { Dayjs } from 'dayjs'
import { type AxiosError } from 'axios'
import { LiveEventSearchType } from './constants/liveEventSearch.types'
import LiveEvent from '~/models/LiveEvent'
import * as prop from '~/store/liveEventSearch/constants/liveEventSearch.property-types'
import LiveEventSearchFilter from '~/models/LiveEventSearchFilter'

const { search, upcoming } = LiveEventSearchType

class LiveEventSearchState {
  [prop.gettingLiveEvents] = false;
  [prop.liveEvents] = [] as LiveEvent[];
  [prop.getLiveEventsError]?: AxiosError
}

export default class LiveEventSearchStoreState {
  [search] = new LiveEventSearchState();
  [upcoming] = new LiveEventSearchState();
  [prop.startDate]?: Dayjs;
  [prop.endDate]?: Dayjs;
  [prop.selectedSpecialties]?: LiveEventSearchFilter[];
  [prop.selectedLocations]?: string[];
  [prop.allLocations]?: string[];
  [prop.searchFilters] = [] as LiveEventSearchFilter[];
  [prop.fetchingSearchFilters] = false;
  [prop.searchFiltersNetworkError]?: AxiosError;
  [prop.includeMngEvents]?: true
}
