import LiveEventRestService from '~/services/networking/live-events/LiveEventRestService'
import type LiveEventService from '~/services/networking/live-events/LiveEventService'


declare module '#app' {
  interface NuxtApp {
    $liveEventService: LiveEventService
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $liveEventService: LiveEventService
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $liveEventService: LiveEventService
  }
}




export default defineNuxtPlugin({
  name: 'liveEventRestService',
  setup (nuxtApp) {

    const axios = useAxios()

    const liveEventService = new LiveEventRestService(
        axios
    )

    nuxtApp.provide('liveEventService', liveEventService);
  }
})
