<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      data-test="registration-dialog"
      transition="dialog-bottom-transition"
      width="463px"
      persistent
      :fullscreen="$vuetify.display.xsOnly"
    >
      <v-card align="center">
        <v-container>
          <v-row align="center" class="flex-row" justify="center">
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
          <v-row
            align="center"
            no-gutters
            class="mb-2 flex-row"
            justify="center"
          >
            <v-col class="col-auto">
              <h2
                class="text-center text-sm-left"
                data-test="registration-confirmation__label"
              >
                {{
                  $uiService.registrationConfirmation.registrationConfirmLabel
                }}
              </h2>
            </v-col>
          </v-row>
          <v-row
            v-if="!event.isPromoEvent"
            align="center"
            no-gutters
            justify="center"
          >
            <v-col class="col-auto">
              <h4
                class="text-center"
                data-test="registration-confirmation__event-title"
              >
                {{ event.title }}
              </h4>
            </v-col>
          </v-row>
          <v-row
            v-if="!event.isPromoEvent"
            align="center"
            class="flex-column py-2"
            justify="center"
            no-gutters
          >
            <v-col
              class="col-auto"
              data-test="registration-confirmation__event-date"
            >
              {{ eventDate }}
            </v-col>
            <v-col
              v-if="event.startDate"
              class="col-auto"
              data-test="registration-confirmation__event-time"
            >
              {{ getLocalTimeZoneString(eventTime, event.startDate) }}
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col>
              <v-btn
                block
                class="btn-dark-blue registration-confirm__button"
                :disabled="!canJoinEvent"
                data-test="registration_confirm-button"
                @click="joinVirtualEvent"
              >
                {{ joinEventLabel }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row align="center" class="flex-row" justify="center">
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
          <v-row align="center" no-gutters justify="center">
            <v-col class="col-auto">
              <h4
                class="text-center text-sm-left"
                data-test="add-to-calendar__label"
              >
                {{ $uiService.registrationConfirmation.addToCalendarLabel }}
              </h4>
            </v-col>
          </v-row>
          <LazyAddToCalendar
            v-if="event.title"
            data-test="add-to-calendar__component"
            :event="event"
          />
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
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
export default {
  mixins: [EventDateFormatter],
  data() {
    return {
      REG_CONF_CLOSE,
      event: {} as LiveEvent,
      dialog: false
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
    const liveEventId = this.$route?.query?.liveEventId || ''
    this.dialog = !!liveEventId
    if (liveEventId && typeof liveEventId === 'string') {
      try {
        this.event = await this.$liveEventService.getEventMetadata(liveEventId)
      } catch {}
    }

    document.onreadystatechange = () => {
      if (document.readyState === APP_SCRIPT_COMPLETE) {
        const pageData = REG_EVENT_OVERLAY + '/' + liveEventId
        sendWmdPageview(0, pageData)
      }
    }
  },
  methods: {
    joinVirtualEvent() {
      this.logUserClick(REG_CONF_JOIN)
      const liveEventId = this.$route?.query?.liveEventId
      const checkInUrl = `${CHECK_IN_PATH}${liveEventId}`
      this.$router.push(checkInUrl)
    },
    async logUserClick(actionName: string) {
      const userVars: Record<string, string> = {}
      const module = REG_CONFIRMATION.concat(actionName)
      await sendWmdPageLink(module, null, userVars)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.registration-confirmation__image {
  height: 120px !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: rgb(118, 118, 116) !important;
  color: rgb(255, 255, 255) !important;
}
.registration-confirm__button {
  white-space: normal;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .registration-confirm__button {
    font-size: 0.7rem !important;
  }
}
</style>
