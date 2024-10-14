<template>
  <v-container fluid class="ma-0 pa-0">
    <CMERegistration class="mt-4" />
  </v-container>
</template>

<script lang="ts">
import { EmailFormPageHeaderMixin } from '@/components/mixins/EmailFormPageHeaderMixin'
import { sendWmdPageview, loadPulsePointPixel } from '@/core/global'
import CMERegistration from '@/components/email-form/cme/CMERegistration.vue'

export default {
  name: 'About',
  components: {
    CMERegistration
  },
  extends: EmailFormPageHeaderMixin,
  mounted() {
    sendWmdPageview()
    loadPulsePointPixel(this.$config?.PULSE_POINT_PIXEL_PID)
  }
}
</script>
