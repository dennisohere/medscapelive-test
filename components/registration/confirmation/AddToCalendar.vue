<template>
  <v-container style="margin: 0px; padding: 0px; width: 100%">
    <v-row no-gutters class="calendar-container" justify="center">
      <v-col>
        <a
          :href="googleCalendarLink"
          target="_blank"
          data-test="add-to-calendar__google-link"
          @click="logUserClick(CALENDAR_FUNC_ABBR_GOOGLE)"
        >
          <v-img
            data-test="add-to-calendar__google"
            :src="$uiService.image.addToCalendarGoogleImage.src"
            :alt="$uiService.image.addToCalendarGoogleImage.alt"
            :title="$uiService.image.addToCalendarGoogleImage.title"
            class="calendar__image"
          ></v-img>
        </a>
      </v-col>
      <v-col>
        <a
          :href="outlookCalendarLink"
          target="_blank"
          data-test="add-to-calendar__outlook-link"
          @click="logUserClick(CALENDAR_FUNC_ABBR_OUTLOOK)"
        >
          <v-img
            data-test="add-to-calendar__outlook"
            :src="$uiService.image.addToCalendarOutlookImage.src"
            :alt="$uiService.image.addToCalendarOutlookImage.alt"
            :title="$uiService.image.addToCalendarOutlookImage.title"
            class="calendar__image"
          ></v-img>
        </a>
      </v-col>
      <v-col>
        <a
          :href="yahooCalendarLink"
          target="_blank"
          data-test="add-to-calendar__yahoo-link"
          @click="logUserClick(CALENDAR_FUNC_ABBR_YAHOO)"
        >
          <v-img
            data-test="add-to-calendar__yahoo"
            :src="$uiService.image.addToCalendarYahooImage.src"
            :alt="$uiService.image.addToCalendarYahooImage.alt"
            :title="$uiService.image.addToCalendarYahooImage.title"
            class="calendar__image"
          ></v-img>
        </a>
      </v-col>
      <v-col>
        <a
          :href="icsCalendarLink"
          target="_blank"
          data-test="add-to-calendar__ics-link"
          @click="($event)=>{allowDownloadInIE($event, icsCalendarLink);
            logUserClick(CALENDAR_FUNC_ABBR_ICS)}"
        >
          <v-img
            data-test="add-to-calendar__ics"
            :src="$uiService.image.downloadEventIcsImage.src"
            :alt="$uiService.image.downloadEventIcsImage.alt"
            :title="$uiService.image.downloadEventIcsImage.title"
            class="calendar__image"
          ></v-img>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">

import {
  getGoogleCalendarEventLink,
  getYahooCalendarEventLink,
  getIcsCalendarEventLink,
  getOutlookCalendarEventLink
} from '~/core/utility/calendarEventLinks'
import { type ILiveEvent } from '~/models/LiveEvent'
import { sendWmdPageLink } from '~/core/global'
import {
  REG_CONFIRMATION,
  CALENDAR_FUNC_PREFIX,
  CALENDAR_FUNC_ABBR_GOOGLE,
  CALENDAR_FUNC_ABBR_YAHOO,
  CALENDAR_FUNC_ABBR_OUTLOOK,
  CALENDAR_FUNC_ABBR_ICS
} from '~/core/constants/omniture-events'

import { IE_CALENDAR_PARAMS } from '~/core/constants/calendar-events.constants'

export default {
  props: {
    event: {
      type: Object as () => ILiveEvent,
      required: true
    }
  },
  data() {
    const calendarOptions = {
      title: this.event.title!,
      start: this.event.startDate,
      end: this.event.endDate,
      location: this.event.location
    }
    return {
      CALENDAR_FUNC_ABBR_GOOGLE,
      CALENDAR_FUNC_ABBR_YAHOO,
      CALENDAR_FUNC_ABBR_OUTLOOK,
      CALENDAR_FUNC_ABBR_ICS,
      googleCalendarLink: getGoogleCalendarEventLink(calendarOptions),
      outlookCalendarLink: getOutlookCalendarEventLink(calendarOptions),
      yahooCalendarLink: getYahooCalendarEventLink(calendarOptions),
      icsCalendarLink: getIcsCalendarEventLink(calendarOptions)
    }
  },
  methods: {
    async logUserClick(calendarFuncAbbr: string) {
      const userVars: Record<string, string> = {}
      const module = REG_CONFIRMATION.concat(
        CALENDAR_FUNC_PREFIX.concat(calendarFuncAbbr)
      )
      await sendWmdPageLink(module, null, userVars)
    },

    isBroswerIE() {
      const ua = window.navigator.userAgent
      const msie = ua.indexOf(IE_CALENDAR_PARAMS.IE_10_UA_FRAGMENT)
      if (msie > 0) {
        return true
      }
      const trident = ua.indexOf(IE_CALENDAR_PARAMS.IE_11_UA_FRAGMENT)
      if (trident > 0) {
        return true
      }
      return false
    },
    allowDownloadInIE(event: Event, icsCalendarLink: string) {
      if (this.isBroswerIE()) {
        if (navigator.msSaveBlob) {
          const bytes = decodeURIComponent(
            icsCalendarLink.split('data:text/calendar;charset=utf8,')[1]
          )
          const array = []
          for (let i = 0; i < bytes.length; i++) array.push(bytes.charCodeAt(i))
          navigator.msSaveBlob(
            new Blob([new Uint8Array(array)], {
              type: IE_CALENDAR_PARAMS.CALENDAR_MIME
            }),
            IE_CALENDAR_PARAMS.ICS_DOWNLOAD_FILE_NAME
          )
          event.preventDefault()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar__image {
  height: 60px !important;
  width: 60px !important;
}
.calendar-container {
  width: 300px !important;
}
</style>
