<template>
  <div class="logged-out-homepage">
    <LoggedOutHomepageSectionsHeaderNewBlueWrapper />
    <div class="text-wrapper-20">Medscape LIVE! Events</div>
    <DesktopNav />
    <Frame6 />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoggedOutHomepage",
});
</script>

<style>
.logged-out-homepage {
  background-color: var(--MSCP-color-mode-color-background-index-page);
  height: 2474px;
  position: relative;
  width: 1440px;
}

.logged-out-homepage .text-wrapper-20 {
  color: var(--MSCP-color-mode-color-text-primary-default);
  font-family: "Proxima Nova-Bold", Helvetica;
  font-size: 32px;
  font-weight: 700;
  left: 33px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 101px;
}
</style>
