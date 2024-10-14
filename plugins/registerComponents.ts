
import VueAwesomeSwiper from "vue-awesome-swiper/index";

export default defineNuxtPlugin(nuxtApp => {
  if (import.meta.browser) {
    nuxtApp.vueApp.use(VueAwesomeSwiper);
  }

})
