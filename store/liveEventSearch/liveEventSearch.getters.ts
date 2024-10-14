import { GetterTree } from 'vuex'
import dayjs from 'dayjs'
import flatten from 'lodash/flatten'
import { uiService } from '~/plugins/uiService'
import { YYYY_MM_DD } from '~/core/constants/date-formats'
import * as get from '~/store/liveEventSearch/constants/liveEventSearch.getter-types'
import LiveEventSearchStoreState from '~/store/liveEventSearch/liveEventSearch.state'
import { RootStoreState } from '~/store/root.state'
import * as ERROR from '~/core/constants/user-facing-strings/error-strings'

export const getters: GetterTree<LiveEventSearchStoreState, RootStoreState> = {
  [get.startDateDisplay](state: LiveEventSearchStoreState): string | undefined {
    return state.startDate?.toDate().toLocaleDateString()
  },
  [get.endDateDisplay](state: LiveEventSearchStoreState): string | undefined {
    return state.endDate?.toDate().toLocaleDateString()
  },
  [get.datesDisplay](state: LiveEventSearchStoreState, getters): string {
    let display = ''
    if (!state.startDate && !state.endDate) {
      return uiService.label.anyDates
    }
    if (state.startDate) {
      display = display.concat(`from: ${getters[get.startDateDisplay]} `)
    }
    if (state.endDate) {
      display = display.concat(`to: ${getters[get.endDateDisplay]}`)
    }
    return display
  },
  [get.startDateIso](state: LiveEventSearchStoreState): string | undefined {
    return state.startDate?.format(YYYY_MM_DD)
  },
  [get.endDateIso](state: LiveEventSearchStoreState): string | undefined {
    return state.endDate?.format(YYYY_MM_DD)
  },
  [get.shouldDisableSearch](
    _state: LiveEventSearchStoreState,
    getters
  ): boolean {
    return !!getters[get.dateError]
  },
  [get.dateError](state: LiveEventSearchStoreState): string | undefined {
    if (
      state.startDate &&
      state.endDate &&
      state.startDate!.isAfter(state.endDate!)
    ) {
      return ERROR.DATE_ORDER_ERROR_MESSAGE
    }
  },
  [get.minimumDate](): string {
    return dayjs().format(YYYY_MM_DD)
  },
  [get.getLiveEventsErrorMessage](
    state: LiveEventSearchStoreState
  ): string | undefined {
    const statusCode = state.search.getLiveEventsError?.response?.status
    if (!statusCode) return
    if (statusCode === 400) {
      return ERROR.INVALID_SEARCH_PARAMETERS_MESSAGE
    } else if (statusCode === 414) {
      return ERROR.TOO_MANY_SELECTIONS
    } else if (statusCode >= 500 && statusCode < 600) {
      return ERROR.SERVER_ERROR_MESSAGE
    }
  },
  [get.selectedSpecialtiesDisplay](state: LiveEventSearchStoreState): string {
    if (state.selectedSpecialties?.length === 1) {
      return state.selectedSpecialties[0].specialtyDisplay
    } else if (state.selectedSpecialties?.length > 1) {
      return `${uiService.label.specialty} (${state.selectedSpecialties?.length}) `
    } else {
      return uiService.label.allSpecialties
    }
  },
  [get.selectedLocationsDisplay](state: LiveEventSearchStoreState): string {
    if (state.selectedLocations?.length === 1 && state.selectedLocations[0]) {
      return state.selectedLocations[0]
    } else if (state.selectedLocations?.length > 1) {
      return `${uiService.label.location} (${state.selectedLocations?.length}) `
    } else {
      return uiService.label.allLocations
    }
  },
  [get.selectedSpecialtyLocations](state: LiveEventSearchStoreState): string[] {
    if (!(state.selectedSpecialties?.length > 0)) {
      return state.allLocations || []
    }
    return [
      ...new Set(
        flatten(state.selectedSpecialties.map((spec) => spec.locations || []))
      )
    ]
  },
  [get.searchFiltersNetworkErrorMessage](
    state: LiveEventSearchStoreState
  ): string | undefined {
    const statusCode = state.searchFiltersNetworkError?.response?.status
    if (!statusCode) return
    if (statusCode === 404) {
      return ERROR.NO_SEARCH_FILTERS_MESSAGE
    } else if (statusCode >= 500 && statusCode < 600) {
      return ERROR.SERVER_ERROR_MESSAGE
    }
  }
}
