import dayjs from 'dayjs'
import { getLocalTimeZoneString } from '@/tests/utility/timezoneUtility'
import { createNuxtTestWrapper } from '../../../setup/create-wrapper'
import RegistrationConfirmation from '@/components/registration/confirmation/RegistrationConfirmation.vue'
import LiveEventRestService from '~/services/networking/live-events/LiveEventRestService'
import LiveEvent from '~/models/LiveEvent'
import {CHECK_IN_PATH, EVENTS, HOME} from '@/core/constants/router-paths'
import type {VueWrapper} from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type {AxiosInstance} from "axios";

const joinVirtualEventButtonSelector = '[data-test="registration_confirm-button"]'
const checkEmailText = '[data-test=registration_confirm-prejoin-text]'


describe('RegistrationConfirmation', () => {
  let wrapper: VueWrapper<typeof RegistrationConfirmation>

  beforeEach(() => {
    wrapper = createNuxtTestWrapper(RegistrationConfirmation, {
      attachTo: document.body
    })
  })

  describe('html', () => {
    describe('join event button', () => {
      it('verify button click ', async () => {
        const target = new EventTarget()
        const mouseEvent = ({
          target
        } as unknown) as MouseEvent

        const route = useRoute();
        const liveEventId = route?.query?.liveEventId
        const checkInUrl = `${CHECK_IN_PATH}${liveEventId}`

        const joinVirtualEventButton = wrapper.find(
          joinVirtualEventButtonSelector
        )

        if (joinVirtualEventButton) {
          // console.log('joinVirtualEventButton--', joinVirtualEventButton.element)

          // Act
          // await joinVirtualEventButton.trigger('click')
          await wrapper.vm.joinVirtualEvent()

          // Assert
          await wrapper.vm.$nextTick()

          expect(wrapper.vm.$route.path).toEqual(checkInUrl)
        }
      })
    })

    it('Registration image attributes ', () => {
      const registrationImageSelector =
        '[data-test=registration-confirmation__image]'

      const {$uiService} = useNuxtApp();

      console.log('uiService', $uiService)

      const googleImage = wrapper.getComponent(registrationImageSelector)

      expect(googleImage.props().src).toEqual(
        $uiService.image.brandlessEnvelopeImage.src
      )

      expect(googleImage.vm.$props.alt).toEqual(
        $uiService.image.brandlessEnvelopeImage.alt
      )
    })
    it('sets the text for the add to calendar label', () => {
      const selector = '[data-test=add-to-calendar__label]'

      // Act
      const registrationLabel = wrapper.find(selector)

      // Assert
      expect(registrationLabel.text()).toEqual('Add to Calendar')
    })
    it('sets text for registration confirmation label', () => {
      const selector = '[data-test=registration-confirmation__label]'

      // Act
      const confirmationLabel = wrapper.find(selector)

      // Assert
      expect(confirmationLabel.text()).toEqual('You are now registered')
    })
  })
  describe('mounted', () => {
    describe('liveEventId in query', () => {
      const liveEventId = '54968'
      const path = HOME
      const query = {
        liveEventId
      }
      const { $router } = useNuxtApp();

      beforeEach(async () => {
        await $router.push({
          path,
          query
        })
      })
      afterEach(async () => {
        await $router.push('/other-route')
      })

      it('No liveEventId in query', async () => {
        await $router.push('/other-route')

        expect(wrapper.vm.$data.dialog).toEqual(false)

        wrapper.vm.$router.push({
          path,
          query
        })
      })
      it('gets the event details', async () => {
        const mockLiveEventService = new LiveEventRestService(
          {} as AxiosInstance
        )
        mockLiveEventService.getEventMetadata = vi.fn().mockResolvedValue({})

        // Act
        const wrapper = createNuxtTestWrapper(RegistrationConfirmation, {
          $liveEventService: mockLiveEventService
        })

        // Assert
        await wrapper.vm.$nextTick()
        expect(
          wrapper.vm.$liveEventService.getEventMetadata
        ).toHaveBeenCalledWith(liveEventId)
        expect(wrapper.vm.$data.dialog).toEqual(true)
      })

      // describe('get event details success', () => {
      //   let event: LiveEvent
      //   beforeEach(async () => {
      //     event = new LiveEvent({
      //       title: 'Medscape Live Conference',
      //       date: 'September 14, 2020',
      //       startDate: '2020-09-14T19:30:00-05:00',
      //       location: 'New York,New York'
      //     })
      //
      //     const mockLiveEventService = new LiveEventRestService({} as AxiosInstance)
      //     mockLiveEventService.getEventMetadata = vi.fn().mockResolvedValue(event)
      //
      //     wrapper = createNuxtTestWrapper(RegistrationConfirmation, {
      //       $liveEventService: mockLiveEventService
      //     })
      //   })
      //   it('renders the event date', async () => {
      //     const dateLabelSelector =
      //       '[data-test=registration-confirmation__event-date]'
      //     const timeLabelSelector =
      //       '[data-test=registration-confirmation__event-time]'
      //
      //     const startDate = dayjs(event.startDate).format('MMMM D, YYYY')
      //     const startTime = getLocalTimeZoneString(
      //       dayjs(event.startDate).format('h:mm A'),
      //       event.startDate
      //     )
      //
      //     // Act
      //     await wrapper.vm.$nextTick()
      //     await wrapper.vm.$nextTick()
      //
      //     // Assert
      //     expect(wrapper.find(dateLabelSelector).text()).toEqual(startDate)
      //     expect(wrapper.find(timeLabelSelector).text()).toEqual(startTime)
      //   })
      //   it('renders the event title', async () => {
      //     const titleLabelSelector =
      //       '[data-test=registration-confirmation__event-title]'
      //
      //     // Act
      //     await wrapper.vm.$nextTick()
      //     await wrapper.vm.$nextTick()
      //
      //     // Assert
      //     expect(wrapper.find(titleLabelSelector).text()).toEqual(event.title)
      //   })
      //   it('passes the event to the add to calendar component', async () => {
      //     const addToCalendarSelector = '[data-test=add-to-calendar__component]'
      //     // Act
      //     await wrapper.vm.$nextTick()
      //     await wrapper.vm.$nextTick()
      //     // Assert
      //     expect(wrapper.getComponent(addToCalendarSelector).vm.$props.event).toEqual(
      //       event
      //     )
      //   })
      //   describe('current time is more than 15 min before the event', () => {
      //     beforeEach(() => {
      //       event.startDate = dayjs()
      //         .add(16, 'minute')
      //         .format()
      //     })
      //     it('disables the join event button and sets the text to wait', async () => {
      //       // Act
      //       await wrapper.vm.$nextTick()
      //
      //       // Assert
      //       const joinVirtualEventtext = wrapper.find(checkEmailText)
      //
      //       expect(joinVirtualEventtext.text()).toEqual(
      //         'Check your email before the event to join!'
      //       )
      //     })
      //   })
      //   describe('current time is less than 15 min before the event', () => {
      //     beforeEach(() => {
      //       event.startDate = dayjs()
      //         .add(14, 'minute')
      //         .format()
      //     })
      //     it('enables the join event button and sets the text to join', async () => {
      //       const joinVirtualEventButton = wrapper.find(
      //         joinVirtualEventButtonSelector
      //       )
      //
      //       // Act
      //       await wrapper.vm.$nextTick()
      //
      //       // Assert
      //       expect(joinVirtualEventButton.text()).toEqual('Join Event')
      //     })
      //   })
      //   describe('current time is after the start of the event', () => {
      //     beforeEach(() => {
      //       event.startDate = dayjs()
      //         .subtract(15, 'minute')
      //         .format()
      //     })
      //     it('enables the join event button and sets the text to join', async () => {
      //       const joinVirtualEventButton = wrapper.find(
      //         joinVirtualEventButtonSelector
      //       )
      //
      //       // Act
      //       await wrapper.vm.$nextTick()
      //
      //       // Assert
      //       expect(joinVirtualEventButton.text()).toEqual('Join Event')
      //     })
      //   })
      // })
    })
  })

  describe('computed', () => {
    it('joinEventLabel', () => {
      const wrapper = createNuxtTestWrapper(RegistrationConfirmation) as any
      const {$uiService} = useNuxtApp();


      const actualResult = wrapper.vm.joinEventLabel
      expect(actualResult).toEqual(
        $uiService.registrationConfirmation.preJoinEventLabel
      )
    })
  })

  describe('methods', () => {
    it('joinVirtualEvent', async () => {
      const wrapper = createNuxtTestWrapper(RegistrationConfirmation) as any
      const route = useRoute();
      const liveEventId = route?.query?.liveEventId
      const checkInUrl = `${CHECK_IN_PATH}${liveEventId}`

      await wrapper.vm.joinVirtualEvent()

      await wrapper.vm.$nextTick()
      expect(wrapper.vm.$route.path).toEqual(checkInUrl)
    })
  })
})
