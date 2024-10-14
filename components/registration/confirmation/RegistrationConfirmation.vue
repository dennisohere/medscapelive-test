<template>
  <v-dialog
      v-model="dialog"
      data-test="registration-dialog"
      transition="dialog-bottom-transition"
      width="100%"
      max-width="630px"
      :fullscreen="$vuetify.display.xs"
      :attach="true"
  >
    <div class="reg-conf-dialog-wrapper">
      <div v-show="showModalContent" class="reg-dialog">
        <v-btn
            icon
            data-test="registration-dialog__close"
            class="reg-dialog_close"
            @click="()=>{dialog = false;
            logUserClick(REG_CONF_CLOSE);}"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <div class="reg-dialog_content-block-top">
          <div
              class="reg-dialog_heading"
              data-test="registration-confirmation__label"
          >
            {{ $uiService.registrationConfirmation.registrationConfirmLabel }}
          </div>
        </div>
        <v-img
            data-test="registration-confirmation__image"
            :src="$uiService.image.brandlessEnvelopeImage.src"
            :alt="$uiService.image.brandlessEnvelopeImage.alt"
            :title="$uiService.image.brandlessEnvelopeImage.title"
            class="registration-confirmation__image mx-auto"
        ></v-img>

        <div class="reg-dialog_content-block detail-card">
          <div
              class="reg-dialog_event-name text-center"
              data-test="registration-confirmation__event-title"
          >
            {{ event.title }}
          </div>
          <div
              class="reg-dialog_event-date"
              data-test="registration-confirmation__event-date"
          >
            {{ eventDate }}
          </div>
          <div
              v-if="event.startDate"
              class="reg-dialog_event-time"
              data-test="registration-confirmation__event-time"
          >
            {{ getLocalTimeZoneString(eventTime, event.startDate) }}
          </div>

          <div class="hyperlink-class" @click="goToEventDetails">
            {{ $uiService.registrationConfirmation.eventDetailsLabel }}
          </div>
        </div>

        <div class="reg-dialog_content-block">
          <div v-show="canJoinEvent" class="join-permitted-now">
            <v-btn
                block
                class="registration-confirm__button"
                data-test="registration_confirm-button"
                @click="() => joinVirtualEvent()"
            >
              {{ joinEventLabel }}
            </v-btn>
          </div>
          <div v-show="!canJoinEvent" class="join-not-permitted-now">
            <div
                class="reg-dialog_subheading"
                data-test="registration_confirm-prejoin-text"
            >
              {{ $uiService.registrationConfirmation.preJoinEventLabel }}
            </div>
            <div class="reg-dialog_user-email reg-dialog_subheading">
              {{ email }}
            </div>
            <hr class="seperator" />
          </div>
        </div>

        <div v-show="!canJoinEvent" class="reg-dialog_content-block">
          <div class="reg-dialog_subheading" data-test="add-to-calendar__label">
            {{ $uiService.registrationConfirmation.addToCalendarLabel }}
          </div>
          <div class="row">
                        <RegistrationConfirmationAddToCalendar
                          v-if="event.title"
                          data-test="add-to-calendar__component"
                          :event="event"
                        />
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { CHECK_IN_PATH } from '@/core/constants/router-paths'
import LiveEvent from '~/models/LiveEvent'
import EventDateFormatter from '@/components/mixins/EventDateFormatterMixin'
import { sendWmdPageview, sendWmdPageLink } from '~/core/global'
import {
  REG_CONFIRMATION,
  REG_CONF_JOIN,
  REG_CONF_CLOSE,
  REG_EVENT_OVERLAY
} from '~/core/constants/omniture-events'
import { APP_SCRIPT_COMPLETE } from '~/core/constants/app.constants'
import AddToCalendar from "~/components/registration/confirmation/AddToCalendar.vue";

