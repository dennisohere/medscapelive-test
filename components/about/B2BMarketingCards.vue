<template>
  <v-container fluid class="px-0 py-12">
    <v-row justify="center" class="text-center mb-md-10 mb-sm-6 mb-8">
      <h2 class="about-tiles__title">
        {{ $uiService.about.marketingCardHeader }}
      </h2></v-row
    >
    <v-row class="text-sm-left text-center px-12">
      <v-col
        v-for="t in $uiService.about.cards"
        :key="t.title"
        cols="12"
        class="col-sm-3"
      >
        <v-img
          :title="t.img.title"
          :src="t.img.src"
          aspect-ratio="1.77"
          :alt="t.img.alt"
        ></v-img>
        <h3 class="mb-sm-4 mt-sm-3 my-4">{{ t.title }}</h3>
        <ul class="text-left mb-2">
          <li v-for="i in t.bullets" :key="i">
            {{ i }}
          </li>
        </ul>
        <p class="about-tiles__tile-text">{{ t.text }}</p></v-col
      >
    </v-row>
  </v-container>
</template>
<style lang="scss">
@import '@/styles/variables.scss';

@media #{map-get($display-breakpoints, 'xs-only')} {
  .about-tiles__title {
    width: 70%;
  }
}
@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .about-tiles__title {
    justify-content: center;
    width: 50%;
  }
}
</style>
