<template>
  <v-container
      class="container-default flex flex-column"
      data-test="live-event-list"
  >
    <v-container>
      <h3 class="px-4 mb-3" data-test="search-results-header">
        {{ liveEvents.length }} {{ $uiService.events.eventSearchResults }}
      </h3>
      <v-container
          v-for="liveEvent in liveEvents"
          :key="liveEvent.registerLink"
          class="flex flex-column pt-0"
          data-test="live-event-preview-container"
      >
        <LiveEventSearchEventCardExtended :live-event="liveEvent" />
      </v-container>
    </v-container>
  </v-container>
</template>
<script lang="ts">
import * as liveEventStore from '@/store/liveEventSearch/constants/liveEventSearch.types'
import { liveEvents } from '@/store/liveEventSearch/constants/liveEventSearch.property-types'
import LiveEvent from '~/models/LiveEvent'

const { search } = liveEventStore.LiveEventSearchType

export default {
  computed: {
    liveEvents(): LiveEvent[] {
      return this.$store.state[liveEventStore.name][search][liveEvents]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@media #{map-get($display-breakpoints, 'sm-only')} {
  .container {
    max-width: 100%;
  }
}
@media #{map-get($display-breakpoints, 'md-only')} {
  .container {
    max-width: 100%;
  }
}
</style>
