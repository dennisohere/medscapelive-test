<template>
  <v-container
      class="default-container"
      fluid
      data-test="live-event-search-component"
  >
    <v-row
        no-gutters
        align="center"
        align-content="center"
        justify="center"
        class="flex-sm-row flex-column"
    >
      <v-autocomplete
          :ref="SPECIALTY_SELECT_REF"
          v-model="selectedSpecialties"
          class="live-event-search__specialty-select
          filter-field-style
          relative-width"
          data-test="live-event-search__specialty-option"
          variant="outlined"
          dense
          clearable
          multiple
          append-icon=""
          color="#4b4b4b"
          hide-details="auto"
          return-object
          item-title="specialtyDisplay"
          :placeholder="$uiService.label.specialty"
          :items="$store.state.liveEventSearch.searchFilters"
          :loading="$store.state.liveEventSearch.fetchingSearchFilters"
          :menu-props="dropdownProps"
          @contextmenu.prevent
          @click.capture="scrollToRef(SPECIALTY_SELECT_REF)"
      >
        <template slot="selection" slot-scope="{ index }">
          <span v-if="index === 0">{{ selectedSpecialtiesDisplay }}</span>
        </template>
      </v-autocomplete>
      <v-autocomplete
          :ref="LOCATION_SELECT_REF"
          v-model="selectedLocations"
          class="live-event-search__location-select
          filter-field-style
          relative-width"
          data-test="live-event-search__location-option"
          variant="outlined"
          dense
          multiple
          clearable
          append-icon=""
          color="#4b4b4b"
          hide-details="auto"
          :placeholder="$uiService.label.allLocations"
          :items="$store.getters['liveEventSearch/selectedSpecialtyLocations']"
          :loading="$store.state.liveEventSearch.fetchingSearchFilters"
          :menu-props="dropdownProps"
          @contextmenu.prevent
          @click.capture="scrollToRef(SPECIALTY_SELECT_REF)"
      >
        <template slot="selection" slot-scope="{ index }">
          <span
              v-if="index === 0"
              class="live-event-search__location-select__selected-location"
          >{{ selectedLocationsDisplay }}</span
          >
        </template>
      </v-autocomplete>
      <v-row
          class="live-event-search__date-field
            filter-field-style
            relative-width
            flex-row"
          no-gutters
      >
        <v-col>
          <v-menu
              v-model="showStartDatePicker"
              data-test="live-event-search__date-select-menu"
              transition="scale-transition"
              bottom
              offset-y
              min-width="240px"
              class="relative-width"
              content-class="relative-width"
          >
            <template v-slot:activator="{ props }">
              <v-text-field
                  v-model="startDateText"
                  class="live-event-search__date-text-field
                  col
                  pa-0 ma-0"
                  :placeholder="startDatePlaceholder"
                  :error-messages="dateError"
                  :style="startDateTextFieldStyle"
                  hide-details="auto"
                  readonly
                  solo
                  flat
                  dense
                  clearable
                  data-test="live-event-search__start-date-select"
                  v-bind="props"
              ></v-text-field>
            </template>
            <v-date-picker
                :ref="DATE_SELECT_REF"
                v-model="startDate"
                data-test="live-event-search__date-picker"
                no-title
                full-width
                show-current="false"
                :min="$store.getters['liveEventSearch/minimumDate']"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col v-show="showDateRange">
          <v-menu
              v-model="showEndDatePicker"
              data-test="live-event-search__end-date-select-menu"
              transition="scale-transition"
              bottom
              offset-y
              left
              min-width="240px"
              class="relative-width"
              content-class="relative-width"
          >
            <template v-slot:activator="{ props }">
              <v-text-field
                  v-model="endDateText"
                  class="live-event-search__date-text-field
              col
              pa-0 ma-0"
                  :error="!!dateError"
                  :placeholder="endDatePlaceholder"
                  :style="endDateTextFieldStyle"
                  hide-details="auto"
                  readonly
                  solo
                  flat
                  dense
                  clearable
                  data-test="live-event-search__end-date-select"
                  v-bind="props"
              ></v-text-field>
            </template>
            <v-date-picker
                :ref="DATE_SELECT_REF"
                v-model="endDate"
                data-test="live-event-search__end-date-picker"
                no-title
                full-width
                show-current="false"
                :min="$store.getters['liveEventSearch/minimumDate']"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-btn
          depressed
          class="live-event-search__button mt-4 mt-sm-0 search-button-style"
          data-test="live-event-search__button"
          :loading="$store.state.liveEventSearch.search.gettingLiveEvents"
          :disabled="$store.getters['liveEventSearch/shouldDisableSearch']"
          color="#007CB0"
          @click="getLiveEvents"
      >
        {{ $uiService.label.search }}
      </v-btn>
    </v-row>
    <v-container
        v-if="$store.getters['liveEventSearch/getLiveEventsErrorMessage']"
        data-test="live-event-search__error-message"
    >
      {{ $store.getters['liveEventSearch/getLiveEventsErrorMessage'] }}
    </v-container>
    <v-container
        v-if="$store.getters['liveEventSearch/searchFiltersNetworkErrorMessage']"
        data-test="search-filter__error-message"
    >
      {{ $store.getters['liveEventSearch/searchFiltersNetworkErrorMessage'] }}
    </v-container>
  </v-container>
