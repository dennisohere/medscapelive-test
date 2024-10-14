<template>
  <v-container fluid class="ma-0 pa-0">
    <v-container fluid class="live-events-main pa-0 d-flex flex-column">
      <v-expansion-panels v-show="$vuetify.display.xs" flat>
        <v-expansion-panel
            :ref="SEARCH_PANEL"
            class="mobile-search-container no-border-radius"
        >
          <v-expansion-panel-title
              v-slot="{ open }"
              class="mobile-search-content"
          >
            <v-row no-gutters>
              <v-col cols="12" class="mobile-search-title font-weight-bold">{{
                  $uiService.events.eventSearchHeader
                }}</v-col>
              <v-col cols="12" class="text--secondary mobile-search-parameters">
                <v-fade-transition leave-absolute>
                  <v-row v-if="!open" no-gutters style="width: 100%">
                    <span>{{ selectedSpecialtiesDisplay }}</span>
                    <v-divider vertical class="mx-2"></v-divider>
                    <span>{{ selectedLocationsDisplay }}</span>
                    <v-divider vertical class="mx-2"></v-divider>
                    <span>{{ datesDisplay }}</span>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="mobile-search-content">
            <LiveEventSearch
                :key="searchViewKey"
                class="live-events-main__search fill-height"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <LiveEventSearchLiveEventList />
      <LiveEventSearchEventModal />
      <LiveEventSearchHybridDialog />
    </v-container>
  </v-container>
</template>
<script lang="ts" >
import { HOME, ABOUT } from '~/core/constants/router-paths'
import {
  eventAppBarOptions,
  defaultAppBarOptions
} from '~/models/view/AppBarOptions'
import * as liveEventStore from '~/store/liveEventSearch/constants/liveEventSearch.types'
import * as bus from '~/core/constants/message-bus.constants'
import { SEARCH_PANEL } from '~/core/constants/component-refs'
import { sendWmdPageview, loadPulsePointPixel } from '@/core/global'
import LiveEvent from '~/models/LiveEvent'

const { search } = liveEventStore.LiveEventSearchType
const liveEventSearch = liveEventStore.name
const get = liveEventStore.GETTERS
const act = liveEventStore.ACTIONS
const mut = liveEventStore.MUTATIONS
const prop = liveEventStore.PROPERTIES

export default {
  name: 'LiveEvents',
  data() {
    return {
      searchViewKey: 0,
      HOME,
      ABOUT,
      SEARCH_PANEL
    }
  },
  computed: {
    liveEvents(): LiveEvent[] {
      return this.$store.state[liveEventSearch][search][prop.liveEvents]
    },
    selectedLocationsDisplay(): string {
      return this.$store.getters[
        `${liveEventStore.name}/${get.selectedLocationsDisplay}`
      ]
    },
    selectedSpecialtiesDisplay(): string {
      return this.$store.getters[
        `${liveEventStore.name}/${get.selectedSpecialtiesDisplay}`
      ]
    },
    datesDisplay(): string {
      return this.$store.getters[`${liveEventStore.name}/${get.datesDisplay}`]
    }
  },
  async beforeMount() {
    await this.$store.dispatch(`${liveEventSearch}/${act.getSearchFilters}`)

    this.searchEventsWithQuery()
  },
  mounted() {
    sendWmdPageview()

    loadPulsePointPixel(this.$config?.PULSE_POINT_PIXEL_PID)
    this.$bus.$emit(bus.SHOW_HEADER_FOR_PAGE, true)
    this.$bus.$emit(bus.UPDATE_APP_BAR_OPTIONS, eventAppBarOptions)
    this.$bus.$on(bus.SEARCH_EVENT_SUCCESS, this.onSearchEventSuccess)
    window.addEventListener(bus.PAGE_SHOW, this.onPageShow)
  },
  beforeUnmount() {
    this.$bus.$emit(bus.UPDATE_APP_BAR_OPTIONS, defaultAppBarOptions)
    this.$off(bus.SEARCH_EVENT_SUCCESS, this.onSearchEventSuccess)
    window.removeEventListener(bus.PAGE_SHOW, this.onPageShow)
  },
  methods: {
    onPageShow(event: PageTransitionEvent) {
      if (event.persisted || event.detail.persisted ) {
        this.searchViewKey += 1
      }
    },
    onSearchEventSuccess() {
      const element = this.$refs[SEARCH_PANEL]
      // if (element instanceof VueA) {
        this.$bus.$emit(bus.CHANGE)
      // }
    },
    searchEventsWithQuery() {
      console.log('searchEventsWithQuery', 'initializing...')
      if (!this.liveEvents?.length) {
        console.log('searchEventsWithQuery', this.liveEvents.length)

        let specialty = this.$route.query?.specialty
        if (typeof specialty === 'string') {
          specialty = [specialty]
        }
        let location = this.$route.query?.location
        if (typeof location === 'string') {
          location = [location]
        }
        const startDate = this.$route.query?.startDate
        const endDate = this.$route.query?.endDate

        this.$store.commit(`${liveEventSearch}/${mut.setStartDate}`, startDate)
        this.$store.commit(`${liveEventSearch}/${mut.setEndDate}`, endDate)
        this.$store.commit(
          `${liveEventSearch}/${mut.setSpecialtyKeys}`,
          specialty
        )
        this.$store.commit(`${liveEventSearch}/${mut.setLocations}`, location)

        this.$store.dispatch(`${liveEventSearch}/${act.searchLiveEvents}`)
        console.log('searchEventsWithQuery', this.$route.query)

      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variables.scss';

.mobile-search-container {
  background-color: #d7dcdc !important;
}
</style>
