<template>
  <v-app>
    <v-navigation-drawer
      v-if="!isPromoEvent"
      v-model="showDrawer"
      app
      temporary
      clipped
      data-test="navigation-drawer"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          data-test="navigation-drawer__list-item"
          link
          :to="item.link"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <transition v-if="!isPromoEvent" name="mdscp-live-header-toggle">
      <v-app-bar
        v-show="toggleHeader"
        class="mdscp-live-header"
        :flat="appBarOptions.flat"
        :hide-on-scroll="appBarOptions.hideOnScroll"
        :extension-height="$vuetify.display.xs ? 0 : 65"
        height="60"
        clipped-left
        app
        :color="appBarOptions.color"
        data-test="medscape-live-header"
      >
        <v-app-bar-nav-icon
          class="d-flex d-sm-none 
          text-left"
          data-test="header__show-drawer-icon"
          :color="appBarOptions.navIconColor"
          @click.stop="toggleDrawer"
        ></v-app-bar-nav-icon>
        <v-spacer class="d-flex d-sm-none"></v-spacer>
        <router-link data-test="header__medscape-icon-router" :to="HOME">
          <v-img
            class="shrink mr-2"
            data-test="header__medscape-icon"
            :src="appBarOptions.logoImg.src"
            :srcset="appBarOptions.logoImg.srcSet"
            :alt="appBarOptions.logoImg.alt"
            :title="appBarOptions.logoImg.title"
            contain
            width="160px"
            height="30px"
          />
        </router-link>
        <v-spacer></v-spacer>
        <v-btn
          :href="headerButtonOptions.href"
          class="mdscp-live-header__about-btn
          d-none d-sm-flex
          btn-dark-blue"
          text
          data-test="header__about-button"
          >{{ headerButtonOptions.text }}</v-btn
        >
        <template v-if="appBarOptions.showExtension" v-slot:extension>
          <v-container
            v-show="$vuetify.breakpoint.smAndUp"
            fluid
            class="pa-0 app-bar-extension__search"
          >
            <LiveEventSearch class="fill-height" />
          </v-container>
        </template>
      </v-app-bar>
    </transition>
    <v-content
      :style="appContentStyle"
      class="grey-light-background"
      :class="{ 'white-background': isPromoEvent }"
    >
      <nuxt />
    </v-content>
    <lazy-mdscp-footer
      v-if="!isPromoEvent"
      :footer-menu="footerMenu"
      :lang-menu="langMenu"
      :copyright="copyright"
    ></lazy-mdscp-footer>
  </v-app>
</template>
<script lang="ts">
import {
  defaultAppBarOptions,
  type AppBarOptions
} from '@/models/view/AppBarOptions'
import { HOME, ABOUT, EVENTS } from '@/core/constants/router-paths'
import { UpdateHeaderCtaOptions } from '@/models/view/UpdateHeaderCtaOptions'
import * as MessageBus from '~/core/constants/message-bus.constants'
import {
  footerMenu,
  langMenu,
  copyright
} from '~/core/constants/footerMenu.options'
import * as scripts from '~/core/constants/script-paths'
import '~/plugins/omnitureMixin'

export default {
  data() {
    return {
      HOME,
      headerButtonOptions: {
        href: ABOUT,
        text: this.$uiService.label.aboutMedscapeLive
      },
      showDrawer: false,
      toggleHeader: false,
      showHeaderForPage: false,
      items: [
        { title: this.$uiService.label.home, link: HOME },
        { title: this.$uiService.label.events, link: EVENTS },
        { title: this.$uiService.label.about, link: ABOUT }
      ],
      footerMenu,
      langMenu,
      copyright,
      appBarOptions: defaultAppBarOptions,
      isPromoEvent: true
    }
  },
  computed: {
    appContentStyle(): Object {
      return this.showHeaderForPage ? {} : { 'padding-top': 0 }
    }
  },
  beforeMount() {
    this.$on(MessageBus.SHOW_HEADER_FOR_PAGE, this.onShowHeaderForPage)
    this.$on(MessageBus.SHOW_HEADER, this.onToggleHeader)
    this.$on(MessageBus.UPDATE_APP_BAR_OPTIONS, this.updateAppBarOptions)
    this.$on(MessageBus.UPDATE_HEADER_CTA, this.onUpdateHeaderCta)
    this.$on(MessageBus.PROMO_FLAG_FETCHED, this.setPromoFlag)
  },
  beforeUnmount() {
    this.$off(MessageBus.SHOW_HEADER_FOR_PAGE, this.onShowHeaderForPage)
    this.$off(MessageBus.SHOW_HEADER, this.onToggleHeader)
    this.$off(MessageBus.UPDATE_HEADER_CTA, this.onUpdateHeaderCta)
    this.$off(MessageBus.UPDATE_APP_BAR_OPTIONS, this.updateAppBarOptions)
    this.$off(MessageBus.PROMO_FLAG_FETCHED, this.setPromoFlag)
  },
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer
    },
    onToggleHeader(payload: boolean) {
      this.toggleHeader = payload
    },
    onUpdateHeaderCta(payload: UpdateHeaderCtaOptions) {
      this.headerButtonOptions = payload
    },
    onShowHeaderForPage(payload: boolean) {
      this.showHeaderForPage = payload
      this.toggleHeader = payload
    },
    updateAppBarOptions(payload: AppBarOptions) {
      this.appBarOptions = payload
    },
    setPromoFlag(isPromo: boolean) {
      this.isPromoEvent = isPromo
    }
  },
  head(): object {
    const isDev = this.$config?.MEDSCAPE_ENV !== 'production'
    const canonicalTag = {
      rel: 'canonical',
      href: this.$config?.WEB_BASE_URL + this.$route?.path
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
      script: [setOmnitureVars, setOmnitureDev, omnitureScript],
      link: [canonicalTag]
    }
  }
}
</script>
<style lang="scss">
.v-navigation-drawer--temporary.v-navigation-drawer--clipped {
  z-index: 5;
  padding-top: 64px;
}

.mdscp-live-header-toggle-enter,
.mdscp-live-header-toggle-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.mdscp-live-header-toggle-enter-active,
.mdscp-live-header-toggle-leave-active {
  transition: all 0.3s;
}
.mdscp-live-header__about-btn {
  letter-spacing: normal;
}

.trust-arc-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  color: rgba(0, 0, 0, 0.8);
  text-align: center;
}
.white-background {
  background-color: white !important;
}
</style>
<style lang="scss">
@import '@/styles/global.scss';
</style>
