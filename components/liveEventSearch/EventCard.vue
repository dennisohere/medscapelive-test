<template>
  <v-card
    class="event-carousel_card"
    data-test="live-event-card-main"
    @click="showEventPopup"
  >
    <div class="event-carousel_card-image-wrapper">
      <v-img
        class="card_image"
        :src="image"
        alt="Live Event Image"
        :aspect-ratio="16 / 9"
        cover
      ></v-img>
    </div>

    <div class="event-carousel_card-content-wrapper">
      <div class="card_specialty-wrapper">
        <p class="card_specialty" data-test="live-event-card-specialties">
          {{ liveEvent.specialty }}
        </p>

        <p v-if="isMNG" class="card_accreditation">
          {{ $uiService.events.mngEventIndustryInfo }}
        </p>
        <p v-else class="card_accreditation">
          {{ liveEvent.isAccredited ? $uiService.label.accredited : '' }}
        </p>
      </div>

      <div>
        <h3 class="card_title" data-test="live-event-card-title">
          {{ setCharacterLimit(liveEvent.title, 70) }}
        </h3>
      </div>

      <div class="card_date-wrapper">
        <img
          class="clock-icon"
          :src="$uiService.image.clockIcon.src"
          :alt="$uiService.image.clockIcon.alt"
        />
        <p
          :set="
            (dateTime = getEventDateTimeFormatted(
              liveEvent.startDate,
              liveEvent.endDate
            ))
          "
          data-test="live-event-card-date-time"
        >
          {{ dateTime.length > 0 ? dateTime[0] : '' }}
          <span v-if="dateTime.length > 1" class="card_duration"
            >| {{ dateTime[1] }}
          </span>
        </p>
      </div>

      <div v-if="liveEvent.location" class="card_location-wrapper">
        <img
          class="location-icon"
          :src="$uiService.image.locationIcon.src"
          :alt="$uiService.image.locationIcon.alt"
        />
        <p data-test="live-event-card-location">
          {{
            isMNG ? $uiService.events.eventLocationOnline : liveEvent.location
          }}
        </p>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import EventDateFormatter from '~/components/mixins/EventDateFormatterMixin'
import { EVENT_DIALOGUE } from '~/core/constants/message-bus.constants'
export default {
  name: 'LiveEventListPreviewMobile',
  mixins: [EventDateFormatter],
  props: {
    liveEvent: {
      type: Object,
      required: true
    }
  },

  computed: {
    isMNG() {
      return (
          this.liveEvent.eventSource ===
          this.$uiService.events.eventMngSourceValue
      )
    },
    image() {
      if (this.isMNG) {
        return this.$uiService.image.mngEventPreviewDefault.src
      }
      return this.liveEvent.imageUrl
          ? this.liveEvent.imageUrl
          : this.$uiService.image.liveEventPreviewDefault.src
    }
  },

  methods: {
    showEventPopup() {
      this.$bus.$emit(EVENT_DIALOGUE, this.liveEvent)
    },

    setCharacterLimit(title, limit) {
      if (typeof title === 'string' && title.length > limit) {
        title = title.slice(0, limit) + '...'
      }

      return title
    }
  }
}
</script>

<style lang="scss" scoped>
.event-carousel_card {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.1);
  border-radius: 3px !important;
  height: 100%;

  .event-carousel_card-image-wrapper {
    width: auto;
    height: auto;
    max-height: 208px;
    border-top-left-radius: 3px !important;
    border-top-right-radius: 3px !important;
    .card_image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .event-carousel_card-content-wrapper {
    padding: 16px;
    font-family: 'ProximaNova';
    font-style: normal;
    font-weight: 600;
    p {
      font-size: 15px !important;
      line-height: 18px !important;
    }

    .card_specialty-wrapper {
      display: flex;
      justify-content: space-between;

      .card_specialty {
        color: #51585d;
      }

      .card_accreditation {
        color: #a2b0ba;
      }
    }

    .card_title {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #020202;
    }

    .card_date-wrapper,
    .card_location-wrapper {
      display: flex;
      align-items: center;
      padding: 5px 0;

      img {
        width: 16px;
        height: 16px;
        margin-right: 15px;
      }

      p {
        margin: 0;
        color: #51585d;
        text-wrap: pretty;
      }

      span.card_duration {
        font-size: 15px;
      }
    }

    .card_date-wrapper {
      margin-top: 10px;
    }
  }
}
</style>
