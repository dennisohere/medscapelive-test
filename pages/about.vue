<template>
  <v-container fluid class="ma-0 pa-0">
    <HeroHeader
      :ref="ABOUT_CONTACT_HEADER"
      data-test="about-hero-image-section"
      class="about-header__container"
      :hero-image="$uiService.about.heroHeaderSrc"
    >
      <template v-slot:[HERO_HEADER_CONTENT_SLOT]>
        <v-row class="flex-column fill-height flex-grow-1">
          <v-spacer></v-spacer>
          <v-col class="col-auto">
            <v-row>
              <v-col sm="7" offset-sm="1" md="6">
                <div
                  class="about-header__info-text
                  text-sm-left text-center 
                  px-7 px-sm-0"
                >
                  <h1
                    class="about-header__info-text
                      mb-7 
                      white-text"
                  >
                    {{ $uiService.about.heroHeader }}
                  </h1>
                  <p
                    class="about-header__info-text 
                    about-header__info-caption 
                    white-text mb-10"
                  >
                    <span> {{ $uiService.about.heroBody }}</span>
                  </p>
                  <v-btn
                    :href="$uiService.about.contactUsLink"
                    class="btn-light-blue py-1 px-10 mb-5 letter-spacing-normal"
                    text
                    data-test="about-header__contact-us-button"
                  >
                    {{ $uiService.about.contactUsButton }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </template>
    </HeroHeader>
    <LazyB2BMarketingCards class="py-12 about-marketing-cards" />
    <v-divider
      v-show="$vuetify.display.xsOnly"
      class="about-section__divider mx-12 my-6"
    ></v-divider>
    <LazyAboutVideoSection class="py-12" />
  </v-container>
</template>
<script lang="ts">
import { HERO_HEADER_CONTENT_SLOT } from '~/core/constants/slot-names'
import { UPDATE_HEADER_CTA } from '~/core/constants/message-bus.constants'
import { UpdateHeaderCtaOptions } from '~/models/view/UpdateHeaderCtaOptions'
import { sendWmdPageview, loadPulsePointPixel } from '~/core/global'
import { ABOUT_CONTACT_HEADER } from '@/core/constants/component-refs'
import StickyHeroHeaderMixin from '@/components/mixins/StickyHeroHeaderMixin'

export default {
  name: 'About',
  mixins: [StickyHeroHeaderMixin(ABOUT_CONTACT_HEADER)],
  data() {
    return {
      HERO_HEADER_CONTENT_SLOT,
      ABOUT_CONTACT_HEADER
    }
  },
  mounted() {
    sendWmdPageview()
    loadPulsePointPixel(this.$config?.PULSE_POINT_PIXEL_PID)
    this.$bus.$emit(
      UPDATE_HEADER_CTA,
      new UpdateHeaderCtaOptions(
        this.$uiService.about.contactUsButton,
        this.$uiService.about.contactUsLink
      )
    )
    console.log('about page: emit', 'mounted')
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';

.about-marketing-cards {
  width: 100vw;
}

.hero-header_wrapper.about-header__container {
  height: 100% !important;
  max-height: 600px !important;
}

.about-header__container {
  max-height: 600px;
  margin-left: -1px !important;
}
.about-header__info-text {
  color: #ffffff;
  background-color: transparent;
  align-self: center;
  transform-style: inherit;
  -webkit-transform-style: preserve-3d;
  backface-visibility: inherit;
  -webkit-backface-visibility: hidden;
}
</style>
