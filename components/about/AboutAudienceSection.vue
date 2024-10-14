<template>
  <v-container
    v-show="$vuetify.breakpoint.smAndUp"
    key="about-audience-section"
    class="about-audience-section px-0"
    fluid
    data-test="about-audience-section"
  >
    <v-row>
      <v-col cols="6">
        <v-container class="pl-12 pt-6 pt-md-12 about-audience__info">
          <h2 class="mb-8">{{ $uiService.about.audienceTitle }}</h2>
          <p>{{ $uiService.about.audienceInfo }}</p>
        </v-container>
      </v-col>
      <v-col cols="6" class="pl-4 pr-0">
        <v-img
          :src="$uiService.about.audienceImage.src"
          :alt="$uiService.about.audienceImage.alt"
          :title="$uiService.about.audienceImage.title"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.about-audience__info {
  width: 90%;
}
</style>
