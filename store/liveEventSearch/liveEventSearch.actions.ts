import dayjs from 'dayjs'
import { ActionTree, Commit, Store } from 'vuex'
import { RootStoreState } from '../root.state'
import { INCLUDE_MNG_EVENTS } from '../../core/constants/app.constants'
import * as liveEventStoreConstants from './constants/liveEventSearch.types'
import { MM_DD_YYYY } from '~/core/constants/date-formats'
import LiveEventSearchStoreState from '~/store/liveEventSearch/liveEventSearch.state'
import { type LiveEventSearchParams } from '~/services/networking/params/LiveEventSearchParams'
import { logger } from '~/core/logger'

const mut = liveEventStoreConstants.MUTATIONS
const act = liveEventStoreConstants.ACTIONS
const { LiveEventSearchType } = liveEventStoreConstants

export const actions: ActionTree<LiveEventSearchStoreState, RootStoreState> = {
  async [act.searchLiveEvents]({ commit, state }): Promise<void> {
    const specialties = state.selectedSpecialties?.map(
      (spec) => spec.specialtyKey
    )
    const locations = state.selectedLocations
    let startDate = state.startDate?.format(MM_DD_YYYY)
    if (!startDate) {
      startDate = dayjs().format(MM_DD_YYYY)
    }
    await _searchLiveEvents.bind(this)(
      commit,
      {
        specialty: specialties,
        location: locations,
        startDate,
        endDate: state.endDate?.format(MM_DD_YYYY),
        includeMngEvents: INCLUDE_MNG_EVENTS
      },
      LiveEventSearchType.search
    )
  },
  async [act.searchUpcomingLiveEvents]({ commit }) {
    await _searchLiveEvents.bind(this)(
      commit,
      {
        startDate: dayjs().format(MM_DD_YYYY),
        includeMngEvents: INCLUDE_MNG_EVENTS
      },
      LiveEventSearchType.upcoming
    )
  },
  async [act.getSearchFilters]({ commit, state }): Promise<void> {
    const {$liveEventService} = useNuxtApp()
    if (state.searchFilters?.length) return
    commit(mut.startGetSearchFilters)
    try {
      logger.info('getting search filters')
      const currentDate = dayjs().format(MM_DD_YYYY)
      const filterResponse = await $liveEventService.getLiveEventSearchFilters(
        currentDate
      )
      logger.info(
        'Successfully got search filters',
        filterResponse.searchFilters.length
      )
      commit(mut.storeSearchFilters, filterResponse.searchFilters)
      commit(mut.setAllLocations, filterResponse.allLocations)
      commit(mut.setGetSearchFiltersError, undefined)
    } catch (error) {
      console.log('Error getting search filters', error)
      commit(mut.setGetSearchFiltersError, error)
    }
    commit(mut.endGetSearchFilters)
  }
}

async function _searchLiveEvents(
  this: Store<any>,
  commit: Commit,
  searchParams: LiveEventSearchParams,
  liveEventSearchType: liveEventStoreConstants.LiveEventSearchType
) {
  const {$liveEventService} = useNuxtApp()
  const basePayload = { type: liveEventSearchType }
  commit(mut.startGetLiveEvents, basePayload)
  try {
    logger.info(
      `Getting live events (type: ${liveEventSearchType}) with search params`,
      searchParams
    )

    let liveEventResults = await $liveEventService.searchLiveEvents(
      searchParams
    )

    if (
      liveEventSearchType ===
        liveEventStoreConstants.LiveEventSearchType.upcoming &&
      liveEventResults &&
      liveEventResults?.length > 5
    ) {
      liveEventResults = liveEventResults.slice(0, 5)
    }

    logger.info(
      `Setting live events (type: ${liveEventSearchType})`,
      liveEventResults?.length
    )
    commit(mut.storeLiveEvents, {
      ...basePayload,
      liveEvents: liveEventResults
    })
    commit(mut.setGetLiveEventsError, basePayload)
  } catch (error) {
    logger.error(
      `Error getting live events (type: ${liveEventSearchType})`,
      error
    )
    commit(mut.setGetLiveEventsError, { ...basePayload, error })
  }
  commit(mut.endGetLiveEvents, basePayload)
}
