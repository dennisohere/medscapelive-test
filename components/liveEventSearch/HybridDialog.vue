<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="auto"
    max-width="630px"
    class="hybrid-dialog"
  >
    <div class="hybrid-dialog-wrapper">
      <button class="back" @click="backHandler">
        <img
          :src="$uiService.image.hybridChevronIcon.src"
          :alt="$uiService.image.hybridChevronIcon.alt"
        />

        Back
      </button>

      <p class="dialog-heading">How will you be attending the event?</p>

      <div class="dialog-select-wrapper">
        <button
          class="dialog-select-item"
          :class="[selectedPresence === 'In-Person' ? 'active' : '']"
          data-option="In-Person"
          @click="updateEventPresence"
        >
          <img
            :src="$uiService.image.hybridInPersonGraphic.src"
            :alt="$uiService.image.hybridInPersonGraphic.alt"
          />

          <p>In-Person</p>
        </button>

        <button
          class="dialog-select-item"
          :class="[selectedPresence === 'Virtual' ? 'active' : '']"
          data-option="Virtual"
          @click="updateEventPresence"
        >
          <img
            :src="$uiService.image.hybridVirtualGraphic.src"
            :alt="$uiService.image.hybridVirtualGraphic.alt"
          />

          <p>Virtually</p>
        </button>
      </div>

      <button
        class="reg"
        :disabled="selectedPresence ? false : true"
        @click="completeRegHandler"
      >
        Complete Registration
      </button>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import LiveEvent from '~/models/LiveEvent'
import { EVENT_DIALOGUE } from '~/core/constants/message-bus.constants'

export default {
  name: 'HybridDialog',
  data() {
    return {
      liveEvent: {} as LiveEvent,
      dialog: false,
      selectedPresence: ''
    }
  },
  mounted() {
    this.$on('showHybridDialog', (liveEvent: LiveEvent) => {
      this.liveEvent = liveEvent
      this.dialog = true
    })
  },
  methods: {
    updateEventPresence(e) {
      this.selectedPresence = e.currentTarget.dataset.option
    },
    backHandler() {
      this.selectedPresence = ''
      this.dialog = false
      this.$emit(EVENT_DIALOGUE, this.liveEvent)
    },
    completeRegHandler() {
      const newProvisionalRegisterLink = `${this.liveEvent.provisionalRegisterLink}&joinPreference=${this.selectedPresence}`
      window.location.href = newProvisionalRegisterLink as string
    }
  }
}
</script>

<style lang="scss" scoped>
.hybrid-dialog-wrapper {
  background-color: #fff;
  border-radius: 6px;
  padding: 30px;
  font-family: 'ProximaNova', sans-serif;
  font-style: normal;
  line-height: normal;
  font-weight: 600;
  color: #161b1d;

  button.back {
    color: #064aa7;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  .dialog-heading {
    font-size: 24px;
    margin-top: 16px;
    line-height: 29.23px;
    font-weight: 600;
  }

  .dialog-select-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    align-self: stretch;
    margin-bottom: 16px;

    .dialog-select-item {
      display: flex;
      padding: 16px 20px;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      flex: 1 0 0;
      border-radius: 6px;
      border: 1px solid #c5ced3;

      p {
        margin: 0;
        font-size: 18px;
      }

      &.active {
        background-color: rgba(0, 124, 176, 0.05);
        border: 1px solid #064aa7;
      }
    }
  }

  button.reg {
    width: auto;
    padding: 12px 24px;
    border-radius: 50px;
    background-color: #064aa7;
    color: #e2e7e9;
    text-align: center;
    font-size: 16px;

    &:disabled {
      background-color: #6f8590;
    }
  }
}
</style>
