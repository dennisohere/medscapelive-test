<template>
  <div
    v-if="displayStatus"
    :class="{ 'error-alert-container': displayGradient }"
  >
    <div class="error-alert-popup-main error-alert-popup-position-default">
      <span class="msg"> Oops, something went wrong.</span>
      <v-img
        :src="$uiService.image.medscapeLiveRegistrationErrorCloseImage"
        class="close-icon"
        @click="displayStatus = false"
      />
    </div>
  </div>
</template>
<script lang="ts">

export default {

  name: 'ErrorAlert',
  props: {
    displayStatus: {
      type: Boolean,
      default() {
        return false
      }
    },
    displayGradient: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.error-alert-popup-position-default {
  left: 50%;
  transform: translate(-50%, 0%);
}
.error-alert-popup-main {
  background: #0072c8 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 9px #0000001a;
  border-radius: 40px;
  opacity: 1;
  height: 29px;
  position: fixed;
  z-index: 10;
  top: 84px;
  padding: 0px 12px;
  padding-top: 4px;
  width: 227px;
  display: inline-flex;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    top: 66px;
  }
  .msg {
    font-family: $body-font-family;
    font-size: 14px !important;
    letter-spacing: 0px !important;
    padding: 0 !important;
    color: #ffffff;
  }
  .close-icon {
    width: 13px;
    height: 13px;
    object-fit: contain;
    display: inline-block;
    position: absolute;
    top: 8px;
    right: 10px;
    cursor: pointer;
  }
}
.error-alert-container {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
  height: 300px;
  position: fixed;
  top: 0px;
  z-index: 10;
}
</style>
