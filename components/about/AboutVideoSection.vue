<template>
  <v-container fluid class="px-0">
    <v-row>
      <v-col class="about-video__info pr-sm-12" cols="12" sm="5">
        <h2 class="text-sm-left text-center px-sm-0 px-12 mb-lg-7 mb-4">
          {{ $uiService.about.videoHeader }}
        </h2>
        <p class="px-10 px-sm-0 mb-lg-6 mb-4">
          {{ $uiService.about.videoBody }}
        </p>
        <v-row class="about-video__info-list-justify">
          <ul class="about-video__info-list text-left">
            <li v-for="i in $uiService.about.videoBulletPoints" :key="i">
              {{ i }}
            </li>
          </ul>
        </v-row>
      </v-col>
      <v-col class="about-video__video-container" cols="12" offset="12" sm="7">
        <div class="video-wrapper">
          <video
            :ref="VIDEO_PLAYER"
            class="about-video__video"
            preload="metadata"
            playsinline
            :controls="didStartVideo"
            :poster="$uiService.about.videoPoster"
          >
            <source :src="$uiService.about.videoFile" type="video/mp4" />
            <p>{{ $uiService.error.videoPlayerNotSupported }}</p>
          </video>
          <div
            v-show="!didStartVideo"
            ref="videoPlayButtonIcon"
            class="about-video__play-button"
            @click="playPauseVideo()"
          >
            <v-container
              fluid
              class="about-video__play-icon-container justify-center fill-height"
            >
              <v-icon class="about-video__play-icon" ma-0 color="white"
                >mdi-play-circle-outline</v-icon
              >
            </v-container>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { VIDEO_PLAYER } from '@/core/constants/component-refs'

export default {
  name: 'About',
  data() {
    return {
      VIDEO_PLAYER,
      didStartVideo: false
    }
  },
  methods: {
    playPauseVideo() {
      const player = this.$refs[VIDEO_PLAYER]
      if (player instanceof HTMLVideoElement && player.paused) {
        player.play()
        this.didStartVideo = true
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';

.about-video__info-list {
  list-style: none;
  font-weight: bold;
}
.about-video__info-list li {
  margin-bottom: 4px;
  font-size: 18px;
}
.about-video__info-list li::before {
  content: '\2022';
  display: inline-block;
  color: #005b81;
  font-weight: bold;
  width: 1em;
  margin-left: -1em;
}
.about-video__video {
  width: 100% !important;
  height: auto !important;
}
.video-wrapper {
  display: table;
  width: auto;
  position: relative;
}
.about-video__play-button {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  margin: auto;
  background-size: contain;
  background-position: center;
}
.about-video__play-icon.v-icon {
  font-size: 44px;
}

@media #{map-get($display-breakpoints, 'xs-only')} {
  .about-video__video-container {
    order: 13;
  }
  .about-video__info {
    order: -1;
  }
  .about-video__info-list-justify {
    justify-content: center !important;
  }
}
@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .about-video__video-container {
    order: -1;
  }
  .about-video__info {
    order: 13;
  }
  .about-video__info-list-justify {
    justify-content: left !important;
  }
}
@media #{map-get($display-breakpoints, 'md-only')} {
  .about-video__play-icon.v-icon {
    font-size: 56px;
  }
}
@media #{map-get($display-breakpoints, 'lg-only')} {
  .about-video__play-icon.v-icon {
    font-size: 88px;
  }
}
</style>
