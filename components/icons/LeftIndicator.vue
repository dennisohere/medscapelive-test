<template>
  <div class="left-indicator__icon pl-1 pt-1 pb-1">
    <v-img
      class="left-indicator__icon-img"
      :src="$uiService.image.leftIndicator.src"
      :alt="$uiService.image.leftIndicator.alt"
      :title="$uiService.image.leftIndicator.title"
      contain
    ></v-img>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LeftIndicator'
}
</script>
<style lang="scss">
.left-indicator__icon-img {
  width: 100% !important;
  height: 100% !important;
}
</style>
