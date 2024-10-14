<script lang="ts">
import {
  HERO_HEADER_CONTENT_SLOT,
  HERO_HEADER_RIGHT_ITEM_SLOT
} from '~/core/constants/slot-names'
import { UPDATE_HEADER_CTA } from '~/core/constants/message-bus.constants'
import * as liveEventStore from '~/store/liveEventSearch/constants/liveEventSearch.types'
import { searchUpcomingLiveEvents } from '~/store/liveEventSearch/constants/liveEventSearch.action-types'
import { ABOUT } from '@/core/constants/router-paths'
import { HOME_SEARCH_HEADER } from '~/core/constants/component-refs'
import StickyHeroHeaderMixin from '~/components/mixins/StickyHeroHeaderMixin'
import { UpdateHeaderCtaOptions } from '~/models/view/UpdateHeaderCtaOptions'
import { sendWmdPageview, loadPulsePointPixel } from '~/core/global/'
import { GLOBAL_P2P_REGISTRATION_ERROR } from '~/core/constants/authorization.constants'
import LiveEvent from '~/models/LiveEvent'

export default {
  name: 'Home',
  mixins: [StickyHeroHeaderMixin(HOME_SEARCH_HEADER)],
  async middleware() {
    await this.$store.dispatch(
        `${liveEventStore.name}/${searchUpcomingLiveEvents}`
    )
  },
  data() {
    return {
      HERO_HEADER_CONTENT_SLOT,
      HERO_HEADER_RIGHT_ITEM_SLOT,
      HOME_SEARCH_HEADER,
      ABOUT,
      displayRegistrationOverlay: false,
      displayRegistrationFailure: false,
      displayP2PRegistrationFailureOverlay: false
    }
  },
  computed: {
    upcomingLiveEvents(): LiveEvent[] {
      let liveEventResults = this.$store.state.liveEventSearch.upcoming
          .liveEvents
      if (liveEventResults && liveEventResults?.length > 3) {
        liveEventResults = liveEventResults.slice(0, 3)
      }
      return liveEventResults
    }
  },
  mounted() {
    sendWmdPageview()
    loadPulsePointPixel(this.$config?.PULSE_POINT_PIXEL_PID)
    this.getUpcommingEventData()
    this.$bus.$emit(
        UPDATE_HEADER_CTA,
        new UpdateHeaderCtaOptions(this.$uiService.label.aboutMedscapeLive, ABOUT)
    )
    const liveEventId = this.$route?.query?.liveEventId || ''
    const registrationError = this.$route?.query?.errorCode || ''
    this.displayRegistrationOverlay = !!liveEventId
    if (registrationError) {
      this.displayRegistrationOverlay = false
      if (registrationError === GLOBAL_P2P_REGISTRATION_ERROR) {
        this.displayP2PRegistrationFailureOverlay = true
      } else {
        this.displayRegistrationFailure = true
      }
    }
  },
  methods: {
    getUpcommingEventData() {
      const upcomingEvents = this.$store.state.liveEventSearch.upcoming
          .liveEvents
      if (upcomingEvents && upcomingEvents.length === 0) {
        this.$store.dispatch(
            `${liveEventStore.name}/${searchUpcomingLiveEvents}`
        )
      }
    }
  }
}
</script>

<template>
  <v-container fluid class="ma-0 pa-0">
    <HeroHeader
        :ref="HOME_SEARCH_HEADER"
        :hero-image="$uiService.image.homeHeroImage"
    >
      <template v-slot:[HERO_HEADER_CONTENT_SLOT]>
        <v-btn
            class="link-white pr-4 pl-4 letter-spacing-normal"
            :to="ABOUT"
            data-test="home-search__header-about"
        >{{ $uiService.home.aboutText }}</v-btn>
      </template>
      <template v-slot:[HERO_HEADER_CONTENT_SLOT]>
        <v-row
            justify="center"
            align="center"
            class="text-center
            px-3 mb-3 mt-3
            mb-md-1
            mb-lg-0"
        >
          <h1 class="white-text">
            {{ $uiService.home.heroHeader }}
          </h1>
        </v-row>
      </template>
    </HeroHeader>

    <LiveEventSearch class="home-search-style" />

    <v-container fluid class=" px-0" data-test="upcoming-events__container">
      <LiveEventSearchEventList
          class="upcoming-events__live-event-carousel"
          data-test="upcoming-events__live-event-carousel"
          :live-events="upcomingLiveEvents"
      />
    </v-container>

    <MarketingSectionMarketing />

    <RegistrationConfirmation v-if="displayRegistrationOverlay" />
    <P2PRegistrationFailure v-if="displayP2PRegistrationFailureOverlay" />
    <ErrorAlert
        :display-status="displayRegistrationFailure"
        :display-gradient="true"
    />

    <LiveEventSearchEventModal />
    <LiveEventSearchHybridDialog />
  </v-container>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.scss';
.section.upcoming-events__live-event-carousel {
  width: auto;
}

.home-search__container {
  max-height: 550px;
}
.home-marketing__container {
  background-color: #e7ebed;
  padding: 30px 0;
}

.home-marketing__card-list {
  margin: 30px 0;
}

.home-marketing__button {
  letter-spacing: normal !important;
  border-radius: 50px;
  background-color: #007cb0;
  color: #fff;
  padding: 12px 30px !important;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .section-header-style {
    max-width: 70%;
  }
  .home-search-style {
    margin-bottom: 41px;
  }
}
@media #{map-get($display-breakpoints, 'sm-only')} {
  .home-search-style {
    margin-bottom: 61px;
  }
}
@media #{map-get($display-breakpoints, 'md-only')} {
  .home-search-style {
    margin-bottom: 77px;
    width: 90%;
  }
}
@media #{map-get($display-breakpoints, 'lg-and-up')} {
  .home-search-style {
    margin-bottom: 113px;
    width: 80%;
  }
}
</style>
