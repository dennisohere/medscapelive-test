<template>
  <div>
    <div class="mdscp-footer-top">
      <div class="mdscp-footer-top-main mdscp-footer-top-container">
        <div class="mdscp-footer-top-logo">
          <img
            class="footer-image"
            :src="MEDSCAPE_LOGO"
            title="medscape logo"
            alt="logo of medscape"
          />
        </div>
      </div>
      <div class="mdscp-footer-top-main mdscp-footer-top-container">
        <div class="mdscp-footer-top-social">
          <h4>Find Us On</h4>
          <a
            v-for="(item, index) in footerMenu.social"
            :key="index"
            :href="item.path"
            target="_self"
            :alt="item.alt"
          >
            <img :src="item.imagePath" :title="item.title" :alt="item.alt" />
          </a>
        </div>
        <div class="mdscp-footer-top-section">
          <div class="mdscp-footer-top-col">
            <h4>About</h4>
            <template v-for="(item, index) in footerMenu.About">
              <a
                v-if="item.name !== 'gdpr-ccpa'"
                :key="index"
                :href="item.path"
                :target="item.target"
              >
                {{ item.name }}
              </a>
              <a
                v-else-if="item.name === 'gdpr-ccpa' && geoc === 'US'"
                id="ot-sdk-btn"
                :key="index + 10"
                class="ib-your-choices"
                onclick="OneTrust.ToggleInfoDisplay();"
                href="javascript:void(0);"
                style="display: none; color: #4b4b4b !important; font-size: .875rem !important; margin: 0 0 14px 0 !important;"
                >Your Privacy Choices
                <img
                  src="https://icons.internetbrands.com/ccpa/privacyoptions29x14.png"
                  style="vertical-align:middle;"
              /></a>
              <a
                v-else
                id="ot-sdk-btn"
                :key="index + 11"
                class="ot-sdk-show-settings"
                style="display: block;"
              >
              </a>
            </template>
            <div id="teconsent" class="mt-3"></div>
          </div>
          <div class="mdscp-footer-top-col">
            <h4>Membership</h4>
            <a
              v-for="(item, index) in footerMenu.Membership"
              :key="index"
              :href="item.path"
              :target="item.target"
            >
              {{ item.name }}
            </a>
          </div>
          <div class="mdscp-footer-top-col">
            <h4>
              <a href="http://www.medscape.com/public/applanding">
                App
              </a>
            </h4>
            <a
              v-for="(item, index) in footerMenu.Apps"
              :key="index"
              :href="item.path"
              :target="item.target"
            >
              {{ item.name }}
            </a>
          </div>
          <div class="mdscp-footer-top-col" style="display: none;">
            <h4>
              <span class="text-transform-none">
                WebMD Network
              </span>
            </h4>
            <a
              v-for="(item, index) in footerMenu.Network"
              :key="index"
              :href="item.path"
              :target="item.target"
            >
              {{ item.name }}
            </a>
          </div>
          <div class="mdscp-footer-top-col">
            <h4>Editions</h4>
            <a
              v-for="(item, index) in langMenu"
              :key="index"
              :href="item.path"
              :target="item.target"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mdscp-footer-btm">
      <div class="mdscp-footer-btm-legal mdscp-footer-top-container">
        {{ copyright }}
      </div>
    </div>
  </div>
</template>
<script>
import { MEDSCAPE_LOGO } from '@/core/constants/asset-paths'

export default {
  name: 'Footer',
  props: {
    footerMenu: {
      type: Object,
      default() {
        return {}
      }
    },
    copyright: {
      type: String,
      default: ''
    },
    langMenu: {
      type: Array,
      default() {
        return {}
      }
    },
    formlang: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      MEDSCAPE_LOGO,
      activeTab: 0,
      geoc: ''
    }
  },
  mounted() {
    this.geoc = window?.PageMetadata?.reqHeaders?.geoc

    window.addEventListener('DOMContentLoaded', function() {
      if (document.getElementById('ot-stub') !== null) {
        const elem = document.getElementById('ot-sdk-btn')
        elem.style.setProperty('display', 'block', 'important')
      }
    })
  }
}
</script>
<style lang="scss">
$proxima_nova_ltlight: 'ProximaNova Light Italic', sans-serif;
$proximaFont: 'ProximaNova', sans-serif;

.mdscp-footer-top {
  border-top: solid 2px #005b81;
  padding-top: 2.5rem;
  padding-bottom: 4rem;
  background: #fff;
  @media (max-width: 767px) {
    padding-bottom: 0;
  }
  &-main {
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &-container {
    max-width: 96%;
    width: 1240px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 767px) {
      max-width: 90%;
    }
  }
  &-logo {
    width: 100%;
    text-align: left;
    margin-bottom: 1rem;
    @media (max-width: 767px) {
      margin-bottom: 0.5rem;
    }
    .footer-image {
      height: 1.75rem;
    }
  }
  &-section {
    display: flex;
    padding-bottom: 3rem;
    justify-content: space-between;
    @media (min-width: 768px) {
      flex: 5;
    }
    @media (max-width: 1023px) {
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
  &-social {
    text-align: left;
    flex: 1.6;
    @media (max-width: 767px) {
      width: 100%;
      padding-bottom: 2rem;
    }
    a {
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      display: inline-block;
    }
  }
  &-col {
    padding: 0 1rem;
    border-left: solid 1px #dbdbdb;
    font-family: $proximaFont;
    text-align: left;
    font-size: 0.875rem;
    span {
      display: block;
      margin-bottom: 0.875rem;
      color: #222;
      text-decoration: none;
      cursor: pointer;
    }
    @media (max-width: 767px) {
      margin-bottom: 0;
      padding: 0 0 2rem;
      border-left: none;
      border-top: solid 1px #dbdbdb;
      width: 100%;
    }
    @media (max-width: 1023px) {
      min-width: 9.75rem;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
    }
    a {
      display: block;
      margin-bottom: 0.875rem;
      color: #222;
      text-decoration: none;
      &:last-of-type {
        margin-bottom: 0;
      }
      &:hover,
      &:active {
        color: #005b81;
      }
    }
  }
  h4 {
    margin-top: 0;
    text-transform: uppercase;
    font-size: 1rem;
    margin-bottom: 0.875rem;
    @media (max-width: 767px) {
      margin-top: 0.875rem;
    }
  }
}

.mdscp-footer-btm {
  background: #fff;
  &-legal {
    background: #fff;
    font-family: $proximaFont;
    width: 500px;
    margin-top: 0rem;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.75rem;
    line-height: 1.3;
    text-align: center;
    color: #767674;
    padding-bottom: 2.5rem;
  }
}
</style>
