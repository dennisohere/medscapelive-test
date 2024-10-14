import {type ComponentOptions, type VueElement} from 'vue'
import { Dayjs } from 'dayjs'
import * as liveEventStore from '@/store/liveEventSearch/constants/liveEventSearch.types'
import { sendWmdPageLink } from '~/core/global'
import LiveEventSearchFilter from '~/models/LiveEventSearchFilter'
import { EVENTS } from '~/core/constants/router-paths'
import { SEARCH_FILTER, WB_USER_SEG } from '~/core/constants/omniture-events'

const prop = liveEventStore.PROPERTIES

const omnitureMixinMethods: ComponentOptions<VueElement>['methods'] = {
  sendEventSearchAnalytics(element: EventTarget | null): void {
    const specialties: LiveEventSearchFilter[] = this.$store.state[
        liveEventStore.name
        ][prop.selectedSpecialties]
    const locations: string[] = this.$store.state[liveEventStore.name][
        prop.selectedLocations
        ]
    const startDate: Dayjs = this.$store.state[liveEventStore.name][
        prop.startDate
        ]
    const endDate: Dayjs = this.$store.state[liveEventStore.name][prop.endDate]

    const userSegS =
        specialties?.map((s) => s.specialtyKey?.slice(0, 3)).join(';') || '0'
    const userSegL =
        locations?.map((l: string) => l.slice(0, 3)).join(';') || '0'
    const userSegD = [startDate, endDate]
        .map((d) => d?.format('MMDDYY') || '0')
        .join(';')

    const userSegPrefix =
        this.$route.path === EVENTS ? 'cntr_rslts_' : 'cntr_brws_'
    const userSeg = `${userSegPrefix}s-${userSegS}:l-${userSegL}:d-${userSegD}`
    const userVars = {
      [WB_USER_SEG]: userSeg
    }
    sendWmdPageLink(SEARCH_FILTER, element, userVars)
  }
}

export type OmnitureMethods = {
  sendEventSearchAnalytics(element?: EventTarget | null): void
}

export const OmnitureMixin = {
  methods: omnitureMixinMethods
}
