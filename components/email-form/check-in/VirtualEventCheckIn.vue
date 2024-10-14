<template>
  <v-container class="email-form pa-0 ma-0" fluid>
    <v-progress-circular
      v-if="pageLoading"
      class="page-loading-spinner"
      indeterminate
    ></v-progress-circular>
    <div v-show="!pageLoading">
      <div
        class="check-in-top-section-container"
        justify="center"
        :class="{
          'check-in-top-section-container-promo': isPromoEvent,
          'check-in-top-section-event-end': eventEnded
        }"
      >
        <div v-if="!isPromoEvent">
          <v-row justify="center">
            <v-col class="check-in-event-info-container col-auto col-sm-6">
              <h3>{{ welcomeText }}</h3>
              <h2>{{ eventTitle }}</h2>
              <h5>{{ eventLocation }}</h5>
              <h4>{{ eventDateTime }}</h4>
            </v-col>
          </v-row>
          <v-divider class="check-in-divider"></v-divider>
        </div>
      </div>
      <v-row justify="center" class="flex-column flex-sm-row">
        <v-col class="col-auto col-sm-12">
          <div
            v-if="eventEnded"
            class="check-in-box-container event-end"
            justify="center"
          >
            <div class="check-in-event-block-container">
              <span class="email-prompt-label"
                ><pre class="email-prompt-label">{{
                  emailFormPrompt
                }}</pre></span
              >
            </div>
          </div>
          <div
            v-if="!eventEnded"
            class="check-in-box-container"
            justify="center"
          >
            <v-form
              v-if="!hideJoinSection"
              v-model="isFormValid"
              class="email-form__validator"
              @submit.prevent.native
              @keyup.native.enter="isFormValid && sendEmailForm($event)"
            >
              <span class="email-prompt-label"
                ><pre class="email-prompt-label">{{
                  emailFormPrompt
                }}</pre></span
              >
              <v-row>
                <v-col class="pb-0">
                  <v-text-field
                    v-model="email"
                    class="email-form__email-field"
                    clearable
                    :label="$uiService.emailForm.textFieldLabel"
                    :rules="[validateEmail]"
                    :placeholder="$uiService.label.email"
                    data-test="email-form__email-field"
                    dense
                    outlined
                    height="45"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="check-in-button-container">
                  <v-btn
                    class="event-check-in-button"
                    data-test="email-form__check-in-button"
                    :disabled="!isFormValid"
                    :loading="isLoading"
                    @click="sendEmailForm"
                  >
                    {{ $uiService.emailForm.checkInButtonText }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row
                :style="{ visibility: isFailure ? 'visible' : 'hidden' }"
                align="center"
                class="mb-0 check-in-submit-val-container"
                no-gutters
              >
                <v-col cols="12">
                  <span class="check-in-err-msg">
                    {{ errorMessage }}
                  </span>
                </v-col>
              </v-row>
            </v-form>

            <div v-if="hideJoinSection">
              <span class="email-prompt-label">{{ registerPrompt }}</span>
              <v-row>
                <v-col class="register-box-label-container">
                  <span class="register-box-label">{{ email }}</span>
                </v-col>
              </v-row>
              <v-row v-if="!isP2PFailure">
                <v-col cols="12" class="check-in-button-container">
                  <v-btn
                    class="event-check-in-button"
                    :disabled="!isFormValid"
                    :loading="isLoading"
                    :href="registerLink"
                    @click="logUserAction($event, $uiService.label.register)"
                  >
                    {{ $uiService.label.register }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row
                align="center"
                class="mb-0 register-submit-val-container"
                no-gutters
              >
                <v-col cols="12">
                  <span
                    class="register-box-label registration-link-button"
                    @click="joinWithDifferentEmail"
                  >
                    {{ registerWithDifferentEmailPrompt }}
                  </span>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="flex-column flex-sm-row">
        <div class="check-in-bottom-section-container" justify="center">
          <a
            class="check-in-medscapelive-link"
            :href="$uiService.emailForm.supportLink"
          >
            <v-img
              class="check-in-need-help-link-icon"
              :src="helpLinkIcon"
              title="MedscapeLive"
              alt="MedscapeLive"
              max-width="12"
            ></v-img>
            Need help?
          </a>
        </div>
      </v-row>

      <v-row justify="center" class="flex-column flex-sm-row">
        <div class="check-in-bottom-section-container" justify="center">
          <MedscapeLiveAppDownload />
        </div>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { EMAIL_REGEX } from '@/core/constants/Regex.constants'
import { NEED_HELP_ICON } from '~/core/constants/asset-paths'
import {
  EVENT_PRESENCE_QUERY_PARAM,
  VIRTUAL_EVENT_PLATFORM_MEDSCAPE
} from '~/core/constants/app.constants'
import { HOME } from '~/core/constants/router-paths'
import { sendWmdPageLink } from '~/core/global'
import {
  CHECKIN_JOIN,
  CHECKIN_JOIN_BUTTON_TEXT
} from '~/core/constants/omniture-events'
import { type EventCheckInUserProfile } from '~/models/EventCheckIn'
import EventDateFormatter from '@/components/mixins/EventDateFormatterMixin'
import LiveEvent from '@/models/LiveEvent'
import { PROMO_FLAG_FETCHED } from '~/core/constants/message-bus.constants'
dayjs.extend(utc)

export default {
  extends: EventDateFormatter,
  data() {
    return {
      email: '',
      isLoading: false,
      isFailure: false,
      isFormValid: false,
      emailFormPrompt: '',
      errorMessage: '',
      HOME,
      helpLinkIcon: NEED_HELP_ICON,
      welcomeText: '',
      eventTitle: '',
      eventLocation: '',
      eventDate: '',
      eventDateTime: '',
      registerLink: '',
      hideJoinSection: false,
      isP2PFailure: false,
      registerPrompt: '',
      registerWithDifferentEmailPrompt: '',
      pageLoading: true,
      isP2PEvent: false,
      isPromoEvent: true,
      eventEnded: false,
      virtualEventPlatform: '',
      eventPresence: ''
    }
  },
  beforeMount() {
    this.emailFormPrompt = this.$uiService.emailForm.checkInPrompt
    this.welcomeText = this.$uiService.emailForm.welcomeText
    this.registerPrompt = this.$uiService.emailForm.registerPrompt
    this.registerWithDifferentEmailPrompt = this.$uiService.emailForm.registerWithDifferentEmailPrompt
  },
  async mounted() {
    const queryParam = this.$route.query
    const userAuthLevel = window?.PageMetadata?.authVar?.authLevel
    if (userAuthLevel && userAuthLevel === '2') {
      this.email = window?.PageMetadata?.addProfile?.email || ''
    } else if (queryParam.email && queryParam.email !== '') {
      this.email = queryParam.email || ''
    }
    const liveEventId = this.$route?.params?.liveEventId
    console.log('mounted:liveEventId', liveEventId)
    if (liveEventId) {
      try {
        const event = await this.getEventData(liveEventId)
        this.virtualEventPlatform = event.virtualEventPlatform
          ? event.virtualEventPlatform
          : ''
        this.eventPresence = event.eventPresence ? event.eventPresence : ''
        const currentTimeUtc = dayjs().utc()
        const eventDateUtc = dayjs(event?.endDate)
          .utc()
          .add(2, 'hour')
        if (
          event &&
          event.virtualEventPlatform === VIRTUAL_EVENT_PLATFORM_MEDSCAPE &&
          eventDateUtc
        ) {
          if (currentTimeUtc.isAfter(eventDateUtc)) {
            this.showEventEndedMsg()
          } else {
            this.eventEnded = false
          }
        }
        this.eventTitle = event.title ? `${event.title}` : ''
        this.eventLocation = event.location ? event.location : ''
        this.eventDate = this.getFormattedStartDate(event)
        console.log('created:foo', this.getLocalTimeZoneString('12:15 PM', event.startDate))
        this.eventDateTime =
          this.eventDate +
          ' ' +
          this.getLocalTimeZoneString(this.getEventTime(event), event.startDate)
        console.log('mounted data', this.eventDateTime)
        this.isP2PEvent = event.isP2PEvent ? event.isP2PEvent : false
        this.isPromoEvent = this.getPromoFlag(event)
        this.$emit(PROMO_FLAG_FETCHED, this.isPromoEvent)
        // submit the form if form is valid
        if (this.isFormValid) {
          this.sendEmailForm()
        } else {
          this.pageLoading = false
        }
      } catch {
        this.pageLoading = false
        this.eventEnded = false
      }
    } else {
      this.pageLoading = false
    }
  },
  methods: {
    async sendEmailForm(event: MouseEvent) {
      this.isFailure = false
      const liveEventId = this.$route?.params?.liveEventId
      if (liveEventId && this.email) {
        this.isLoading = true
        try {
          const checkIn = await this.$liveEventService.checkInToVirtualEvent(
            liveEventId,
            this.email
          )
          if (checkIn.isRegistered) {
            this.setDataIntoBrowser(checkIn)
            this.logUserAction(event, CHECKIN_JOIN_BUTTON_TEXT)
            if (
              this.virtualEventPlatform === VIRTUAL_EVENT_PLATFORM_MEDSCAPE &&
              this.eventPresence
            ) {
              if (!checkIn.isEventEnded) {
                const redirectionUrl = new URL(checkIn.url)
                redirectionUrl.searchParams.append(
                  EVENT_PRESENCE_QUERY_PARAM,
                  this.eventPresence
                )
                window.location.assign(redirectionUrl.href)
                return
              } else {
                this.showEventEndedMsg()
                return
              }
            }
            window.location.assign(checkIn.url)
            return
          } else if (!checkIn.isRegistered && checkIn.isP2PEvent) {
            this.registerPrompt = `${checkIn.message}`
            this.pageLoading = false
            this.isFailure = true
            this.isLoading = false
            this.hideJoinSection = true
            this.isP2PFailure = true
            return
          } else {
            this.registerLink = checkIn.url
            this.hideJoinSection = true
            this.pageLoading = false
          }
        } catch (e) {
          this.errorMessage = this.$uiService.error.errorProcessingEmail
          this.pageLoading = false
        }
        this.isFailure = true
        this.isLoading = false
      }
    },
    async logUserAction(event: MouseEvent, linkText: string) {
      const userVars: Record<string, string> = {}
      await sendWmdPageLink(
        CHECKIN_JOIN.concat(linkText.toLowerCase()),
        event?.target,
        userVars
      )
    },
    setDataIntoBrowser(profile: EventCheckInUserProfile) {
      localStorage.setItem('country', profile.country || '')
      localStorage.setItem('specialty', profile.specialty || '')
      localStorage.setItem('profession', profile.profession || '')
    },
    getEventTime(liveEvent: any): string {
      return liveEvent.startDate
        ? dayjs(liveEvent.startDate).format('h:mm A')
        : ''
    },
    validateEmail(email: string) {
      if (EMAIL_REGEX.test(email)) {
        return true
      }
      return this.$uiService.error.invalidEmailAddress
    },
    joinWithDifferentEmail() {
      this.email = ''
      this.errorMessage = ''
      this.hideJoinSection = false
    },
    async getEventData(liveEventId: string) {
      let liveEvents: LiveEvent[] = []
      let liveEvent: LiveEvent
      try {
        liveEvents = await this.$liveEventService.getEventMetadataFromDb(
          liveEventId,
          true
        )
      } catch (getEventDataError) {
        console.error('Error in getEventData(): ', getEventDataError)
      }
      if (liveEvents && liveEvents.length > 0) {
        liveEvent = liveEvents[0]
      } else {
        liveEvent = await this.$liveEventService.getEventMetadata(liveEventId)
      }
      return liveEvent
    },
    getFormattedStartDate(liveEvent: LiveEvent) {
      let formattedEventDate = ''
      try {
        formattedEventDate = liveEvent.startDate
          ? dayjs(liveEvent.startDate).format('MMMM D, YYYY')
          : ''
      } catch (startDateFormatError) {
        console.error(
          'Error in getFormattedStartDate(): ',
          startDateFormatError
        )
      }
      return formattedEventDate
    },
    getPromoFlag(liveEvent: LiveEvent): boolean {
      return liveEvent.isPromoEvent ? liveEvent.isPromoEvent : false
    },
    showEventEndedMsg() {
      this.emailFormPrompt = this.$uiService.emailForm.checkInPromptEventClose
      this.eventEnded = true
      this.isFormValid = false
      this.pageLoading = false
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
@import '@/styles/variables.scss';
.page-loading-spinner {
  color: $color-blue;
  display: block;
  margin: 10% auto;
}
.check-in-page-container {
  margin: 0px;
}
.check-in-top-section-container {
  background-color: $color-blue !important;
  padding-top: 0px;
  padding-bottom: 147px;
  justify-content: center;
  text-align: center;
  .check-in-medscapelive-link {
    margin: auto !important;
    display: inline-block;
  }
  .check-in-event-info-container {
    text-align: center;
    letter-spacing: 0px;
    color: $color-white;
    opacity: 1;
    padding-top: 2px;
    h2 {
      font: normal normal bold 24px/16px $default-font-family;
      padding: 0px 0px 10px 0px;
      line-height: 1;
      letter-spacing: 0px;
    }
    h3 {
      font: normal normal 600 20px/16px $default-font-family;
      padding: 2px 0px 10px 0px;
      line-height: 1;
    }
    h4 {
      font: normal normal 500 18px/16px $default-font-family;
      padding: 0px 0px 18px 0px;
      line-height: 1;
      letter-spacing: 0px;
    }
    h5 {
      font: normal normal normal 16px/16px $default-font-family;
      padding: 0px 0px 10px 0px;
      line-height: 1;
      letter-spacing: 0px;
    }
  }
  .check-in-divider {
    width: 6%;
    border-top: 1px solid $color-white;
    margin: auto;
  }
}

.check-in-top-section-container-promo {
  background-color: $color-gray-light !important;
  .check-in-event-info-container {
    color: $color-black;
    padding-top: 80px;
    .check-in-divider {
      border-top: 1px solid $color-gray-medium-dark;
    }
  }
}
.check-in-top-section-event-end {
  padding-bottom: 70px !important;
}
.check-in-container {
  background-color: $color-light-bluish-gray;
}
.event-end {
  margin-top: -46px !important;
  padding: 24px 60px !important;
}
.check-in-box-container {
  max-width: 508px;
  margin: auto;
  margin-top: -117px;
  background-color: $color-white;
  box-shadow: 0px 2px 9px rgba($color: $color-black, $alpha: 0.1);
  border-radius: 6px;
  opacity: 1;
  padding: 40px 60px 10px 60px;
  text-align: center;
  .email-prompt-label {
    font: normal normal 700 17px $default-font-family;
    line-height: 1;
  }
  .check-in-button-container {
    padding: 0px 12px 4px 12px;
    .event-check-in-button {
      width: 100%;
      padding: 2px 0px 2px 0px;
      height: 48px;
      background-color: $color-blue-bright !important;
      letter-spacing: -0.41px;
      color: $color-white;
      text-transform: none;
      font-size: 17px;
      line-height: 22px;
    }
  }
  .check-in-submit-val-container {
    height: 44px;
  }
  .check-in-err-msg {
    display: inline-block;
    font-size: 12px;
    color: #ff5252;
    text-align: left;
    padding: 0px 25px 8px 25px;
  }
  .register-box-label-container {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .register-box-label {
    text-align: center;
    font: normal normal 600 16px/20px $default-font-family;
    letter-spacing: 0px;
    color: $color-gray-medium;
    opacity: 1;
  }
  .registration-link-button {
    cursor: pointer;
    color: $color-blue-bright !important;
  }
  .register-submit-val-container {
    padding-top: 18px;
    padding-bottom: 25px;
  }
}
.check-in-bottom-section-container {
  padding: 18px 0px 60px 0px;
  display: flex;
  .check-in-medscapelive-link {
    text-align: center;
    font: normal normal 600 18px/22px $default-font-family;
    letter-spacing: 0px;
    color: $color-blue-bright !important;
    text-decoration: none;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    .check-in-need-help-link-icon {
      display: inline-block;
    }
  }
}
</style>
