<template>
  <v-container fluid class="ma-0 pa-0">
    <VirtualEventCheckIn />
  </v-container>
</template>

<script lang="ts">
import { EmailFormPageHeaderMixin } from '@/components/mixins/EmailFormPageHeaderMixin'
import { sendWmdPageview, loadPulsePointPixel } from '@/core/global'
import VirtualEventCheckIn from '@/components/email-form/check-in/VirtualEventCheckIn.vue'

export default {
  extends: EmailFormPageHeaderMixin,
  name: 'About',
  layout: 'promo',
  components: {
    VirtualEventCheckIn
  },
  mounted() {
    sendWmdPageview()
    loadPulsePointPixel(this.$config?.PULSE_POINT_PIXEL_PID)
  }
}
</script>
