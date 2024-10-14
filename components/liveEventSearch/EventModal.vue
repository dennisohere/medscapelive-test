<template>
  <v-dialog v-model="dialog" width="100%" max-width="630px">
    <div class="event-modal" data-test="event-modal">
      <div class="event-modal_label-wrapper">
        <div v-if="isLive" class="event-modal_label is-live">
          {{ $uiService.label.liveNow }}
        </div>

        <div v-if="isMNG" class="event-modal_label is-accredited">
          Information from industry
        </div>
        <div v-else-if="isAccredited" class="event-modal_label is-accredited">
          {{ $uiService.label.accredited }}
        </div>
      </div>

      <v-btn icon class="event-modal_close" @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <div class="event-modal_title" data-test="event-modal-title">
        <h3>
          {{ liveEvent.title }}
        </h3>
      </div>

      <div v-if="hasDate" class="event-modal_date-split">
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
          data-test="event-modal-time"
        >
          {{ dateTime.length > 0 ? dateTime[0] : '' }}
          <span v-if="dateTime.length > 1"
            >&nbsp;|&nbsp;{{ dateTime[1] }}
          </span>
        </p>
      </div>

      <div v-if="liveEvent.location" class="event-modal_location-split">
        <img
          class="location-icon"
          :src="$uiService.image.locationIcon.src"
          :alt="$uiService.image.locationIcon.alt"
        />
        <p data-test="event-modal-location">
          {{ liveEvent.location }}
        </p>
      </div>

      <div
        v-if="liveEvent.specialty"
        class="event-modal_specialty-split"
        data-test="event-modal-specialty"
      >
        <img
          class="specialty-icon"
          :src="$uiService.image.specialtyIcon.src"
          :alt="$uiService.image.specialtyIcon.alt"
        />
        <p>
          {{ liveEvent.specialty }}
        </p>
      </div>

      <div v-if="hasOverview || hasFaculty" class="event-modal_hr-wrapper">
        <div></div>
      </div>

      <div
        v-if="hasOverview"
        class="event-modal_description"
        data-test="event-modal-description"
      >
        <h4>Event Overview</h4>
        <p>
          {{ liveEvent.description }}
        </p>
      </div>

      <div v-if="hasFaculty" class="event-modal_faculty">
        <h4>Faculty</h4>
        <p>
          {{ getSpeakers(liveEvent.speakers) }}
        </p>
      </div>

      <div class="event-modal_action-btn-wrapper">
        <div v-if="!isMNG" class="event-modal_btn">
          <a :href="liveEvent.registerLink" target="_blank">Learn More</a>
        </div>

        <div
          class="event-modal_btn is-reg"
          data-test="event-modal-register"
          @click="onRegisterClick"
        >
          Register
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import LiveEvent from '~/models/LiveEvent'
import EventDateFormatter from '@/components/mixins/EventDateFormatterMixin'
import { sendWmdPageLink } from '~/core/global'
import {
  EVENT_CARD_INFO,
  EXIT_PREFIX,
  WB_EXIT_URL
} from '~/core/constants/omniture-events'
import { EVENT_DIALOGUE } from '~/core/constants/message-bus.constants'