export default {
  components: {AddToCalendar},
  mixins: [EventDateFormatter],
  data() {
    return {
      REG_CONF_CLOSE,
      event: {} as LiveEvent,
      dialog: false,
      email: '',
      showModalContent: false
    }
  },
  computed: {
    canJoinEvent(): boolean {
      return this.event.startDate
        ? dayjs().isAfter(dayjs(this.event.startDate).subtract(15, 'minute'))
        : false
    },
    joinEventLabel(): string {
      return this.canJoinEvent
        ? this.$uiService.registrationConfirmation.joinEventLabel
        : this.$uiService.registrationConfirmation.preJoinEventLabel
    },
    eventDate(): string {
      return this.event.startDate
        ? dayjs(this.event.startDate).format('MMMM D, YYYY')
        : ''
    },
    eventTime(): string {
      return this.event.startDate
        ? dayjs(this.event.startDate).format('h:mm A')
        : ''
    }
  },
  async mounted() {
    const eventId = this.$route?.query?.liveEventId || ''
    this.dialog = !!eventId

    if (eventId && typeof eventId === 'string') {
      try {
        this.event = await this.$liveEventService.getEventMetadata(eventId)
        console.log(await this.$liveEventService.getEventMetadata(eventId))
      } catch {}
    }

    const queryParam = this.$route.query
    const userAuthLevel = window?.PageMetadata?.authVar?.authLevel
    if (userAuthLevel && userAuthLevel === '2') {
      this.email = window?.PageMetadata?.addProfile?.email || ''
    } else if (queryParam.email && queryParam.email !== '') {
      this.email = queryParam.email || ''
    }

    document.onreadystatechange = () => {
      if (document.readyState === APP_SCRIPT_COMPLETE) {
        const pageData = REG_EVENT_OVERLAY + '/' + eventId
        sendWmdPageview(0, pageData)
      }
    }
    this.$nextTick(() => {
      this.showModalContent = true
    })
  },
  methods: {
    async joinVirtualEvent() {
      console.log('joinVirtualEvent', 'starting')

      await this.logUserClick(REG_CONF_JOIN)

      const liveEventId = this.$route?.query?.liveEventId

      const checkInUrl = `${CHECK_IN_PATH}${liveEventId}`

      await this.$router.push(checkInUrl)
    },
    async logUserClick(actionName: string) {
      const userVars: Record<string, string> = {}
      const module = REG_CONFIRMATION.concat(actionName)
      await sendWmdPageLink(module, null, userVars)
    },
    goToEventDetails() {
      window.open(this.event.registerLink, '_blank')
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
@import '@/styles/variables.scss';
.reg-conf-dialog-wrapper {
  background-color: #fff;
  border-radius: 6px;

  .reg-dialog {
    padding: 30px;
    color: #020202;
    position: relative;
    text-align: center;
    font-size: 16px;

    .reg-dialog_close {
      font-size: 24px;
      position: absolute;
      top: 5px;
      right: 5px;
    }
    .seperator {
      width: 360px;
      margin: 22px auto;
      border-top: 1px solid #a2b0ba;
    }
    .registration-confirmation__image {
      width: 150px;
    }
    .registration-confirm__button {
      display: flex;
      padding: 12px 30px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 40px;
      color: $color-white;
      background: $color-blue-bright !important;
    }
    .join-permitted-now {
      margin-top: 22px !important;
      width: 200px;
    }

    .reg-dialog_content-block-top,
    .reg-dialog_content-block {
      text-align: -moz-center;
      text-align: -webkit-center;
      .hyperlink-class {
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        color: #0087de !important;
        text-transform: none;
      }
      .hyperlink-class:hover {
        color: #32c5ff;
      }
      .reg-dialog_heading {
        font-size: 24px;
        line-height: 29px;
        font-weight: 700;
        margin-bottom: 22px;
      }

      .reg-dialog_event-name {
        font-size: 18px;
        line-height: 22px;
        font-weight: 600;
      }

      .reg-dialog_event-date {
      }

      .reg-dialog_event-time {
      }

      a {
        color: #007cb0;
        text-decoration: none;
      }

      .reg-dialog_subheading {
        font-weight: 600;
        color: $color-gray-medium-dark;
      }

      .reg-dialog_user-email {
        font-weight: 700;
      }
    }

    .reg-dialog_content-block {
      div {
        margin: 5px 0;
      }
    }

    .detail-card {
      margin-top: 22px;
      background: #f2f4f5;
      border-radius: 3px;
      padding: 20px 10px;
    }

    .join-not-permitted-now {
      margin-top: 22px !important;
      margin-bottom: 22px !important;
    }
  }

  .reg-conf-download-app {
    background-color: #ecf1f9;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    gap: 15px;
    padding: 15px;
    text-align: left;

    p {
      margin: 0;
      font-size: 16px;
      line-height: 19.49px;
      font-weight: 600px;

      a {
        color: #064aa7;
        font-weight: 700;
        text-decoration: none;
      }
    }
  }
}
</style>
