<template>
  <div class="resource-page">
    <v-progress-circular
      v-if="isLoading"
      class="resource-page-loading-spinner"
      indeterminate
    ></v-progress-circular>
    <p v-if="!isLoading && errorMessage" class="error-msg">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { RESOURCE_REDIRECT } from '~/core/constants/router-paths'
import * as LABEL from '~/core/constants/user-facing-strings/resource-link-strings'
export default {
  name: 'Resource',
  layout: 'brandless',
  data() {
    return {
      isLoading: true,
      errorMessage: ''
    }
  },
  mounted() {
    const countryInStorage = localStorage.getItem(LABEL.STORAGE_PARAM_COUNTRY)
    const liveEventId = this.$route.params?.liveEventId

    if (countryInStorage) {
      const redirectUrl = new URL(window.location.href)
      redirectUrl.pathname =
        RESOURCE_REDIRECT +
        liveEventId +
        '/' +
        countryInStorage +
        '/' +
        Date.now()
      window.location.href = redirectUrl.href
    } else {
      this.errorMessage = LABEL.NO_COUNTRY_FOUND
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
@import '@/styles/variables.scss';

.resource-page-loading-spinner {
  color: $color-blue;
  display: block;
  margin: 10% auto;
}
.resource-page {
  .error-msg {
    display: block;
    margin: 10% auto !important;
    text-align: center;
    font: normal normal 400 20px/16px $default-font-family;
    font-size: 20px;
    color: $color-blue;
    line-height: 1;
  }
}
</style>