</template>



<script lang="ts" >
import LiveEventSearchFilter from '../../models/LiveEventSearchFilter'
import { VuetifyBreakpoints } from '@/core/constants/vuetify.constants'
import { EVENTS } from '@/core/constants/router-paths'
import * as liveEventStore from '@/store/liveEventSearch/constants/liveEventSearch.types'
import {
  SPECIALTY_SELECT_REF,
  LOCATION_SELECT_REF,
  DATE_SELECT_REF
} from '@/core/constants/component-refs'
import { SEARCH_EVENT_SUCCESS } from '~/core/constants/message-bus.constants'


const mut = liveEventStore.MUTATIONS
const act = liveEventStore.ACTIONS
const get = liveEventStore.GETTERS
const prop = liveEventStore.PROPERTIES

export default {
  data() {
    return {
      SPECIALTY_SELECT_REF,
      LOCATION_SELECT_REF,
      DATE_SELECT_REF,
      showStartDatePicker: false,
      showEndDatePicker: false,
      dropdownProps: {
        maxHeight: '224px'
      },
    }
  },
  computed: {
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
    dateError(): string {
      return this.$store.getters[`${liveEventStore.name}/${get.dateError}`]
    },
    selectedSpecialties: {
      get(): LiveEventSearchFilter[] {
        return this.$store.state[liveEventStore.name][prop.selectedSpecialties]
      },
      set(value: LiveEventSearchFilter[]) {
        this.$store.commit(
            `${liveEventStore.name}/${mut.setSpecialties}`,
            value
        )
      }
    },
    selectedLocations: {
      get(): string[] {
        return this.$store.state[liveEventStore.name][prop.selectedLocations]
      },
      set(value: string[]) {
        this.$store.commit(`${liveEventStore.name}/${mut.setLocations}`, value)
      }
    },
    startDate: {
      get(): string {
        return this.$store.getters[`${liveEventStore.name}/${get.startDateIso}`]
      },
      set(value: string) {
        this.$store.commit(`${liveEventStore.name}/${mut.setStartDate}`, value)
      }
    },
    endDate: {
      get(): string {
        return this.$store.getters[`${liveEventStore.name}/${get.endDateIso}`]
      },
      set(value: string) {
        this.$store.commit(`${liveEventStore.name}/${mut.setEndDate}`, value)
      }
    },
    startDateText: {
      get(): string {
        return this.$store.getters[
            `${liveEventStore.name}/${get.startDateDisplay}`
            ]
      },
      set(value: string) {
        this.$store.commit(`${liveEventStore.name}/${mut.setStartDate}`, value)
      }
    },
    endDateText: {
      get(): string {
        return this.$store.getters[
            `${liveEventStore.name}/${get.endDateDisplay}`
            ]
      },
      set(value: string) {
        this.$store.commit(`${liveEventStore.name}/${mut.setEndDate}`, value)
      }
    },
    startDateTextFieldStyle(): Object {
      return this.showStartDatePicker ? { 'font-weight': 'bolder' } : {}
    },
    endDateTextFieldStyle(): Object {
      return this.showEndDatePicker ? { 'font-weight': 'bolder' } : {}
    },
    showDateRange(): boolean {
      return (
          this.showStartDatePicker ||
          this.showEndDatePicker ||
          !!this.endDate ||
          !!this.startDate
      )
    },
    startDatePlaceholder(): string {
      return this.showDateRange
          ? this.$uiService.label.from
          : this.$uiService.label.anyDates
    },
    endDatePlaceholder(): string {
      return this.showDateRange ? this.$uiService.label.to : ''
    }
  },
  created() {
    this.$store.dispatch(`${liveEventStore.name}/${act.getSearchFilters}`)
  },
  mounted() {
    window.addEventListener('scroll', this.closeAutocomplete)
    console.log('search-filters', this.$store.state.liveEventSearch.searchFilters)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.closeAutocomplete)
  },
  methods: {
    scrollToRef(ref: string) {
      if (this.$vuetify.display.name !== VuetifyBreakpoints.XS) return
      this.$nextTick(() => {
        const element: any = this.$refs[ref]
        if (!element) return
        let top: number | undefined
        if (element instanceof HTMLElement) {
          top = element.offsetTop
        } else if (element.$el instanceof HTMLElement) {
          top = element.$el.offsetTop
        }
        if (!top) return
        window.scroll({ top, behavior: 'smooth' })
      })
    },
    async getLiveEvents(event?: MouseEvent): Promise<void> {
      await this.$store.dispatch(
          `${liveEventStore.name}/${act.searchLiveEvents}`
      )
      this.$emit(SEARCH_EVENT_SUCCESS)
      const path = EVENTS
      const query = {
        specialty: this.selectedSpecialties?.map((spec) => spec.specialtyKey),
        startDate: this.$store.getters[
            `${liveEventStore.name}/${get.startDateIso}`
            ],
        endDate: this.$store.getters[
            `${liveEventStore.name}/${get.endDateIso}`
            ],
        location: this.selectedLocations
      }
      // todo: fix here
      this.sendEventSearchAnalytics(event?.target)
      //
      this.$router.push(path)
      // this.$router.push({
      //   path,
      //   query
      // })
    },
    closeAutocomplete() {
      const refs = [SPECIALTY_SELECT_REF, LOCATION_SELECT_REF, DATE_SELECT_REF]
      for (const item of refs) {
        if (refs[item] && this.$ref(item).isFocused) {
          this.$ref(item).blur()
        }
      }

      this.showStartDatePicker = false
      this.showEndDatePicker = false
    }
  }
}
</script>


