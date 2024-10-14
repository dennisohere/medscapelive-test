/* eslint-disable import/no-mutable-exports */
import { UIService } from '~/services/view/base/UIService'

declare module '#app' {
  interface NuxtApp {
    $uiService: UIService
  }
  interface ComponentCustomProperties {
    $uiService: UIService
  }
}

declare module 'vue' {
  interface NuxtApp {
    $uiService: UIService
  }
  interface ComponentCustomProperties {
    $uiService: UIService
  }
}

declare module '@vue/runtime-core' {
  interface NuxtApp {
    $uiService: UIService
  }
  interface ComponentCustomProperties {
    $uiService: UIService
  }
}


export let uiService: UIService


export default defineNuxtPlugin( {
  name: 'uiService',
  // dependsOn: ['$vuetify'],
  setup: (nuxtApp) => {
    uiService = new UIService(nuxtApp.$vuetify);
    nuxtApp.provide('uiService', uiService);

  }
})


