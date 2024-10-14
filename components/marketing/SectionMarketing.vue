<template>
  <section class="section_marketing">
    <div class="container-default">
      <h2>{{ $uiService.homeMarketing.b2cCardHeader }}</h2>

      <div class="marketing_card-grid">
        <MarketingCard
          v-for="(card, index) in $uiService.homeMarketing.cards"
          :key="index"
          :data="card"
        />
      </div>

      <v-btn
        class="marketing_button v-btn v-btn--flat v-btn--text theme--dark v-size--default"
        @click="routeToAbout"
        >Learn More About MedscapeLIVE!</v-btn
      >
    </div>
  </section>
</template>

<script>
import { ABOUT } from '../../core/constants/router-paths'

export default {
  name: 'SectionMarketing',
  methods: {
    routeToAbout() {
      this.$router.push(ABOUT)
    }
  }
}
</script>

<style lang="scss">
.section_marketing {
  background-color: #e7ebed;
  padding: 26px 0;
  text-align: center;

  h2 {
    font-size: 26px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  .marketing_card-grid {
    margin: 30px 0;
    display: grid;
    grid-auto-rows: 1fr;
    gap: 24px;
  }

  .marketing_button {
    border-radius: 50px;
    background-color: #007cb0;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: initial;
  }
}

@media screen and (width < 48em) {
  .marketing_card-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (width >= 48em) {
  .marketing_card-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
