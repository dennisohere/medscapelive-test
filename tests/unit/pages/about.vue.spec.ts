import { type VueWrapper } from '@vue/test-utils'
import { createNuxtTestWrapper } from '../setup/create-wrapper'
import { UpdateHeaderCtaOptions } from '~/models/view/UpdateHeaderCtaOptions'
import { UPDATE_HEADER_CTA } from '~/core/constants/message-bus.constants'
import * as omniture from '@/core/global/omniture'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import About from "~/pages/about.vue";

describe('about.vue', () => {
  let wrapper: VueWrapper<typeof About>
  beforeEach(() => {
    wrapper = createNuxtTestWrapper(About, {
      stubs: ['HeroHeader']
    })
  })
  describe('mounted', () => {
    it(`emits (${UPDATE_HEADER_CTA}, { contact us, mailto:}) event`, async () => {
      let actualOptions: UpdateHeaderCtaOptions | undefined

      const { $bus } = useNuxtApp()

      $bus.$on('updateHeaderCta', (val: UpdateHeaderCtaOptions) => {
        actualOptions = val
      })

      wrapper = createNuxtTestWrapper(About, {
        mocks: {
          $bus: $bus
        }
      })

      // Act

      // Assert
      // await wrapper.vm.$nextTick()
      expect(actualOptions?.href).toEqual('mailto:events@medscapelive.com')
      expect(actualOptions?.text).toEqual('Contact Us')
    })
    it(`calls sendWmdPageview`, () => {
      vi.spyOn(omniture, 'sendWmdPageview')
      wrapper = createNuxtTestWrapper(About, {})

      // Act

      // Assert
      expect(omniture.sendWmdPageview).toHaveBeenCalled()
    })
  })
})
