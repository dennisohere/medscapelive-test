<template>
  <div class="card-extended" @click="showEventPopup">
    <div class="card-extended_image-wrapper">
      <v-img cover :src="image" :aspect-ratio="16 / 9"></v-img>
    </div>

    <div class="card-extended_content-wrapper" data-test="live-event-card-main">
      <div class="card-content_specialty-split">
        <p data-test="live-event-card-specialties">{{ liveEvent.specialty }}</p>

        <p v-if="isMNG">
          {{ $uiService.events.mngEventIndustryInfo }}
        </p>
        <p v-else>
          {{ liveEvent.isAccredited ? $uiService.label.accredited : '' }}
        </p>
      </div>

      <div class="card-content_title">
        <h3 data-test="live-event-card-title">
          {{ liveEvent.title }}
        </h3>
      </div>

      <div v-if="liveEvent.description" class="card-content_description">
        <p data-test="live-event-card-description">
          {{ liveEvent.description }}
        </p>
      </div>

      <div class="card-content_date-split">
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
        </p>
      </div>

      <div v-if="liveEvent.location" class="card-content_location-split">
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

      <div
        v-if="!!liveEvent.speakers && liveEvent.speakers.length > 0"
        class="card-content_faculty"
      >
        <p><b>Faculty:</b>&nbsp;{{ getSpeakers(liveEvent.speakers) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EventDateFormatter from '@/components/mixins/EventDateFormatterMixin'
import { EVENT_DIALOGUE } from '~/core/constants/message-bus.constants'
export default {
  name: 'EventCardExtended',
  mixins: [EventDateFormatter],
  props: {
    liveEvent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.card-extended {
  display: flex;
  background-color: #fff;
  border: 1px solid #f4f4f4;
  border-radius: 3px;
  box-shadow: 0px 0px 60px -30px rgb(214, 214, 214);
  cursor: pointer;

  p {
    font-size: 16px !important;
    margin: 0 !important;
  }

  .card-extended_image-wrapper {
    width: 35%;
    padding: 30px;
    display: flex;
    align-items: center;
  }

  .card-extended_content-wrapper {
    width: 65%;
    padding: 30px;

    .card-content_specialty-split {
      display: flex;
      justify-content: space-between;

      p:nth-child(1) {
        font-weight: bold;
        color: #51585d;
      }

      p:nth-child(2) {
        font-weight: bold;
        color: #a2b0ba;
      }
    }

    .card-content_title {
      margin-bottom: 15px;

      h3 {
        font-size: 18px;
        line-height: 24px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    .card-content_description {
      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .card-content_date-split,
    .card-content_location-split {
      display: flex;
      align-items: center;

      img {
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }

    .card-content_date-split {
      margin-top: 15px;
    }

    .card-content_faculty {
      margin-top: 15px;
    }
  }
}

@media screen and (max-width: 768px) {
  .card-extended {
    .card-extended_image-wrapper {
      display: none !important;
    }

    .card-extended_content-wrapper {
      width: 100%;
      padding: 30px;
      .card-content_title {
        h3 {
          -webkit-line-clamp: 2;
        }
      }

      .card-content_description {
        p {
          -webkit-line-clamp: 4;
        }
      }
    }
  }
}
</style>
