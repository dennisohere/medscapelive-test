/* eslint-disable @typescript-eslint/no-explicit-any */
import {createNuxtTestWrapper} from '../setup/create-wrapper'
import EventPage from '@/pages/events.vue'
import LiveEvent from '@/models/LiveEvent'

import { SEARCH_EVENT_SUCCESS } from '~/core/constants/message-bus.constants'
import {
  eventAppBarOptions,
  defaultAppBarOptions
} from '~/models/view/AppBarOptions'
import * as omniture from '@/core/global/omniture'
import { EVENTS } from '~/core/constants/router-paths'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('vue-router');

import {
  GETTERS as get,
  MUTATIONS as mut,
  ACTIONS as act
} from '~/store/liveEventSearch/constants/liveEventSearch.types'
import {createMockedStoreConfig, createStore, type StoreConfig} from "~/tests/unit/setup/create-store";


const stubbedComponents = ['v-container']

describe('event', () => {
  let mockedStoreOptions: StoreConfig

  beforeEach(() => {
    mockedStoreOptions = createMockedStoreConfig()
  })
  describe('beforeMount', () => {
    it('gets the searchFilters and searchEventsWithQuery', async () => {
      const store = createStore(mockedStoreOptions)

      // Act
      const wrapper = createNuxtTestWrapper(EventPage, {store})
      const spy = vi.spyOn(wrapper.vm, 'searchEventsWithQuery')

      // Assert
      await wrapper.vm.$nextTick()

      expect(
          mockedStoreOptions.modules.liveEventSearch.actions![act.getSearchFilters]
      ).toHaveBeenCalled()
      expect(spy).toHaveBeenCalled()
    })
  })
  describe('mounted', () => {
    const showHeaderEvent = 'showHeaderForPage'
    it(`emits a ${showHeaderEvent} true event`, async () => {
      const mockShowHeader = vi.fn()
      const { $bus } = useNuxtApp();

      $bus.$on(showHeaderEvent, mockShowHeader)

      const wrapper = createNuxtTestWrapper(EventPage, {
        mocks: {
          $bus: $bus
        }
      })

      // Act

      // Assert
      await wrapper.vm.$nextTick()

      expect(mockShowHeader).toHaveBeenCalledWith(true)
    })
    const onPageShowEvent = 'pageshow'
    describe(`${onPageShowEvent}`, () => {
      describe('event is persisted', () => {
        it(`increments the searchViewKey to rerender LiveEventSearch because Safari caches the state, but does not update LiveEventSearch component`, async () => {
          const event = new CustomEvent(onPageShowEvent, {
            detail: {
              persisted: true
            }
          })

          const wrapper = createNuxtTestWrapper(EventPage, {
            attachTo: 'body'
          })

          // Act

          // Assert
          await wrapper.vm.$nextTick()

          window.dispatchEvent(event)

          expect((wrapper.vm as any).searchViewKey).toEqual(1)
        })
      })
    })

    it(`emits changed event on searchEventsSuccess event`, async () => {
      const mockChangeHandler = vi.fn()

      const { $bus } = useNuxtApp();

      $bus.$on('change', mockChangeHandler)

      const wrapper = createNuxtTestWrapper(EventPage, {
        mocks: {
          $bus: $bus
        }
      })


      // Act
      $bus.$emit('searchEventsSuccess')

      // Assert
      await wrapper.vm.$nextTick()
      expect(mockChangeHandler).toHaveBeenCalled()
    })

    it(`emits updateAppBarOptions event with eventOptions`, async () => {
      const mockEventHandler = vi.fn()
      const { $bus } = useNuxtApp();

      $bus.$on('updateAppBarOptions', mockEventHandler)

      const wrapper = createNuxtTestWrapper(EventPage, {
        mocks: {
          $bus: $bus
        }
      })

      // Act

      // Assert
      await wrapper.vm.$nextTick()
      expect(mockEventHandler).toHaveBeenCalledWith(eventAppBarOptions)
    })
    it(`calls sendWmdPageview`, () => {
      vi.spyOn(omniture, 'sendWmdPageview')
      createNuxtTestWrapper(EventPage, {})

      // Act

      // Assert
      expect(omniture.sendWmdPageview).toHaveBeenCalled()
    })
  })
  describe('beforeDestroy', () => {
    const onPageShowEvent = 'pageshow'
    it(`removes the onPageShow listener`, async () => {
      const event = new PageTransitionEvent(onPageShowEvent, {
        persisted: true
      })

      const mockOnPageShow = vi.fn()

      const wrapper = createNuxtTestWrapper(EventPage, {
        methods: {
          onPageShow: mockOnPageShow
        },
        attachToDocument: true
      })

      wrapper.unmount()

      // Act
      window.dispatchEvent(event)

      // Assert
      await wrapper.vm.$nextTick()
      expect(mockOnPageShow).not.toHaveBeenCalled()
    })
    it(`removes the searchEventSucccess listener`, async () => {
      const mockOnSearchSuccess = vi.fn()
      const wrapper = createNuxtTestWrapper(EventPage, {
        methods: {
          onSearchEventSuccess: mockOnSearchSuccess
        }
      })

      const eventEmitter = wrapper.vm;


      wrapper.unmount()

      // Act
      eventEmitter.$emit(SEARCH_EVENT_SUCCESS)

      // Assert
      await wrapper.vm.$nextTick()
      expect(mockOnSearchSuccess).not.toHaveBeenCalled()
    })
    it(`emits updateAppBarOptions event with defaultOptions`, async () => {
      const mockEventHandler = vi.fn()
      const wrapper = createNuxtTestWrapper(EventPage, {})

      const listener = wrapper.vm;

      listener.$on('updateAppBarOptions', mockEventHandler)

      // Act
      wrapper.unmount()

      // Assert
      await wrapper.vm.$nextTick()
      expect(mockEventHandler).toHaveBeenCalledWith(defaultAppBarOptions)
    })
  })
  describe('computed', () => {
    describe('liveEvents', () => {
      it(`returns liveEventStore.state.search.liveEvents`, () => {
        const expectedLiveEvents = [{} as LiveEvent, {} as LiveEvent]
        mockedStoreOptions.modules.liveEventSearch.state.search.liveEvents = expectedLiveEvents

        const wrapper = createNuxtTestWrapper(EventPage, {
          store: createStore(mockedStoreOptions)
        })

        // Act
        const actualLiveEvents = (wrapper.vm as any).liveEvents

        // Assert
        expect(actualLiveEvents).toEqual(expectedLiveEvents)
      })
    })
    describe('selectedSpecialtiesDisplay', () => {
      it(`returns liveEventStore.getters.selectedSpecialtiesDisplay`, () => {
        const expectedResult = 'some selectedSpecialtiesDisplay'
        mockedStoreOptions.modules.liveEventSearch.getters![
          get.selectedSpecialtiesDisplay
        ] = vi.fn(() => expectedResult)

        const wrapper = createNuxtTestWrapper(EventPage, {
          store: createStore(mockedStoreOptions)
        })

        // console.log('store', mockedStoreOptions.modules.liveEventSearch.getters)

        // Act
        const actualLiveEvents = (wrapper.vm as any).selectedSpecialtiesDisplay

        // Assert
        expect(actualLiveEvents).toEqual(expectedResult)
      })
    })
    describe('datesDisplay', () => {
      it(`returns liveEventStore.getters.datesDisplay`, () => {
        const expectedResult = 'some datesDisplay'
        mockedStoreOptions.modules.liveEventSearch.getters![
          get.datesDisplay
        ] = () => expectedResult

        const wrapper = createNuxtTestWrapper(EventPage, {
          store: createStore(mockedStoreOptions)
        })

        // Act
        const actualLiveEvents = (wrapper.vm as any).datesDisplay

        // Assert
        expect(actualLiveEvents).toEqual(expectedResult)
      })
    })
    describe('selectedLocationsDisplay', () => {
      it(`returns liveEventStore.getters.selectedLocationsDisplay`, () => {
        const expectedResult = 'some selectedLocationsDisplay'
        mockedStoreOptions.modules.liveEventSearch.getters![
          get.selectedLocationsDisplay
        ] = () => expectedResult

        const wrapper = createNuxtTestWrapper(EventPage, {
          store: createStore(mockedStoreOptions)
        })

        // Act
        const actualLiveEvents = (wrapper.vm as any).selectedLocationsDisplay

        // Assert
        expect(actualLiveEvents).toEqual(expectedResult)
      })
    })
  })
  describe('methods', () => {
    describe('searchEventsWithQuery', () => {
      describe('there are events', () => {
        beforeEach(() => {
          mockedStoreOptions.modules.liveEventSearch.state.search.liveEvents = [
            {} as LiveEvent,
            {} as LiveEvent
          ]
        })
        it(`does not dispatch {act.searchLiveEvents}`, async () => {
          // Arrange
          const wrapper = createNuxtTestWrapper(EventPage, {
            store: createStore(mockedStoreOptions)
          })

          // Act
          await (wrapper.vm as any).searchEventsWithQuery()

          // Assert
          await wrapper.vm.$nextTick()
          expect(
            mockedStoreOptions.modules.liveEventSearch.actions![
              act.searchLiveEvents
            ]
          ).not.toHaveBeenCalled()
        })
      })
      describe('there are no events in the store', () => {
        beforeEach(() => {
          mockedStoreOptions.modules.liveEventSearch.state.search.liveEvents = []
        })
        it(`dispatches ${act.searchLiveEvents} from the store`, async () => {
          // Arrange
          const store = createStore(mockedStoreOptions)

          const wrapper = createNuxtTestWrapper(EventPage, {
              store
            })

            // Act
          ;(wrapper.vm as any).searchEventsWithQuery()

          // Assert
          await wrapper.vm.$nextTick()
          expect(
            mockedStoreOptions.modules.liveEventSearch.actions![
              act.searchLiveEvents
            ]
          ).toHaveBeenCalled()
        })
        describe('there is a query', () => {
          it('sets the startDate and endDate and calls act.searchLiveEvents action ', async () => {
            // Arrange
            const expectedQuery = {
              specialty: 'cardiology',
              startDate: '10-20-2020',
              endDate: '12-10-2020',
              location: 'yo%2C%20mommas%20location'
            }

            const store = createStore(mockedStoreOptions)

            const { $router } = useNuxtApp();

            await $router.push({ path: EVENTS, query: expectedQuery })

            const wrapper = createNuxtTestWrapper(EventPage, {
                store
              });

              // Act
            ;(wrapper.vm as any).searchEventsWithQuery()

            // Assert
            await wrapper.vm.$nextTick()
            expect(
              mockedStoreOptions.modules.liveEventSearch.actions![
                act.searchLiveEvents
              ]
            ).toHaveBeenCalled()
            expect(
              mockedStoreOptions.modules.liveEventSearch.mutations![
                mut.setEndDate
              ]
            ).toHaveBeenCalledWith(expect.any(Object), expectedQuery.endDate)
            expect(
              mockedStoreOptions.modules.liveEventSearch.mutations![
                mut.setStartDate
              ]
            ).toHaveBeenCalledWith(expect.any(Object), expectedQuery.startDate)
          })

          describe('specialty and location query as a string', () => {
            it('sets the specialty as array and url decoded locations as array', async () => {
              const { $router } = useNuxtApp();

              // Arrange
              const expectedQuery = {
                specialty: 'cardiology',
                location: 'yo, mommas location'
              }
              const expectedLocationArray = [expectedQuery.location]
              const expectedSpecialtyArray = [expectedQuery.specialty]

              const store = createStore(mockedStoreOptions)
              await $router.push({ path: EVENTS, query: expectedQuery })

              const wrapper = createNuxtTestWrapper(EventPage, {
                  store,
                  stubs: stubbedComponents,
                })

                // Act
              ;(wrapper.vm as any).searchEventsWithQuery()

              // Assert
              await wrapper.vm.$nextTick()
              expect(
                mockedStoreOptions.modules.liveEventSearch.mutations![
                  mut.setSpecialtyKeys
                ]
              ).toHaveBeenCalledWith(expect.any(Object), expectedSpecialtyArray)
              expect(
                mockedStoreOptions.modules.liveEventSearch.mutations![
                  mut.setLocations
                ]
              ).toHaveBeenCalledWith(expect.any(Object), expectedLocationArray)
            })
          })
          describe('specialty and location query as an array', () => {
            it('sets the specialty as array, startDate, endDate, and sets url decoded location as array', async () => {
              const { $router } = useNuxtApp();

              // Arrange
              const specialties = ['cardiology', 'radiology', 'criticalcare']
              const locations = ['Any location', 'yomommas location']
              const expectedQuery = {
                specialty: specialties,
                location: locations
              }

              const store = createStore(mockedStoreOptions)
              await $router.push({ path: EVENTS, query: expectedQuery })

              const wrapper = createNuxtTestWrapper(EventPage, {
                  store,
                  stubs: stubbedComponents,
                })

                // Act
              ;(wrapper.vm as any).searchEventsWithQuery()

              // Assert
              await wrapper.vm.$nextTick()
              expect(
                mockedStoreOptions.modules.liveEventSearch.mutations![
                  mut.setSpecialtyKeys
                ]
              ).toHaveBeenCalledWith(expect.any(Object), specialties)
              expect(
                mockedStoreOptions.modules.liveEventSearch.mutations![
                  mut.setLocations
                ]
              ).toHaveBeenCalledWith(expect.any(Object), locations)
            })
          })
        })
        describe('there is no query', () => {
          it('sets specialty = "", startDate, endDate = undefined, locations = ""', async () => {
            const { $router } = useNuxtApp();

            // Arrange
            const expectedQuery = {}

            const store = createStore(mockedStoreOptions)

            await $router.push({ path: EVENTS, query: expectedQuery })

            const wrapper = createNuxtTestWrapper(EventPage, {
                store,
                stubs: stubbedComponents,
              })

              // Act
            ;(wrapper.vm as any).searchEventsWithQuery()

            // Assert
            await wrapper.vm.$nextTick()
            expect(
              mockedStoreOptions.modules.liveEventSearch.actions![
                act.searchLiveEvents
              ]
            ).toHaveBeenCalled()
            expect(
              mockedStoreOptions.modules.liveEventSearch.mutations![
                mut.setSpecialtyKeys
              ]
            ).toHaveBeenCalledWith(expect.any(Object), undefined)
            expect(
              mockedStoreOptions.modules.liveEventSearch.mutations![
                mut.setLocations
              ]
            ).toHaveBeenCalledWith(expect.any(Object), undefined)
            expect(
              mockedStoreOptions.modules.liveEventSearch.mutations![
                mut.setEndDate
              ]
            ).toHaveBeenCalledWith(expect.any(Object), undefined)
            expect(
              mockedStoreOptions.modules.liveEventSearch.mutations![
                mut.setStartDate
              ]
            ).toHaveBeenCalledWith(expect.any(Object), undefined)
          })
        })
      })
    })
  })
})
