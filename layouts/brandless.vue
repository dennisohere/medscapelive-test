<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script lang="ts">
import * as scripts from '~/core/constants/script-paths'
import '~/plugins/omnitureMixin'

export default {
  head(): object {
    const isDev = this.$config?.MEDSCAPE_ENV !== 'production'
    const canonicalTag = {
      rel: 'canonical',
      href: this.$config?.WEB_BASE_URL + this.$route?.path
    }
    const trustArcScript = {
      src: this.$config?.TRUST_ARC_SCRIPT,
      async: true
    }
    const omnitureScript = {
      src: this.$config?.OMNITURE_SCRIPT,
      async: true
    }
    const setOmnitureVars = {
      src: scripts.OMNITURE_VARS_SCRIPT
    }
    const setOmnitureDev = {
      src: isDev ? scripts.OMNITURE_SET_DEV_SCRIPT : ''
    }
    return {
      script: [trustArcScript, setOmnitureVars, setOmnitureDev, omnitureScript],
      link: [canonicalTag]
    }
  }
}
</script>
<style lang="scss"></style>
