<template>
  <div class="right-indicator__icon pl-1 pt-1 pb-1">
    <v-img
      class="right-indicator__icon-img"
      :src="$uiService.image.rightIndicator.src"
      :alt="$uiService.image.rightIndicator.alt"
      :title="$uiService.image.rightIndicator.title"
      contain
    ></v-img>
  </div>
</template>
<script lang="ts">
export default {
  name: 'RightIndicator'
}
</script>
<style lang="scss">
.right-indicator__icon-img {
  width: 100% !important;
  height: 100% !important;
}
</style>
