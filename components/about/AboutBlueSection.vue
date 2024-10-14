<template>
  <v-container fluid class="about-blue-section px-0 white-text">
    <v-row justify="center" class="text-center mb-6">
      <div class="about-blue__title">
        <h1 class="my-6">{{ $uiService.about.blueTitle }}</h1>
        <p class="text-sm-center text-left">
          <span> {{ $uiService.about.blueSubtitle }}</span>
        </p>
      </div>
    </v-row>
    <v-row>
      <v-col
        v-for="s in $uiService.about.blueServices"
        :key="s.title"
        cols="12"
        class="col-sm-6 
        px-12 px-sm-4
        mb-4"
      >
        <v-flex row class="ma-0 about-blue__service-tile">
          <v-icon
            class="about-blue__service-icon mr-3"
            :large="$vuetify.breakpoint.mdOnly"
            :x-large="$vuetify.breakpoint.lgAndUp"
            dark
            >{{ s.icon }}</v-icon
          >
          <div class="about-blue__service-text">
            <h2 class="mb-4">{{ s.title }}</h2>
            <p>{{ s.text }}</p>
          </div>
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">

export default {
  name: 'AboutBlueSection'
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';

@media #{map-get($display-breakpoints, 'xs-only')} {
  .about-blue__title {
    width: 80%;
  }
}
@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .about-blue__title {
    width: 50%;
  }
}
.about-blue-section {
  background-color: #005b81;
}
.about-blue__service-text {
  width: 75%;
}
.about-blue__service-icon {
  align-self: start;
}
.about-blue__service-tile {
  justify-content: center !important;
}
</style>
