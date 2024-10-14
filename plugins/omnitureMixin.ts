
import {OmnitureMixin, type OmnitureMethods} from '~/components/mixins/OmnitureMixin'


declare module '@vue/runtime-core' {
  interface Vue extends OmnitureMethods {}
}

declare module '@vue/runtime-core' {
  interface NuxtAppOptions extends OmnitureMethods {}
}

declare module '@vue/runtime-core' {
  interface Store<S> extends OmnitureMethods {}
}


export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.mixin(OmnitureMixin);
})
