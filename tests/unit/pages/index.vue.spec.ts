import { createNuxtTestWrapper } from '../setup/create-wrapper'

import Home from '@/pages/index.vue'
import * as act from '~/store/liveEventSearch/constants/liveEventSearch.action-types'
import LiveEvent from '~/models/LiveEvent'
import { UPDATE_HEADER_CTA } from '~/core/constants/message-bus.constants'
import { UpdateHeaderCtaOptions } from '~/models/view/UpdateHeaderCtaOptions'
import * as omniture from '~/core/global/omniture'
import type {StoreConfig} from "~/tests/unit/setup/create-store";
import { describe, it, expect, vi, beforeEach } from 'vitest'
import {createMockedStoreConfig, createStore} from "~/tests/unit/setup/create-store";


describe('index.vue', () => {
  let mockedStoreConfig: StoreConfig
  beforeEach(() => {
    mockedStoreConfig = createMockedStoreConfig()
  })
  describe('mounted', () => {
    it(`emits (${UPDATE_HEADER_CTA}, { /about, About MedscapeLive}) event`, async () => {
      const wrapper = createNuxtTestWrapper(Home, {})

      let actualOptions: UpdateHeaderCtaOptions | undefined
      const emitter = wrapper.vm;

      emitter.$on('updateHeaderCta', (val: UpdateHeaderCtaOptions) => {
        actualOptions = val
      })

      // Act

      // Assert
      await wrapper.vm.$nextTick()
      expect(actualOptions?.href).toEqual('/about')
      expect(actualOptions?.text).toEqual('About MedscapeLIVE!')
    })
    it(`calls sendWmdPageview`, () => {
      vi.spyOn(omniture, 'sendWmdPageview')
      createNuxtTestWrapper(Home, {})

      // Act

      // Assert
      expect(omniture.sendWmdPageview).toHaveBeenCalled()
    })
  })
  describe('middleware', () => {
    it(`gets the upcoming events`, async () => {
      const mockgetUpcomingEvents = vi.fn()
      mockedStoreConfig.modules.liveEventSearch.actions![
        act.searchUpcomingLiveEvents
      ] = mockgetUpcomingEvents
      const store = createStore(mockedStoreConfig)
      const wrapper = createNuxtTestWrapper(Home, {
        store
      })
      if (
        !wrapper.vm.$options.middleware ||
        typeof wrapper.vm.$options.middleware !== 'function'
      )
        throw new Error('middleware is not a function')

      // Act
      await wrapper.vm.$options.middleware({ store } as any, () => {})

      // Assert
      await wrapper.vm.$nextTick()
      expect(mockgetUpcomingEvents).toHaveBeenCalled()
    })
  })
  describe('upcomingEventsCarousel', () => {
    const upcomingEventsCarouselSelector =
      '[data-test=upcoming-events__live-event-carousel]'
    it('binds liveEvents', () => {
      const upcomingLiveEvents = [new LiveEvent(), new LiveEvent()]
      mockedStoreConfig.modules.liveEventSearch.state.upcoming.liveEvents = upcomingLiveEvents

      const wrapper = createNuxtTestWrapper(Home, {
        store: createStore(mockedStoreConfig)
      }) as any
      // Act
      const upcomingEventsCarousel = wrapper.find(
        upcomingEventsCarouselSelector
      )

      // Assert
      expect(upcomingEventsCarousel.vm.$props.liveEvents).toEqual(
        upcomingLiveEvents
      )
    })
  })
})
