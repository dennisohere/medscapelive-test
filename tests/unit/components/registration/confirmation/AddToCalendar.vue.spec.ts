import {
  formatTimeForOutlook,
  formatTime,
  calculateEndTime,
  calculateEndTimeForOutlook
} from '@/tests/utility/timezoneUtility'
import { createNuxtTestWrapper } from '../../../setup/create-wrapper'
import AddToCalendar from '@/components/registration/confirmation/AddToCalendar.vue'
import { uiService } from '~/plugins/uiService'
import LiveEvent from '~/models/LiveEvent'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type {VueWrapper} from "@vue/test-utils";

describe('AddToCalendar', () => {
  describe('Calendar image attributes when all parameters are passed', () => {
    let wrapper: VueWrapper<typeof AddToCalendar>
    const event: LiveEvent = new LiveEvent({
      title: 'Medscape Live - Medical Conference',
      location: 'Madrid, Spain',
      endDate: '2021-05-24T08:30:00-05:00',
      startDate: '2021-05-24T06:00:00-05:00'
    })
    beforeEach(() => {
      wrapper = createNuxtTestWrapper(AddToCalendar, {
        propsData: {
          event
        },
        attachTo: document.body
      }
      ) as any
    })

    const localStartTime = formatTime(event.startDate)
    const localEndTime = formatTime(event.endDate)
    const localStartTimeForOutlook = formatTimeForOutlook(event.startDate)
    const localEndTimeForOutlook = formatTimeForOutlook(event.endDate)
    const googleLinkAllParams =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=' +
      localStartTime +
      '%2F' +
      localEndTime +
      '&location=Madrid%2C%20Spain&text=Medscape%20Live%20-%20Medical%20Conference'
    const outlookLinkAllParams =
      'https://outlook.live.com/calendar/0/action/compose?startdt=' +
      localStartTimeForOutlook +
      '&subject=Medscape%20Live%20-%20Medical%20Conference&enddt=' +
      localEndTimeForOutlook +
      '&location=Madrid%2C%20Spain'
    const yahooLinkAllParams =
      'https://calendar.yahoo.com/?v=60&ET=' +
      localEndTime +
      '&in_loc=Madrid%2C%20Spain&ST=' +
      localStartTime +
      '&TITLE=Medscape%20Live%20-%20Medical%20Conference'
    const icsLinkAllParams =
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:' +
      localStartTime +
      '%0ADTEND:' +
      localEndTime +
      '%0ASUMMARY:Medscape%20Live%20-%20Medical%20Conference%0ALOCATION:Madrid\\, Spain%0AEND:VEVENT%0AEND:VCALENDAR%0A'

    it('sets google image attributes and the calendar link', () => {
      const googleImageSelector = '[data-test=add-to-calendar__google]'
      const googleLinkSelector = '[data-test=add-to-calendar__google-link]'

      const googleImage = wrapper.find(googleImageSelector)
      const googleLink = wrapper.find(googleLinkSelector)

      // Assert
      expect(googleLink.attributes('href')).toEqual(googleLinkAllParams)
      expect(googleImage.vm.$props.src).toEqual(
        uiService.image.addToCalendarGoogleImage.src
      )
      expect(googleImage.vm.$props.alt).toEqual(
        uiService.image.addToCalendarGoogleImage.alt
      )
    })

    it('sets outlook image attributes and the calendar link', () => {
      const outlookImageSelector = '[data-test=add-to-calendar__outlook]'
      const outlookLinkSelector = '[data-test=add-to-calendar__outlook-link]'

      const outlookImage = wrapper.find(outlookImageSelector)
      const outlookLink = wrapper.find(outlookLinkSelector)

      // Assert
      expect(outlookLink.attributes('href')).toEqual(outlookLinkAllParams)
      expect(outlookImage.vm.$props.src).toEqual(
        uiService.image.addToCalendarOutlookImage.src
      )
      expect(outlookImage.vm.$props.alt).toEqual(
        uiService.image.addToCalendarOutlookImage.alt
      )
    })

    it('sets yahoo image attributes and the calendar link', () => {
      const yahooImageSelector = '[data-test=add-to-calendar__yahoo]'
      const yahooLinkSelector = '[data-test=add-to-calendar__yahoo-link]'

      const yahooImage = wrapper.find(yahooImageSelector)
      const yahooLink = wrapper.find(yahooLinkSelector)

      // Assert
      expect(yahooLink.attributes('href')).toEqual(yahooLinkAllParams)
      expect(yahooImage.vm.$props.src).toEqual(
        uiService.image.addToCalendarYahooImage.src
      )
      expect(yahooImage.vm.$props.alt).toEqual(
        uiService.image.addToCalendarYahooImage.alt
      )
    })

    it('sets ics image attributes and the calendar link', () => {
      const icsImageSelector = '[data-test=add-to-calendar__ics]'
      const icsLinkSelector = '[data-test=add-to-calendar__ics-link]'

      const icsImage = wrapper.find(icsImageSelector)
      const icsLink = wrapper.find(icsLinkSelector)

      // Assert
      expect(icsLink.attributes('href')).toEqual(icsLinkAllParams)
      expect(icsImage.vm.$props.src).toEqual(
        uiService.image.downloadEventIcsImage.src
      )
      expect(icsImage.vm.$props.alt).toEqual(
        uiService.image.downloadEventIcsImage.alt
      )
    })
  })

  describe('Calendar image attributes when only mandatory parameters are passed', () => {
    let wrapper: Wrapper<any>
    const event: LiveEvent = new LiveEvent({
      title: 'Medscape Live - Medical Conference',
      startDate: '2021-05-24T06:00:00-05:00'
    })
    beforeEach(() => {
      wrapper = createNuxtTestWrapper(AddToCalendar, {
        propsData: {
          event
        }
      }) as any
    })
    const localStartTime = formatTime(event.startDate)
    const localStartTimeForOutlook = formatTimeForOutlook(event.startDate)
    const localEndTime = calculateEndTime(event.startDate)
    const localEndTimeForOutlook = calculateEndTimeForOutlook(event.startDate)
    const googleLinkOnlyMandatoryParmas =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=' +
      localStartTime +
      '%2F' +
      localEndTime +
      '&text=Medscape%20Live%20-%20Medical%20Conference'
    const outlookLinkOnlyMandatoryParmas =
      'https://outlook.live.com/calendar/0/action/compose?startdt=' +
      localStartTimeForOutlook +
      '&subject=Medscape%20Live%20-%20Medical%20Conference&enddt=' +
      localEndTimeForOutlook +
      ''
    const yahooLinkOnlyMandatoryParmas =
      'https://calendar.yahoo.com/?v=60&ET=' +
      localEndTime +
      '&ST=' +
      localStartTime +
      '&TITLE=Medscape%20Live%20-%20Medical%20Conference'
    const icsLinkOnlyMandatoryParmas =
      'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:' +
      localStartTime +
      '%0ADTEND:' +
      localEndTime +
      '%0ASUMMARY:Medscape%20Live%20-%20Medical%20Conference%0AEND:VEVENT%0AEND:VCALENDAR%0A'

    it('sets google image attributes and the calendar link', () => {
      const googleImageSelector = '[data-test=add-to-calendar__google]'
      const googleLinkSelector = '[data-test=add-to-calendar__google-link]'

      const googleImage = wrapper.find(googleImageSelector)
      const googleLink = wrapper.find(googleLinkSelector)

      // Assert
      expect(googleLink.attributes('href')).toEqual(
        googleLinkOnlyMandatoryParmas
      )
      expect(googleImage.vm.$props.src).toEqual(
        uiService.image.addToCalendarGoogleImage.src
      )
      expect(googleImage.vm.$props.alt).toEqual(
        uiService.image.addToCalendarGoogleImage.alt
      )
    })

    it('sets outlook image attributes and the calendar link', () => {
      const outlookImageSelector = '[data-test=add-to-calendar__outlook]'
      const outlookLinkSelector = '[data-test=add-to-calendar__outlook-link]'

      const outlookImage = wrapper.find(outlookImageSelector)
      const outlookLink = wrapper.find(outlookLinkSelector)

      // Assert
      expect(outlookLink.attributes('href')).toEqual(
        outlookLinkOnlyMandatoryParmas
      )
      expect(outlookImage.vm.$props.src).toEqual(
        uiService.image.addToCalendarOutlookImage.src
      )
      expect(outlookImage.vm.$props.alt).toEqual(
        uiService.image.addToCalendarOutlookImage.alt
      )
    })

    it('sets yahoo image attributes and the calendar link', () => {
      const yahooImageSelector = '[data-test=add-to-calendar__yahoo]'
      const yahooLinkSelector = '[data-test=add-to-calendar__yahoo-link]'

      const yahooImage = wrapper.find(yahooImageSelector)
      const yahooLink = wrapper.find(yahooLinkSelector)

      // Assert
      expect(yahooLink.attributes('href')).toEqual(yahooLinkOnlyMandatoryParmas)
      expect(yahooImage.vm.$props.src).toEqual(
        uiService.image.addToCalendarYahooImage.src
      )
      expect(yahooImage.vm.$props.alt).toEqual(
        uiService.image.addToCalendarYahooImage.alt
      )
    })

    it('sets ics image attributes and the calendar link', () => {
      const icsImageSelector = '[data-test=add-to-calendar__ics]'
      const icsLinkSelector = '[data-test=add-to-calendar__ics-link]'

      const icsImage = wrapper.find(icsImageSelector)
      const icsLink = wrapper.find(icsLinkSelector)

      // Assert
      expect(icsLink.attributes('href')).toEqual(icsLinkOnlyMandatoryParmas)
      expect(icsImage.vm.$props.src).toEqual(
        uiService.image.downloadEventIcsImage.src
      )
      expect(icsImage.vm.$props.alt).toEqual(
        uiService.image.downloadEventIcsImage.alt
      )
    })
  })
})
