<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      data-test="p2p-registration-failure-dialog"
      transition="dialog-bottom-transition"
      width="630px"
      height="231px"
      persistent
      :fullscreen="$vuetify.display.xsOnly"
    >
      <v-card align="center">
        <v-container>
          <v-row align="center" class="flex-row" justify="center">
            <v-col>
              <v-img
                data-test="p2p-registration-failure__image"
                background-position="center"
                contain
                :src="
                  $uiService.image.medscapeLiveRegistrationUnavailableImage.src
                "
                :alt="
                  $uiService.image.medscapeLiveRegistrationUnavailableImage.alt
                "
                :title="
                  $uiService.image.medscapeLiveRegistrationUnavailableImage
                    .title
                "
                class="registration-unavailable__image"
              ></v-img>
            </v-col>
          </v-row>
          <v-row
            align="center"
            no-gutters
            class="mb-2 pt-2 flex-row"
            justify="center"
          >
            <v-col class="col-auto">
              <h2
                class="text-center text-sm-left"
                data-test="registration-unavailable__label"
              >
                {{
                  $uiService.registrationUnavailable
                    .registrationUnavailableLabel
                }}
              </h2>
            </v-col>
          </v-row>

          <v-row align="center" no-gutters class="pt-2" justify="center">
            <v-col class="col-auto">
              <h4
                class="text-center"
                data-test="registration-unavailable__message"
              >
                {{
                  $uiService.registrationUnavailable
                    .registrationUnavailableMessage
                }}
              </h4>
            </v-col>
          </v-row>
          <v-row align="center" class="flex-row" justify="center">
            <v-col>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
export default {
  data() {
    return {
      dialog: true
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.registration-unavailable__image {
  height: 70.83px !important;
  width: 70.83px !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: rgb(118, 118, 116) !important;
  color: rgb(255, 255, 255) !important;
}
</style>