<style lang="scss">
@import '@/styles/variables.scss';
.v-container.default-container.home-search-style.v-container--fluid {
  width: 100% !important;
  max-width: 1170px;
  padding: 0 24px;
  margin-top: 30px;
  margin-bottom: 0 !important;
}

.live-event-search__button,
.live-event-search__date-text-field {
  //height: 40px !important;
}
.live-event-search__button {
  color: #fff !important;
  text-transform: none !important;
  border-radius: 40px;
}

.live-event-search__specialty-select input::placeholder,
.live-event-search__location-select input::placeholder,
.live-event-search__date-text-field .v-label,
.live-event-search__date-text-field .theme--light.v-input,
.live-event-search__date-text-field input::placeholder {
  color: #4b4b4b !important;
  opacity: 1;
}
.live-event-search__specialty-select,
.live-event-search__location-select,
.live-event-search__date-field {
  background-color: #fff;
  border-radius: 3px;
}
.live-event-search__date-field {
  border-style: solid;
  border-width: thin;
  border-color: #4b4b4b;
}
.live-event-search__location-select__selected-location {
  max-width: 250px;
  overflow-x: hidden;
  white-space: nowrap;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
  .filter-field-style {
    width: 80%;
    margin-bottom: 6px !important;
  }
  .relative-width {
    width: 85vw !important;
  }
  .search-button-style {
    width: 57.6%;
    letter-spacing: normal;
  }
}
@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .filter-field-style {
    width: 23%;
    margin-right: 8px !important;
  }
  .relative-width {
    width: 23% !important;
  }
}
@media #{map-get($display-breakpoints, 'sm-only')} {
  .live-event-search__location-select__selected-location {
    max-width: 105px;
  }
  .search-button-style {
    width: 16.5%;
    letter-spacing: normal;
  }
}
@media #{map-get($display-breakpoints, 'md-only')} {
  .search-button-style {
    width: 13.5%;
    letter-spacing: normal;
  }
}
@media #{map-get($display-breakpoints, 'lg-and-up')} {
  .search-button-style {
    width: 10.7%;
    letter-spacing: normal;
  }
}
</style>
