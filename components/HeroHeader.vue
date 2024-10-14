<template>
  <div class="hero-header_wrapper">
    <v-img
        class="hero-header_bg-image"
        data-test="hero-header__hero-img"
        cover
        :src="heroImage.src"
        :srcset="heroImage.srcSet"
        :title="heroImage.title"
        :alt="heroImage.alt"
    />

    <div class="top" data-test="hero-header__header">
      <router-link :to="HOME">
        <img
            :src="$uiService.image.medscapeLiveLogo.src"
            :alt="$uiService.image.medscapeLiveLogo.alt"
            :title="$uiService.image.medscapeLiveLogo.title"
        />
      </router-link>

      <slot :name="HERO_HEADER_RIGHT_ITEM_SLOT" />
    </div>

    <div class="content">
      <slot :name="HERO_HEADER_CONTENT_SLOT" />
    </div>
  </div>
</template>
<script lang="ts">
import { HOME } from '~/core/constants/router-paths'
import { MEDSCAPE_LIVE_LOGO_WHITE } from '@/core/constants/asset-paths'
import { type ImgAttribute } from '@/models/view/ImgAttribute'
import {
  HERO_HEADER_CONTENT_SLOT,
  HERO_HEADER_RIGHT_ITEM_SLOT
} from '~/core/constants/slot-names'

export default {
  name: 'HeroHeader',
  props: {
    heroImage: {
      type: Object as () => ImgAttribute,
      required: true
    }
  },
  data() {
    return {
      HOME,
      HERO_HEADER_CONTENT_SLOT,
      HERO_HEADER_RIGHT_ITEM_SLOT,
      MEDSCAPE_LIVE_LOGO_WHITE
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';
.hero-header_wrapper {
  width: 100%;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
  position: relative;

  .hero-header_bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
  }

  .top {
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 24px;

    img {
      width: auto;
      height: 30px;
    }
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    padding: 0 24px;
  }
}
</style>
