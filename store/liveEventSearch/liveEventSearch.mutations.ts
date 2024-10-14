import {MutationTree} from 'vuex'
import {type AxiosError} from 'axios'
import dayjs, {Dayjs} from 'dayjs'
import * as mut from './constants/liveEventSearch.mutation-types'
import * as prop from './constants/liveEventSearch.property-types'
import {allLocations} from './constants/liveEventSearch.property-types'
import * as get from './constants/liveEventSearch.getter-types'
import LiveEvent from '@/models/LiveEvent'
import {LiveEventSearchType} from '~/store/liveEventSearch/constants/liveEventSearch.types'

import LiveEventSearchStoreState from '~/store/liveEventSearch/liveEventSearch.state'
import {logger} from '~/core/logger'
import LiveEventSearchFilter from '~/models/LiveEventSearchFilter'


export const mutations: MutationTree<LiveEventSearchStoreState> = {
  [mut.storeLiveEvents](
    state: LiveEventSearchStoreState,
    payload: { type: LiveEventSearchType; liveEvents: LiveEvent[] }
  ) {
    if (!payload?.type || !state[payload.type]) return
    state[payload.type].liveEvents = payload.liveEvents
  },
  [mut.startGetLiveEvents](
    state: LiveEventSearchStoreState,
    payload: { type: LiveEventSearchType }
  ) {
    if (!payload?.type || !state[payload.type]) return
    state[payload.type].gettingLiveEvents = true
  },
  [mut.endGetLiveEvents](
    state: LiveEventSearchStoreState,
    payload: { type: LiveEventSearchType }
  ) {
    if (!payload?.type || !state[payload.type]) return
    state[payload.type].gettingLiveEvents = false
  },
  [mut.setGetLiveEventsError](
    state: LiveEventSearchStoreState,
    payload: { type: LiveEventSearchType; error: AxiosError }
  ) {
    if (!payload?.type || !state[payload.type]) return
    let errorData
    if (payload.error) {
      errorData = {
        message: payload.error?.message,
        response: { status: payload.error?.response?.status }
      }
    }
    // Vue.set(state[payload.type], prop.getLiveEventsError, errorData)
    state[payload.type] = {...state[payload.type], [prop.getLiveEventsError]: errorData}
  },
  [mut.setStartDate](state: LiveEventSearchStoreState, payload: string) {
    const date = unwrapDateString(payload)
    state[prop.startDate] = date;

    // Vue.set(state, prop.startDate, date)
    logger.info('set start date', date)
  },
  [mut.setEndDate](state: LiveEventSearchStoreState, payload: string) {
    const date = unwrapDateString(payload)
    state[prop.endDate] = date;

    // Vue.set(state, prop.endDate, date)
    logger.info('set end date', date)
  },
  [mut.setSpecialties](
    state: LiveEventSearchStoreState,
    payload: LiveEventSearchFilter[]
  ) {
    // Vue.set(state, prop.selectedSpecialties, payload)
    state[prop.selectedSpecialties] = payload;

    logger.info('set selected specialty', payload?.length)
    const possibleLocations: string[] = getters[get.selectedSpecialtyLocations](
      state,
      getters,
      {},
      {}
    )
    const newLocations = possibleLocations?.filter((loc) =>
      state.selectedLocations?.includes(loc)
    )
    // Vue.set(state, prop.selectedLocations, newLocations)
    state[prop.selectedLocations] = newLocations;

  },
  [mut.setLocations](state: LiveEventSearchStoreState, payload: string[]) {
    // Vue.set(state, prop.selectedLocations, payload)
    state[prop.selectedLocations] = payload;

    // logger.info('set selected location', payload)
  },
  [mut.setAllLocations](state: LiveEventSearchStoreState, payload: string[]) {
    // Vue.set(state, prop.allLocations, payload)
    state[prop.allLocations] = payload;

    // logger.info('set selected location', payload)
  },
  [mut.resetSelections](state: LiveEventSearchStoreState, payload: string[]) {
    state.selectedSpecialties = []
    state.selectedLocations = []
    state.startDate = undefined
    state.endDate = undefined
    logger.info('reset locations', payload)
  },
  [mut.storeSearchFilters](
    state: LiveEventSearchStoreState,
    payload: LiveEventSearchFilter[]
  ) {
    // Vue.set(state, prop.searchFilters, payload)
    state[prop.searchFilters] = payload;
  },
  [mut.startGetSearchFilters](state: LiveEventSearchStoreState) {
    // Vue.set(state, prop.fetchingSearchFilters, true)
    state[prop.fetchingSearchFilters] = true;
  },
  [mut.endGetSearchFilters](state: LiveEventSearchStoreState) {
    // Vue.set(state, prop.fetchingSearchFilters, false)
    state[prop.fetchingSearchFilters] = false;
  },
  [mut.setGetSearchFiltersError](
    state: LiveEventSearchStoreState,
    payload: AxiosError
  ) {
    let errorData
    if (payload) {
      errorData = {
        message: payload?.message,
        response: { status: payload?.response?.status }
      }
    }

    // Vue.set(state, prop.searchFiltersNetworkError, errorData)
    state[prop.searchFiltersNetworkError] = errorData;

  },
  [mut.setSpecialtyKeys](state: LiveEventSearchStoreState, payload: string[]) {
    const specialties = state.searchFilters?.filter((filter) =>
      payload?.includes(filter.specialtyKey)
    )
    // Vue.set(state, prop.selectedSpecialties, specialties)
    state[prop.selectedSpecialties] = specialties;

  }
}

const unwrapDateString = (dateString?: string): Dayjs | undefined => {
  return dateString ? dayjs(dateString) : undefined
}
