<template>
  <div class="dropdown-indicator__icon pl-1 pt-1 pb-1">
    <v-img
      class="dropdown-indicator__icon-img"
      :src="$uiService.image.dropDownIndicator.src"
      :alt="$uiService.image.dropDownIndicator.alt"
      contain
    ></v-img>
  </div>
</template>
<script lang="ts">

export default {
  name: 'DropdownIndicator'
}
</script>
