import dayjs from 'dayjs'
import { getLocalTimeZoneString } from '@/tests/utility/timezoneUtility'
import { createNuxtTestWrapper } from '../../../setup/create-wrapper'
import {
  guestProfileMetaResponse,
  loginProfileMetaResponse
} from './mocks/profile.meta'
import {
  mockWindowLocation,
  unmockWindowLocation
} from '~/tests/unit/setup/mock-window-location'
import { EventCheckIn } from '~/models/EventCheckIn'
import LiveEventRestService from '~/services/networking/live-events/LiveEventRestService'
import LiveEvent from '~/models/LiveEvent'
import VirtualEventCheckIn from '@/components/email-form/check-in/VirtualEventCheckIn.vue'
import type {VueWrapper} from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type {AxiosInstance} from "axios";


describe('VirtualEventCheckIn', () => {
  let wrapper: VueWrapper<typeof VirtualEventCheckIn>
  const { $router } = useNuxtApp();

  beforeEach(() => {
    wrapper = createNuxtTestWrapper(VirtualEventCheckIn)
    mockWindowLocation()
  })
  afterEach(() => {
    unmockWindowLocation()
  })

  describe('mounted', () => {
    describe('liveEventId in param', () => {
      const liveEventId = 'yomommasid'
      beforeEach( async () => {
        await $router.push({
          name: 'checkinRoute',
          params: { liveEventId },
        })
      })
      afterEach( async () => {
         await $router.push('/other-route')
      })

      describe('PageMetadata available in session', () => {
        describe('User is fully logged in', () => {
          beforeEach(() => {
            ;(window as any).PageMetadata = loginProfileMetaResponse
            wrapper = createNuxtTestWrapper(VirtualEventCheckIn, {})
          })
          it(' populate email address ', () => {
            expect(wrapper.vm.$data.email).toEqual(
              loginProfileMetaResponse.addProfile.email
            )
          })
        })

        describe('User is Guest', () => {
          beforeEach(() => {
            ;(window as any).PageMetadata = guestProfileMetaResponse
            wrapper = createNuxtTestWrapper(VirtualEventCheckIn)
          })
          it(' wont populate email address ', () => {
            expect(wrapper.vm.$data.email).toEqual('')
          })
        })
      })

      describe('PageMetadata not available in session', () => {
        beforeEach(() => {
          ;(window as any).PageMetadata = {}
          wrapper = createNuxtTestWrapper(VirtualEventCheckIn)
        })
        it(' wont populate email address ', () => {
          expect(wrapper.vm.$data.email).toEqual('')
        })
      })
      it('gets the event details', async () => {
        const mockLiveEventService = new LiveEventRestService(
          {} as AxiosInstance
        )

        const event: LiveEvent[] = [
          new LiveEvent({
            title: 'yomommmas title'
          })
        ]

        mockLiveEventService.getEventMetadataFromDb = vi.fn().mockResolvedValue(event)

        mockLiveEventService.getEventMetadata = vi.fn().mockResolvedValue({})

        // Act
        const wrapper = createNuxtTestWrapper(VirtualEventCheckIn, {
          $liveEventService: mockLiveEventService,
          $router
        })

        // Assert
        await wrapper.vm.$nextTick()

        expect(
          wrapper.vm.$liveEventService.getEventMetadataFromDb
        ).toHaveBeenCalledWith(liveEventId, true)
        expect(wrapper.vm.$liveEventService.getEventMetadata).not.toBeCalled()
      })
      describe('get event details success', () => {
        describe('When event has title', () => {
          it('Event title is set from title property', async () => {
            const event: LiveEvent[] = [
              new LiveEvent({
                title: 'yomommmas title'
              })
            ]
            const mockLiveEventService = new LiveEventRestService(
              {} as AxiosInstance
            )
            mockLiveEventService.getEventMetadataFromDb = vi.fn().mockResolvedValue(event)

            mockLiveEventService.getEventMetadata = vi.fn().mockResolvedValue({})

            // Act
            const wrapper = createNuxtTestWrapper(VirtualEventCheckIn, {
              $liveEventService: mockLiveEventService
            })

            // Assert
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick()

            expect(
              wrapper.vm.$liveEventService.getEventMetadataFromDb
            ).toHaveBeenCalledWith(liveEventId, true)
            expect(
              wrapper.vm.$liveEventService.getEventMetadata
            ).not.toBeCalled()
            expect(wrapper.vm.$data.eventTitle).toEqual(event[0].title)
          })
        })

        describe('Event location is available', () => {
          it('Event Location set from location property', async () => {
            const event: LiveEvent[] = [
              new LiveEvent({
                title: 'yomommmas title',
                location: 'yomommas location'
              })
            ]

            const expectedEventLocation = `${event[0].location}`
            const mockLiveEventService = new LiveEventRestService(
              {} as AxiosInstance
            )
            mockLiveEventService.getEventMetadataFromDb = vi.fn().mockResolvedValue(event)

            mockLiveEventService.getEventMetadata = vi.fn().mockResolvedValue({})

            // Act
            const wrapper = createNuxtTestWrapper(VirtualEventCheckIn, {
              $liveEventService: mockLiveEventService
            })

            // Assert
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick()
            expect(
              wrapper.vm.$liveEventService.getEventMetadataFromDb
            ).toHaveBeenCalledWith(liveEventId, true)
            expect(
              wrapper.vm.$liveEventService.getEventMetadata
            ).not.toBeCalled()
            expect(wrapper.vm.$data.eventLocation).toEqual(
              expectedEventLocation
            )
          })
        })

        describe('When event date is availalbe', () => {
          it('Event date time is set from date and start date time', async () => {
            const event: LiveEvent[] = [
              new LiveEvent({
                title: 'yomommmas title',
                date: 'May 28, 2021',
                startDate: '2021-05-28T06:15:00-05:00'
              })
            ]
            const expectedEventDateTime =
              'May 28, 2021 ' +
              getLocalTimeZoneString(
                dayjs(event[0].startDate).format('h:mm A'),
                event[0].startDate
              )
            const mockLiveEventService = new LiveEventRestService({} as AxiosInstance)
            mockLiveEventService.getEventMetadataFromDb = vi
              .fn()
              .mockResolvedValue(event)

            mockLiveEventService.getEventMetadata = vi
              .fn()
              .mockResolvedValue({})

            // Act
            const wrapper = createNuxtTestWrapper(VirtualEventCheckIn, {
              $liveEventService: mockLiveEventService
            })

            // Assert
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick()

            console.log('date', wrapper.vm.$data, 'expected', expectedEventDateTime)

            expect(
              wrapper.vm.$liveEventService.getEventMetadataFromDb
            ).toHaveBeenCalledWith(liveEventId, true)
            expect(
              wrapper.vm.$liveEventService.getEventMetadata
            ).not.toBeCalled()
            expect(wrapper.vm.$data.eventDateTime).toEqual(
              expectedEventDateTime
            )
          })
        })

        describe('When Sql service does not return data', () => {
          it('Gets the data from Live event service', async () => {
            const mockLiveEventService = new LiveEventRestService(
              {} as AxiosInstance
            )
            mockLiveEventService.getEventMetadataFromDb = vi
              .fn()
              .mockResolvedValue([])

            mockLiveEventService.getEventMetadata = vi
              .fn()
              .mockResolvedValue({})

            // Act
            const wrapper = createNuxtTestWrapper(VirtualEventCheckIn, {
              $liveEventService: mockLiveEventService
            })

            // Assert
            await wrapper.vm.$nextTick()

            expect(
              wrapper.vm.$liveEventService.getEventMetadataFromDb
            ).toHaveBeenCalledWith(liveEventId, true)
            expect(
              wrapper.vm.$liveEventService.getEventMetadata
            ).toHaveBeenCalledWith(liveEventId)
          })

          describe('When the event is a Connect event', () => {
            describe('When end date is in the future', () => {
              it('Allows check-in to the event', async () => {
                const event: LiveEvent = new LiveEvent({
                  title: 'Connect Event 1',
                  date: 'May 28, 2030',
                  startDate: '2030-05-28T06:15:00-05:00',
                  endDate: '2030-05-28T06:15:30-05:00',
                  virtualEventPlatform: 'Medscape'
                })

                const mockLiveEventService = new LiveEventRestService(
                  {} as AxiosInstance
                )
                mockLiveEventService.getEventMetadataFromDb = vi
                  .fn()
                  .mockResolvedValue([])

                mockLiveEventService.getEventMetadata = vi
                  .fn()
                  .mockResolvedValue(event)

                // Act
                const wrapper = createNuxtTestWrapper(VirtualEventCheckIn, {
                    $liveEventService: mockLiveEventService
                  }
                )

                // Assert
                await wrapper.vm.$nextTick()
                await wrapper.vm.$nextTick()
                await wrapper.vm.$nextTick()

                expect(
                  wrapper.vm.$liveEventService.getEventMetadataFromDb
                ).toHaveBeenCalledWith(liveEventId, true)
                expect(
                  wrapper.vm.$liveEventService.getEventMetadata
                ).toHaveBeenCalledWith(liveEventId)
                expect(wrapper.vm.$data.eventEnded).toEqual(false)
              })
            })

            describe('When end date is in the past', () => {
              it('Disallows check-in to the event as per the end date', async () => {
                const event: LiveEvent = new LiveEvent({
                  title: 'Connect Event 1',
                  date: 'May 28, 2020',
                  startDate: '2020-05-28T06:15:00-05:00',
                  endDate: '2020-05-28T06:15:30-05:00',
                  virtualEventPlatform: 'Medscape'
                })

                const mockLiveEventService = new LiveEventRestService({} as AxiosInstance)
                mockLiveEventService.getEventMetadataFromDb = vi.fn().mockResolvedValue([])

                mockLiveEventService.getEventMetadata = vi
                  .fn()
                  .mockResolvedValue(event)

                // Act
                const wrapper = createNuxtTestWrapper(
                  VirtualEventCheckIn,
                  {
                    $liveEventService: mockLiveEventService
                  }
                )

                // Assert
                await wrapper.vm.$nextTick()
                await wrapper.vm.$nextTick()
                await wrapper.vm.$nextTick()

                expect(
                  wrapper.vm.$liveEventService.getEventMetadataFromDb
                ).toHaveBeenCalledWith(liveEventId, true)
                expect(
                  wrapper.vm.$liveEventService.getEventMetadata
                ).toHaveBeenCalledWith(liveEventId)
                expect(wrapper.vm.$data.eventEnded).toEqual(true)
              })
            })
          })
        })

        describe('When Sql service throws exception', () => {
          it('Gets the data from Live event service', async () => {
            const sqlServiceError = { errorMessage: 'Server error.' }
            const mockLiveEventService = new LiveEventRestService(
              {} as AxiosInstance
            )
            mockLiveEventService.getEventMetadataFromDb = vi
              .fn()
              .mockRejectedValue(sqlServiceError)

            mockLiveEventService.getEventMetadata = vi
              .fn()
              .mockResolvedValue({})

            // Act
            const wrapper = createNuxtTestWrapper(VirtualEventCheckIn, {
              $liveEventService: mockLiveEventService
            })

            // Assert
            await wrapper.vm.$nextTick()

            expect(
              wrapper.vm.$liveEventService.getEventMetadataFromDb
            ).toHaveBeenCalledWith(liveEventId, true)
            expect(
              wrapper.vm.$liveEventService.getEventMetadata
            ).toHaveBeenCalledWith(liveEventId)
          })
        })
      })
    })
  })
  describe('methods', () => {
    describe('sendEmailForm', () => {
      it('sets isFailure to false', () => {
        wrapper.vm.$data.isFailure = true;

        // Act
        (wrapper.vm as any).sendEmailForm()

        // Assert
        expect(wrapper.vm.$data.isFailure).toEqual(false)
      })
      describe('liveEventId in param', () => {
        const liveEventId = 'yomommasid'
        const expectedEmail = 'yo@mommas.com'
        beforeEach(async () => {
          await $router.push({
            name: 'checkinRoute',
            params: { liveEventId }
          })
        })
        afterEach(async () => {
          await $router.push('/other-route')
        })
        describe('email is set', () => {
          beforeEach(() => {
            wrapper.vm.$data.email = expectedEmail
          })
          it('sets isLoading to true and calls checkInToVirtualEvent with email and liveEventId', async () => {
            wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
              .fn()
              .mockResolvedValue(new EventCheckIn(true, false, false, '', ''))

            wrapper.vm.$data.email = expectedEmail
            await wrapper.vm.$nextTick()

            // Act
            await (wrapper.vm as any).sendEmailForm()

            // Assert
            await wrapper.vm.$nextTick()
            expect(
              wrapper.vm.$liveEventService.checkInToVirtualEvent
            ).toHaveBeenCalledWith(liveEventId, expectedEmail)
          })
          describe('successful checkin API call', () => {
            describe('user is registered', () => {
              const isRegistered = true
              const isP2PEvent = false
              const isInternal = true
              const expectedCheckin = new EventCheckIn(
                isRegistered,
                isP2PEvent,
                isInternal,
                'yomommas.redirect.url',
                'messsage'
              )
              beforeEach(() => {
                wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                  .fn()
                  .mockResolvedValue(expectedCheckin)
              })

              it('redirects the user to the to checkin URL and isLoading, pageLoading remains true', async () => {
                wrapper.vm.$data.isLoading = false
                wrapper.vm.$data.pageLoading = true

                // Act
                await (wrapper.vm as any).sendEmailForm()

                // Assert
                await wrapper.vm.$nextTick()
                expect(window.location.assign).toHaveBeenLastCalledWith(
                  expectedCheckin.url
                )
                expect(wrapper.vm.$data.isLoading).toEqual(true)
                expect(wrapper.vm.$data.pageLoading).toEqual(true)
              })
            })
            describe('user is not registered', () => {
              const isRegistered = false
              const isInternal = false
              const isP2PEvent = false
              const expectedCheckin = new EventCheckIn(
                isRegistered,
                isP2PEvent,
                isInternal,
                'yomommas.redirect.url',
                'messsage'
              )
              beforeEach(() => {
                wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                  .fn()
                  .mockResolvedValue(expectedCheckin)
              })

              it('sets isLoading = false, isFailure = true, pageLoading = false', async () => {
                wrapper.vm.$data.isFailure = false
                wrapper.vm.$data.pageLoading = true

                // Act
                await (wrapper.vm as any).sendEmailForm()

                // Assert
                await wrapper.vm.$nextTick()
                expect(wrapper.vm.$data.isLoading).toEqual(false)
                expect(wrapper.vm.$data.isFailure).toEqual(true)
                expect(wrapper.vm.$data.pageLoading).toEqual(false)
              })
            })

            describe('When event ended flag is true', () => {
              const internalEvent = true
              const externalEvent = false
              const eventEnded = true

              describe('When event is a Connect event', () => {
                it('Displays event ended message', async () => {
                  // Arrange
                  const isRegistered = true
                  const isInternal = internalEvent
                  const isP2PEvent = false
                  const expectedCheckin = new EventCheckIn(
                    isRegistered,
                    isP2PEvent,
                    isInternal,
                    'yomommas.redirect.url',
                    'messsage',
                    undefined,
                    undefined,
                    undefined,
                    eventEnded
                  )

                  wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                    .fn()
                    .mockResolvedValue(expectedCheckin)

                  wrapper.vm.$data.eventPresence = 'Virtual'
                  wrapper.vm.$data.virtualEventPlatform = 'Medscape'

                  // Act
                  await (wrapper.vm as any).sendEmailForm()

                  // Assert
                  await wrapper.vm.$nextTick()
                  expect(wrapper.vm.$data.isLoading).toEqual(true)
                  expect(wrapper.vm.$data.isFailure).toEqual(false)
                  expect(wrapper.vm.$data.pageLoading).toEqual(false)
                  expect(wrapper.vm.$data.eventEnded).toEqual(true)
                  expect(wrapper.vm.$data.isFormValid).toEqual(false)
                })
              })

              describe('When event is a Non-Connect event', () => {
                describe('When the user is registered', () => {
                  it('Redirects the user to the to checkin URL and isLoading, pageLoading remains true', async () => {
                    // Arrange
                    const isRegistered = true
                    const isInternal = externalEvent
                    const isP2PEvent = false
                    const expectedCheckin = new EventCheckIn(
                      isRegistered,
                      isP2PEvent,
                      isInternal,
                      'yomommas.redirect.url',
                      'messsage',
                      undefined,
                      undefined,
                      undefined,
                      eventEnded
                    )

                    wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                      .fn()
                      .mockResolvedValue(expectedCheckin)

                    wrapper.vm.$data.isFormValid = true
                    wrapper.vm.$data.isLoading = false
                    wrapper.vm.$data.pageLoading = true
                    wrapper.vm.$data.eventPresence = 'Virtual'
                    wrapper.vm.$data.virtualEventPlatform = 'Intrado'

                    // Act
                    await (wrapper.vm as any).sendEmailForm()

                    // Assert
                    await wrapper.vm.$nextTick()
                    expect(wrapper.vm.$data.isFailure).toEqual(false)
                    expect(wrapper.vm.$data.isLoading).toEqual(true)
                    expect(wrapper.vm.$data.pageLoading).toEqual(true)
                    expect(wrapper.vm.$data.eventEnded).toEqual(false)
                    expect(wrapper.vm.$data.isFormValid).toEqual(true)
                  })
                })

                describe('When the user is not registered', () => {
                  it('Sets isLoading = false, isFailure = true, pageLoading = false', async () => {
                    // Arrange
                    const isRegistered = false
                    const isInternal = externalEvent
                    const isP2PEvent = false
                    const expectedCheckin = new EventCheckIn(
                      isRegistered,
                      isP2PEvent,
                      isInternal,
                      'yomommas.redirect.url',
                      'messsage',
                      undefined,
                      undefined,
                      undefined,
                      eventEnded
                    )

                    wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                      .fn()
                      .mockResolvedValue(expectedCheckin)

                    wrapper.vm.$data.isFormValid = true
                    wrapper.vm.$data.isFailure = false
                    wrapper.vm.$data.pageLoading = true
                    wrapper.vm.$data.eventPresence = 'Virtual'
                    wrapper.vm.$data.virtualEventPlatform = 'Intrado'

                    // Act
                    await (wrapper.vm as any).sendEmailForm()

                    // Assert
                    await wrapper.vm.$nextTick()
                    expect(wrapper.vm.$data.isLoading).toEqual(false)
                    expect(wrapper.vm.$data.isFailure).toEqual(true)
                    expect(wrapper.vm.$data.pageLoading).toEqual(false)
                    expect(wrapper.vm.$data.eventEnded).toEqual(false)
                    expect(wrapper.vm.$data.isFormValid).toEqual(true)
                  })
                })
              })
            })

            describe('When event ended flag is false', () => {
              const internalEvent = true
              const externalEvent = false
              const eventNotEnded = false
              describe('When event is a Connect event', () => {
                it('Takes user to the event', async () => {
                  // Arrange
                  const isRegistered = true
                  const isInternal = internalEvent
                  const isP2PEvent = false
                  const expectedCheckin = new EventCheckIn(
                    isRegistered,
                    isP2PEvent,
                    isInternal,
                    'https://www.google.com',
                    'messsage',
                    undefined,
                    undefined,
                    undefined,
                    eventNotEnded
                  )

                  wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                    .fn()
                    .mockResolvedValue(expectedCheckin)

                  wrapper.vm.$data.isFormValid = true
                  wrapper.vm.$data.pageLoading = true
                  wrapper.vm.$data.isFailure = false
                  wrapper.vm.$data.eventPresence = 'Virtual'
                  wrapper.vm.$data.virtualEventPlatform = 'Medscape'

                  // Act
                  await (wrapper.vm as any).sendEmailForm()

                  // Assert
                  await wrapper.vm.$nextTick()
                  expect(wrapper.vm.$data.isLoading).toEqual(true)
                  expect(wrapper.vm.$data.isFailure).toEqual(false)
                  expect(wrapper.vm.$data.pageLoading).toEqual(true)
                  expect(wrapper.vm.$data.eventEnded).toEqual(false)
                  expect(wrapper.vm.$data.isFormValid).toEqual(true)
                })
              })

              describe('When event is a Non-Connect event', () => {
                describe('When the user is registered', () => {
                  it('Redirects the user to the to checkin URL and isLoading, pageLoading remains true', async () => {
                    // Arrange
                    const isRegistered = true
                    const isInternal = externalEvent
                    const isP2PEvent = false
                    const expectedCheckin = new EventCheckIn(
                      isRegistered,
                      isP2PEvent,
                      isInternal,
                      'yomommas.redirect.url',
                      'messsage',
                      undefined,
                      undefined,
                      undefined,
                      eventNotEnded
                    )

                    wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                      .fn()
                      .mockResolvedValue(expectedCheckin)

                    wrapper.vm.$data.isFormValid = true
                    wrapper.vm.$data.isLoading = false
                    wrapper.vm.$data.pageLoading = true
                    wrapper.vm.$data.eventPresence = 'Virtual'
                    wrapper.vm.$data.virtualEventPlatform = 'Intrado'

                    // Act
                    await (wrapper.vm as any).sendEmailForm()

                    // Assert
                    await wrapper.vm.$nextTick()
                    expect(wrapper.vm.$data.isFailure).toEqual(false)
                    expect(wrapper.vm.$data.isLoading).toEqual(true)
                    expect(wrapper.vm.$data.pageLoading).toEqual(true)
                    expect(wrapper.vm.$data.eventEnded).toEqual(false)
                    expect(wrapper.vm.$data.isFormValid).toEqual(true)
                  })
                })

                describe('When the user is not registered', () => {
                  it('Sets isLoading = false, isFailure = true, pageLoading = false', async () => {
                    // Arrange
                    const isRegistered = false
                    const isInternal = externalEvent
                    const isP2PEvent = false
                    const expectedCheckin = new EventCheckIn(
                      isRegistered,
                      isP2PEvent,
                      isInternal,
                      'yomommas.redirect.url',
                      'messsage',
                      undefined,
                      undefined,
                      undefined,
                      eventNotEnded
                    )

                    wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                      .fn()
                      .mockResolvedValue(expectedCheckin)

                    wrapper.vm.$data.isFormValid = true
                    wrapper.vm.$data.isFailure = false
                    wrapper.vm.$data.pageLoading = true
                    wrapper.vm.$data.eventPresence = 'Virtual'
                    wrapper.vm.$data.virtualEventPlatform = 'Intrado'

                    // Act
                    await (wrapper.vm as any).sendEmailForm()

                    // Assert
                    await wrapper.vm.$nextTick()
                    expect(wrapper.vm.$data.isLoading).toEqual(false)
                    expect(wrapper.vm.$data.isFailure).toEqual(true)
                    expect(wrapper.vm.$data.pageLoading).toEqual(false)
                    expect(wrapper.vm.$data.eventEnded).toEqual(false)
                    expect(wrapper.vm.$data.isFormValid).toEqual(true)
                  })
                })
              })
            })

            describe('When event ended flag is null', () => {
              const internalEvent = true
              const externalEvent = false
              const eventNotEnded = null
              describe('When event is a Connect event', () => {
                it('Takes user to event', async () => {
                  // Arrange
                  const isRegistered = true
                  const isInternal = internalEvent
                  const isP2PEvent = false
                  const expectedCheckin = {
                    isRegistered,
                    isP2PEvent,
                    isInternal,
                    url: 'https://www.test.com',
                    message: 'messsage',
                    country: undefined,
                    specialty: undefined,
                    profession: undefined,
                    isEventEnded: null
                  }

                  wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                    .fn()
                    .mockResolvedValue(expectedCheckin)

                  wrapper.vm.$data.isFormValid = true
                  wrapper.vm.$data.pageLoading = true
                  wrapper.vm.$data.isFailure = false
                  wrapper.vm.$data.eventPresence = 'Virtual'
                  wrapper.vm.$data.virtualEventPlatform = 'Medscape'

                  // Act
                  await (wrapper.vm as any).sendEmailForm()

                  // Assert
                  await wrapper.vm.$nextTick()
                  expect(wrapper.vm.$data.isLoading).toEqual(true)
                  expect(wrapper.vm.$data.isFailure).toEqual(false)
                  expect(wrapper.vm.$data.pageLoading).toEqual(true)
                  expect(wrapper.vm.$data.eventEnded).toEqual(false)
                  expect(wrapper.vm.$data.isFormValid).toEqual(true)
                })
              })

              describe('When event is a Non-Connect event', () => {
                describe('When the user is registered', () => {
                  it('Redirects the user to the to checkin URL and isLoading, pageLoading remains true', async () => {
                    // Arrange
                    const isRegistered = true
                    const isInternal = externalEvent
                    const isP2PEvent = false
                    const expectedCheckin = {
                      isRegistered,
                      isP2PEvent,
                      isInternal,
                      url: 'yomommas.redirect.url',
                      message: 'messsage',
                      country: undefined,
                      specialty: undefined,
                      profession: undefined,
                      isEventEnded: eventNotEnded
                    }

                    wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                      .fn()
                      .mockResolvedValue(expectedCheckin)

                    wrapper.vm.$data.isFormValid = true
                    wrapper.vm.$data.isLoading = false
                    wrapper.vm.$data.pageLoading = true
                    wrapper.vm.$data.eventPresence = 'Virtual'
                    wrapper.vm.$data.virtualEventPlatform = 'Intrado'

                    // Act
                    await (wrapper.vm as any).sendEmailForm()

                    // Assert
                    await wrapper.vm.$nextTick()
                    expect(wrapper.vm.$data.isFailure).toEqual(false)
                    expect(wrapper.vm.$data.isLoading).toEqual(true)
                    expect(wrapper.vm.$data.pageLoading).toEqual(true)
                    expect(wrapper.vm.$data.eventEnded).toEqual(false)
                    expect(wrapper.vm.$data.isFormValid).toEqual(true)
                  })
                })

                describe('When the user is not registered', () => {
                  it('Sets isLoading = false, isFailure = true, pageLoading = false', async () => {
                    // Arrange
                    const isRegistered = false
                    const isInternal = externalEvent
                    const isP2PEvent = false
                    const expectedCheckin = {
                      isRegistered,
                      isP2PEvent,
                      isInternal,
                      url: 'yomommas.redirect.url',
                      message: 'messsage',
                      country: undefined,
                      specialty: undefined,
                      profession: undefined,
                      isEventEnded: eventNotEnded
                    }

                    wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                      .fn()
                      .mockResolvedValue(expectedCheckin)

                    wrapper.vm.$data.isFormValid = true
                    wrapper.vm.$data.isFailure = false
                    wrapper.vm.$data.pageLoading = true
                    wrapper.vm.$data.eventPresence = 'Virtual'
                    wrapper.vm.$data.virtualEventPlatform = 'Intrado'

                    // Act
                    await (wrapper.vm as any).sendEmailForm()

                    // Assert
                    await wrapper.vm.$nextTick()
                    expect(wrapper.vm.$data.isLoading).toEqual(false)
                    expect(wrapper.vm.$data.isFailure).toEqual(true)
                    expect(wrapper.vm.$data.pageLoading).toEqual(false)
                    expect(wrapper.vm.$data.eventEnded).toEqual(false)
                    expect(wrapper.vm.$data.isFormValid).toEqual(true)
                  })
                })
              })
            })
          })
          describe('API call failure', () => {
            beforeEach(() => {
              wrapper.vm.$liveEventService.checkInToVirtualEvent = vi
                .fn()
                .mockRejectedValue(new Error())
            })
            it('sets the error message to generic email failure, isLoading = false, isFailure = true, pageLoading = false', async () => {
              wrapper.vm.$data.isFailure = false

              // Act
              await (wrapper.vm as any).sendEmailForm()

              // Assert
              await wrapper.vm.$nextTick()
              expect(wrapper.vm.$data.errorMessage).toEqual(
                'Error processing email. Please enter another email address or contact us for help.'
              )
              expect(wrapper.vm.$data.isLoading).toEqual(false)
              expect(wrapper.vm.$data.isFailure).toEqual(true)
              expect(wrapper.vm.$data.pageLoading).toEqual(false)
            })
          })
        })
        describe('email not set', () => {
          beforeEach(() => {
            wrapper.vm.$data.email = ''
          })

          it('does not check in the attendee', async () => {
            wrapper.vm.$liveEventService.checkInToVirtualEvent = vi.fn()

            await wrapper.vm.$nextTick()

            // Act
            await (wrapper.vm as any).sendEmailForm()

            // Assert
            await wrapper.vm.$nextTick()
            expect(
              wrapper.vm.$liveEventService.checkInToVirtualEvent
            ).not.toHaveBeenCalled()
          })
        })
      })
      describe('no liveEventId param', () => {
        beforeEach(() => {
          wrapper.vm.$router.push('/no-params-route')
        })
        it('does not check in the attendee', async () => {
          const expectedEmail = 'yomommas@email.com'
          ;(wrapper.vm as any).email = expectedEmail

          wrapper.vm.$liveEventService.checkInToVirtualEvent = vi.fn()

          // Act
          ;(wrapper.vm as any).sendEmailForm()

          // Assert
          await wrapper.vm.$nextTick()
          expect(
            wrapper.vm.$liveEventService.checkInToVirtualEvent
          ).not.toHaveBeenCalled()
        })
      })
    })
  })
})