export default {
  name: 'EventModal',
  mixins: [EventDateFormatter],
  data() {
    return {
      liveEvent: {} as LiveEvent,
      dialog: false
    }
  },
  computed: {
    isMNG() {
      return this.liveEvent.eventSource === 'MNG'
    },
    isLive(): boolean {
      return this.liveEvent.startDate
        ? dayjs().isAfter(dayjs(this.liveEvent.startDate)) &&
            dayjs().isBefore(dayjs(this.liveEvent.endDate))
        : false
    },
    isAccredited(): boolean {
      return this.liveEvent.isAccredited !== false
    },
    hasDate(): boolean {
      return (
        this.liveEvent.date !== false &&
        this.liveEvent.date !== null &&
        this.liveEvent.date !== ''
      )
    },
    hasOverview(): boolean {
      return (
        this.liveEvent.description !== false &&
        this.liveEvent.description !== null &&
        this.liveEvent.description !== ''
      )
    },
    hasFaculty(): boolean {
      return (
        this.liveEvent.speakers !== undefined &&
        this.liveEvent.speakers !== null &&
        this.liveEvent.speakers.length > 0
      )
    }
  },
  mounted() {
    this.$on(EVENT_DIALOGUE, this.displayEventDialogue)
  },
  beforeUnmount() {
    this.$off(EVENT_DIALOGUE, this.displayEventDialogue)
  },
  methods: {
    displayEventDialogue(liveEvent: LiveEvent) {
      this.liveEvent = liveEvent
      this.dialog = true
    },
    async logUserClick(event: MouseEvent) {
      const userVars: Record<string, string> = {}
      if (typeof this.liveEvent.registerLink === 'string') {
        const url = new URL(this.liveEvent.provisionalRegisterLink as string)
        userVars[WB_EXIT_URL] =
          EXIT_PREFIX + url.host.replace('www.', '') + url.pathname
      }
      await sendWmdPageLink(EVENT_CARD_INFO, event.target, userVars)
    },
    onRegisterClick(event: MouseEvent) {
      this.logUserClick(event)
      const userAuthLevel = window?.PageMetadata?.authVar?.authLevel
      const eventPresence = this.liveEvent.eventPresence
      const provisionalRegisterLink = this.liveEvent.provisionalRegisterLink
      const registerLink = this.liveEvent.registerLink

      if (userAuthLevel && userAuthLevel === '2') {
        if (this.isMNG) {
          const regLink = provisionalRegisterLink as string
          const uacValue = window?.PageMetadata?.addProfile?.uac
          window.location.href = regLink + '?uac=' + uacValue
          return
        }

        // user logged in & event is NOT hybrid, register
        if (eventPresence && eventPresence !== 'Hybrid') {
          window.location.href = provisionalRegisterLink as string
          return
        }

        // user logged in & event is hybrid, show hybrid dialog
        if (eventPresence && eventPresence === 'Hybrid') {
          // if event is sso enabled
          if (registerLink !== provisionalRegisterLink) {
            this.dialog = false // hide event dialog
            this.$emit('showHybridDialog', this.liveEvent) // show hyrid dialog
            return
          }
        }
      }

      // user not logged in, return register link
      window.open(this.liveEvent.registerLink as string, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.event-modal {
  padding: 30px;
  background-color: #fff;
  border-radius: 6px;
  position: relative;

  h4 {
    font-size: 18px;
    font-weight: bold;
    line-height: 21.92px;
    margin-bottom: 10px;
  }

  p {
    margin: 0 !important;
    font-size: 15px;
    line-height: 17.9px;
  }

  .event-modal_label-wrapper {
    display: flex;
    margin: -5px -5px 10px;
    min-height: 40px;

    .event-modal_label {
      padding: 4px 10px;
      border-radius: 50px;
      font-size: 15px;
      text-transform: uppercase;
      margin: 5px;

      &.is-live {
        background-color: #f14937;
        color: #fff;
      }
      &.is-accredited {
        background-color: #e7ebed;
        color: #003e73;
      }
    }
  }

  .event-modal_close {
    position: absolute;
    top: 26px;
    right: 30px;
  }

  .event-modal_title {
    margin-bottom: 15px;

    h3 {
      font-size: 24px;
      line-height: 29.23px;
    }
  }

  .event-modal_description {
    p {
    }
  }

  .event-modal_date-split,
  .event-modal_location-split,
  .event-modal_specialty-split {
    display: flex;
    align-items: center;
    margin-top: 5px;

    img {
      width: 15px;
      height: 15px;
      margin-right: 10px;
    }

    span {
      font-size: 15px;
    }
  }

  .event-modal_hr-wrapper {
    margin: 30px 0;

    div {
      background: #e7ebed;
      height: 1px;
    }
  }

  .event-modal_faculty {
    margin-top: 30px;
  }

  .event-modal_action-btn-wrapper {
    margin: 30px -30px -30px;
    padding: 10px;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;

    a {
      text-decoration: none;
      color: #007cb0;
    }
    .event-modal_btn {
      border-radius: 50px;
      margin: 5px;
      padding: 10px 30px;
      cursor: pointer;

      &.is-reg {
        background-color: #0079b1;
        color: #fff;
        min-width: 200px;
        text-align: center;
      }
    }
  }
}

@media screen and (max-width: 375px) {
  .event-modal {
    .event-modal_label-wrapper {
      flex-direction: column;
      align-items: baseline;
    }
  }
}

@media screen and (max-width: 768px) {
  .event-modal {
    .event-modal_action-btn-wrapper {
      flex-direction: column;
    }
  }
}
</style>
