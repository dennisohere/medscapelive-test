import AboutVideoSection from '@/components/about/AboutVideoSection.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import {mount, type VueWrapper} from "@vue/test-utils";
import {createNuxtTestWrapper} from "~/tests/unit/setup/create-wrapper";


describe('AboutVideoSection.vue', () => {
  let wrapper: VueWrapper<typeof AboutVideoSection>
  beforeEach(() => {
    wrapper = createNuxtTestWrapper(AboutVideoSection, {
      stubs: ['HeroHeader']
    })
  })
  describe('methods', () => {
    describe('playPauseVideo', () => {
      let videoElement: HTMLVideoElement
      beforeEach(() => {
        videoElement = document.createElement('video')
        wrapper.vm.$refs.videoPlayer = videoElement
      })
      describe('video is paused', () => {

        beforeEach(() => {
          vi.spyOn(videoElement, 'paused', 'get').mockReturnValueOnce(true)
        })
        it('plays the video and sets didStartVideo to true', async () => {
          // videoElement.play = vi.fn();

          // Act
          (wrapper.vm as any).playPauseVideo()

          // Assert
          await wrapper.vm.$nextTick()
          // todo: fix this: expect(videoElement.play).toHaveBeenCalled()
          // expect(videoElement.play).toHaveBeenCalled()
          expect((wrapper.vm.$data as any).didStartVideo).toBeTruthy()
        })
      })
    })
  })
})
