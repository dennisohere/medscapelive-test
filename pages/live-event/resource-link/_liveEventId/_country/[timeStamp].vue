<template>
  <div class="resource-link-page">
    <v-progress-circular
      v-if="isLoading"
      class="resource-link-page-loading-spinner"
      indeterminate
    ></v-progress-circular>
    <p v-if="!isLoading && errorMessage" class="error-msg">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import * as LABEL from '~/core/constants/user-facing-strings/resource-link-strings'
export default {
  name: 'ResourceLink',
  layout: 'brandless',
  async asyncData(context) {
    if (process.server) {
      if (context.params?.liveEventId && context.params?.country) {
        const liveEventIdParam: string =
          (context.params?.liveEventId as string) || ''
        const countryParam: string = (context.params?.country as string) || ''

        try {
          const response = await context.$liveEventSecureService.getResourceLinks(
            liveEventIdParam,
            countryParam
          )
          let redirectUrl: string = ''
          if (response.p2pLinks && response.p2pLinks?.length > 0) {
            redirectUrl = response.p2pLinks[0]?.resourceUrl
            if (redirectUrl) {
              context.redirect(redirectUrl)
            } else {
              return {
                errorMessage: LABEL.RESOURCE_LINK_NOT_FOUND,
                isLoading: false
              }
            }
          } else if (response.statusCode && response.statusCode === 404) {
            return {
              errorMessage: LABEL.RESOURCE_LINK_NOT_FOUND,
              isLoading: false
            }
          } else {
            return {
              errorMessage: LABEL.SOMETHING_WENT_WRONG,
              isLoading: false
            }
          }
        } catch (getResourceLinkErr) {
          return {
            errorMessage: LABEL.SOMETHING_WENT_WRONG,
            isLoading: false
          }
        }
      }
    }
  },
  data() {
    return {
      isLoading: true,
      errorMessage: ''
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
@import '@/styles/variables.scss';

.resource-link-page-loading-spinner {
  color: $color-blue;
  display: block;
  margin: 10% auto;
}
.resource-link-page {
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
