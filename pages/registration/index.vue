<template>
  <v-container fluid class="ma-0 pa-0">
    <RegistrationConfirmation v-if="displayRegistrationOverlay" />
    <P2PRegistrationFailure v-if="displayP2PRegistrationFailureOverlay" />
    <ErrorAlert :display-status="displayRegistrationFailure" />
  </v-container>
</template>

<script lang="ts">
import { GLOBAL_P2P_REGISTRATION_ERROR } from '@/core/constants/authorization.constants'
import { sendWmdPageview, loadPulsePointPixel } from '@/core/global'

export default {
  name: 'About',
  layout: 'brandless',
  data() {
    return {
      displayRegistrationOverlay: false,
      displayRegistrationFailure: false,
      displayP2PRegistrationFailureOverlay: false
    }
  },
  mounted() {
    sendWmdPageview()
    loadPulsePointPixel(this.$config?.PULSE_POINT_PIXEL_PID)
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
  }
}
</script>
