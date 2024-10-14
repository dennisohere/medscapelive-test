<template>
  <div class="section">
    <div class="container-default">
      <div class="event-list">
        <div class="event-list-header">
          <h2>Upcoming Events</h2>

          <v-btn
              text
              data-test="live-event-carousel__all-events-btn"
              @click="showAllEvents"
          >View All</v-btn
          >
        </div>

        <div class="event-list-wrapper">
          <div
              v-for="liveEvent in liveEvents"
              :key="liveEvent.registerLink"
              class="event-card-wrapper"
          >
            <LiveEventSearchEventCard :live-event="liveEvent" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EVENTS } from '~/core/constants/router-paths'
import 'swiper/css'
import * as liveEventSearch from '@/store/liveEventSearch/constants/liveEventSearch.types'

const mut = liveEventSearch.MUTATIONS
const act = liveEventSearch.ACTIONS

export default {
  props: {
    liveEvents: {
      type: Array,
      required: true
    }
  },
  computed: {
    showEvents(): boolean {
      return this.liveEvents.length > 0
    }
  },
  methods: {
    async showAllEvents(event?: MouseEvent) {
      this.$store.commit(`${liveEventSearch.name}/${mut.resetSelections}`)
      await this.$store.dispatch(
          `${liveEventSearch.name}/${act.searchLiveEvents}`
      )

      this.sendEventSearchAnalytics(event?.target)
      this.$router.push(EVENTS)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.event-list {
  .event-list-header {
    display: flex;
    justify-content: space-between;
    align-items: end;

    h2 {
      font-size: 26px !important;
    }

    button {
      color: #005b81;
      text-decoration: none;
      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
      text-transform: capitalize;
      padding: 0 !important;
      height: auto !important;

      &:hover {
        background-color: transparent !important;
      }
    }
  }

  .event-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin: 15px -15px 0;

    .event-card-wrapper {
      width: 33.3%;
      margin: 15px 0;
      padding: 0 15px;
    }
  }
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .event-list-wrapper {
    .event-card-wrapper {
      width: 100% !important;
    }
  }
}

@media #{map-get($display-breakpoints, 'sm-only')} {
  .event-list-wrapper {
    .event-card-wrapper {
      width: 50% !important;
    }
  }
}
</style>
