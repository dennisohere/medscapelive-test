import * as liveEventSearchConstants from './liveEventSearch.action-types'
import * as MUTATIONS from './liveEventSearch.mutation-types'
import * as GETTERS from './liveEventSearch.getter-types'
import * as PROPERTIES from './liveEventSearch.property-types'

const name = 'liveEventSearch'

export {
  liveEventSearchConstants as ACTIONS,
  MUTATIONS,
  GETTERS,
  PROPERTIES,
  name
}

export enum LiveEventSearchType {
  search = 'search',
  upcoming = 'upcoming'
}
