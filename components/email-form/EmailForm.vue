<template>
  <v-container class="email-form" fluid>
    <v-row justify="center" class="flex-column flex-sm-row">
      <v-col class="col-auto col-sm-6">
        <v-img
          background-position="center"
          contain
          :src="$uiService.image.medscapeLiveImage.src"
          :alt="$uiService.image.medscapeLiveImage.alt"
          :title="$uiService.image.medscapeLiveImage.title"
          class="email-form__image"
        />
      </v-col>
      <v-col class="col-auto col-sm-6">
        <v-row class="flex-column" no-gutters>
          <v-col class="col-auto">
            <h2 class="text-center text-sm-left email-form__title">
              {{ emailFormTitle }}
            </h2>
          </v-col>
          <v-col class="col-auto">
            <p class="email-form__description">
              {{ emailFormBody }}
            </p>
          </v-col>
          <v-col class="col-auto">
            <h3>{{ emailFormPrompt }}</h3>
          </v-col>
          <v-col class="col-auto">
            <v-form
              v-model="isFormValid"
              class="email-form__validator"
              @submit.prevent.native
              @keyup.native.enter="isFormValid && sendEmailForm($event)"
            >
              <v-text-field
                v-model="email"
                class="email-form__email-field"
                clearable
                :label="$uiService.emailForm.textFieldLabel"
                :rules="[validateEmail]"
                :placeholder="$uiService.label.email"
                data-test="email-form__email-field"
              >
              </v-text-field>

              <v-row
                v-if="isFailure"
                align="center"
                class="mb-4 yellow-background"
                no-gutters
              >
                <v-col v-if="errorIcon.src" class="pl-3">
                  <v-img
                    contain
                    :src="errorIcon.src"
                    :alt="errorIcon.alt"
                    width="40px"
                    height="40px"
                  />
                </v-col>
                <v-col class="pa-4 col-8">
                  <v-label
                    class="email-form__redirect-message"
                    data-test="email-form__redirect-message"
                  >
                    {{ errorMessage }}
                  </v-label>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <v-btn
                    :href="errorLink"
                    text
                    class="btn-white"
                    data-test="email-form__support-button"
                    @click="logUserAction($event, errorCta)"
                  >
                    {{ errorCta }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn
                class="btn-dark-blue"
                data-test="email-form__check-in-button"
                :disabled="!isFormValid"
                :loading="isLoading"
                @click="sendEmailForm"
                >{{ $uiService.emailForm.buttonText }}</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { EMAIL_REGEX } from '@/core/constants/Regex.constants'
import { type ImgAttribute } from '~/models/view/ImgAttribute'

export default {
  data() {
    return {
      email: '',
      isLoading: false,
      isFailure: false,
      isFormValid: false,
      emailFormTitle: '',
      emailFormBody: '',
      emailFormPrompt: '',
      errorMessage: '',
      errorCta: '',
      errorLink: '',
      errorIcon: {} as ImgAttribute
    }
  },
  methods: {
    validateEmail(email: string) {
      if (EMAIL_REGEX.test(email)) {
        return true
      }
      return this.$uiService.error.invalidEmailAddress
    },
    sendEmailForm() {}
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';
.email-form__description,
.email-form__title {
  white-space: pre-line;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .email-form__image {
    height: 120px !important;
  }
}

@media #{map-get($display-breakpoints, 'sm-only')} {
  .email-form__image {
    height: 150px !important;
  }
}

@media #{map-get($display-breakpoints, 'md-only')} {
  .email-form__image {
    height: 210px !important;
  }
}

@media #{map-get($display-breakpoints, 'lg-and-up')} {
  .email-form__image {
    height: 280px !important;
  }
}
</style>
