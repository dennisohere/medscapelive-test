<template>
  <section class="section_msl-app-download">
    <div class="msl-app-download_wrapper">
      <h3>Get the NEW Medscape LIVE App</h3>

      <div class="msl-app-download_grid">
        <div class="msl-app-download_column">
          <p class="msl-app-download_column-heading">Scan to get the app:</p>
          <v-img
            :src="qrCode"
            alt="Medscape LIVE App Download QR Code"
            class="msl-app-download_qr-code"
          ></v-img>
        </div>

        <div class="msl-app-download_column-divider"></div>

        <div class="msl-app-download_column">
          <p class="msl-app-download_column-heading">Benefits:</p>

          <ul>
            <li v-for="(feature, index) in features" :key="index">
              <v-img
                :src="$uiService.image.circleCheckIcon.src"
                :alt="$uiService.image.circleCheckIcon.title"
                role="presentation"
                class="msl-app-download_feature-icon"
              />

              <p>{{ feature.name }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MedscapeLiveGetApp',
  data() {
    return {
      qrCode: this.$config.MEDSCAPE_LIVE_APP_DOWNLOAD_QR_CODE,
      features: [
        { name: 'Access to slides after the event' },
        { name: 'Earn credit' },
        { name: 'Event notifications' },
        { name: 'Note-taking' },
        { name: 'Join events on app' },
        { name: '...And more' }
      ]
    }
  }
}
</script>

<style lang="scss">
.section_msl-app-download {
  .msl-app-download_wrapper {
    h3 {
      text-align: center;
      font-size: 22px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .msl-app-download_grid {
      display: grid;
      grid-template-columns: 0.75fr 1px 1.25fr;
      grid-auto-rows: 1fr;
      gap: 72px;

      margin-top: 60px;

      .msl-app-download_column {
        .msl-app-download_column-heading {
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          margin-bottom: 15px;
        }

        .msl-app-download_qr-code {
          width: 170px;
          height: 170px;
          mix-blend-mode: multiply;
          margin-top: -10px;
          margin-left: -4px;
        }

        ul {
          padding: 0;
          list-style-type: none;

          li {
            display: flex;
            align-items: center;
            margin-bottom: 16px;

            &:last-child {
              margin-bottom: 0;
            }

            .v-responsive.v-image.msl-app-download_feature-icon {
              max-width: 24px;
              max-height: 24px;
              margin-right: 20px;
            }

            p {
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              margin: 0;
            }
          }
        }
      }

      .msl-app-download_column-divider {
        background-color: #c5ced3;
      }
    }
  }
}

@media screen and (max-width: 45em) {
  .section_msl-app-download {
    display: none;
  }
}
</style>
