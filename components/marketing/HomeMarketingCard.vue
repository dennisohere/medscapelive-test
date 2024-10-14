<template>
  <v-container fluid class="pa-0" data-test="home-marketing-card__container">
    <v-row :key="cardRowKey" class="home-marketing-card__row">
      <v-col
        v-for="pillar in pillars"
        :key="pillar.header"
        class="py-sm-1 py-2 px-lg-2 px-md-2 px-1"
        data-test="home-marketing__column"
        :class="parentCardClasses"
      >
        <v-card
          class="home-marketing-card 
          d-flex flex-column pa-lg-8 pa-md-6 pa-sm-4 pa-6"
          data-test="home-marketing-card"
          :class="childCardClasses"
        >
          <v-container justify="center" class="text-center mb-4">
            <v-avatar size="100" color="grey">
              <v-img
                :src="pillar.img.src"
                :alt="pillar.img.alt"
                :title="pillar.img.title"
              ></v-img>
            </v-avatar>
          </v-container>
          <h3
            class="home-marketing-card__title            
            mb-2 
            text-center"
          >
            {{ pillar.header }}
          </h3>
          <v-card-text
            data-test="home-marketing-card__body"
            class="home-marketing-card__body
            text-center"
            :class="childCardClasses"
          >
            <div class="body-1 home-marketing-card__body__font">
              {{ pillar.body }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
export default {
  props: {
    pillars: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      cardRowKey: 0
    }
  },
  computed: {
    parentCardClasses(): Object {
      const smAndUp = this.$vuetify.display.smAndUp
      return {
        'd-flex': smAndUp,
        'flex-column': smAndUp
      }
    },
    childCardClasses(): Object {
      return {
        flex: this.$vuetify.display.smAndUp
      }
    }
  },
  mounted() {
    this.cardRowKey += 1
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.home-marketing-card__row {
  margin: 0 -8px;
}

.home-marketing-card__title,
.home-marketing-card__body {
  word-break: normal;
  line-height: normal;
}
.home-marketing-card__body__font {
  font-family: $default-font-family !important;
}
.home-marketing-card {
  transition: all 0.6s ease;
  z-index: 0;
}
.home-marketing-card:hover {
  z-index: 1;
}
@media #{map-get($display-breakpoints, 'xs-only')} {
  .card-row-style {
    padding-bottom: 4%;
    padding-left: 8%;
    padding-right: 8%;
  }
}
@media #{map-get($display-breakpoints, 'sm-only')} {
  .card-row-style {
    padding-bottom: 4%;
    padding-left: 5%;
    padding-right: 5%;
  }
}
@media #{map-get($display-breakpoints, 'md-only')} {
  .card-row-style {
    padding-bottom: 4%;
    padding-left: 5%;
    padding-right: 5%;
  }
}
@media #{map-get($display-breakpoints, 'lg-and-up')} {
  .card-row-style {
    padding-bottom: 4%;
    padding-left: 5%;
    padding-right: 5%;
  }
}
</style>
