import dayjs from 'dayjs'
import {
  MS_IN_MINUTES,
  DEFAULT_DURATION_MINUTES,
  GOOGLE_PARAMS,
  OUTLOOK_PARAMS,
  YAHOO_PARAMS,
  ICS_PARAMS
} from '~/core/constants/calendar-events.constants'

interface CalendarEvent {
  title: string
  start: string
  end?: string
  location?: string
}

export const getGoogleCalendarEventLink = (
  calendarEvent: CalendarEvent
): string => {
  try {
    const startTime = formatTime(calendarEvent.start)
    const endTime = calculateEndTime(calendarEvent)

    const googleCalenderLink =
      encodeURI(
        [
          GOOGLE_PARAMS.BASE_URL,
          GOOGLE_PARAMS.QUERY_DATES + (startTime || '')
        ].join('')
      ) +
      encodeURIComponent(GOOGLE_PARAMS.QUERY_FRONT_SLASH) +
      encodeURI(endTime || '') +
      (calendarEvent.location
        ? encodeURI(GOOGLE_PARAMS.QUERY_LOCATION) +
          encodeURIComponent(calendarEvent.location || '')
        : '') +
      encodeURI(GOOGLE_PARAMS.QUERY_TEXT + (calendarEvent.title || ''))
    return googleCalenderLink
  } catch (googleLinkError) {
    console.log('Error in getGoogleCalendarEventLink() ', googleLinkError)
    return ''
  }
}

export const getOutlookCalendarEventLink = (
  calendarEvent: CalendarEvent
): string => {
  try {
    const startTime = formatTimeForOutlook(calendarEvent.start)

    const endTime = calculateEndTimeForOutlook(calendarEvent)
    const outlookCalendarLink =
      encodeURI(
        [
          OUTLOOK_PARAMS.BASE_URL,
          OUTLOOK_PARAMS.QUERY_START_DATE + (startTime || ''),
          OUTLOOK_PARAMS.QUERY_SUBJECT + (calendarEvent.title || ''),
          OUTLOOK_PARAMS.QUERY_END_DATE + (endTime || '')
        ].join('')
      ) +
      (calendarEvent.location
        ? encodeURI(OUTLOOK_PARAMS.QUERY_LOCATION) +
          encodeURIComponent(calendarEvent.location || '')
        : '')

    return outlookCalendarLink
  } catch (outlookLinkError) {
    console.log('Error in getOutlookCalendarEventLink()', outlookLinkError)
    return ''
  }
}

export const getYahooCalendarEventLink = (
  calendarEvent: CalendarEvent
): string => {
  try {
    const st = formatTime(calendarEvent.start)
    const et = calculateEndTime(calendarEvent)

    const yahooCalendarLink =
      encodeURI(
        [
          YAHOO_PARAMS.BASE_URL,
          et ? YAHOO_PARAMS.QUERY_END_DATE + et : ''
        ].join('')
      ) +
      (calendarEvent.location
        ? YAHOO_PARAMS.QUERY_LOCATION +
          encodeURIComponent(calendarEvent.location)
        : '') +
      encodeURI(
        [
          YAHOO_PARAMS.QUERY_START_DATE + st,
          YAHOO_PARAMS.QUERY_TITLE + (calendarEvent.title || '')
        ].join('')
      )
    return yahooCalendarLink
  } catch (yahooLinkError) {
    console.log('Error in getYahooCalendarEventLink() ', yahooLinkError)
    return ''
  }
}

export const getIcsCalendarEventLink = (
  calendarEvent: CalendarEvent
): string => {
  try {
    const startTime = formatTime(calendarEvent.start)
    const endTime = calculateEndTime(calendarEvent)

    const icsCalendarLink =
      encodeURI(
        ICS_PARAMS.BASE_URL +
          [
            ICS_PARAMS.BEGIN_CAL,
            ICS_PARAMS.VERSION,
            ICS_PARAMS.BEGIN_EVENT,
            ICS_PARAMS.QUERY_START_DATE + (startTime || ''),
            ICS_PARAMS.QUERY_END_DATE + (endTime || ''),
            ICS_PARAMS.QUERY_SUMMARY + (calendarEvent.title || ''),
            ''
          ].join('\n')
      ) +
      (calendarEvent.location
        ? ICS_PARAMS.QUERY_LOCATION +
          calendarEvent.location?.replace(',', '\\,') +
          encodeURI('\n')
        : '') +
      encodeURI([ICS_PARAMS.QUERY_END_EVENT, ICS_PARAMS.END_CAL, ''].join('\n'))
    return icsCalendarLink
  } catch (icsLinkError) {
    console.log('Error in getIcsCalendarEventLink() ', icsLinkError)
    return ''
  }
}

const formatTime = function(date: any) {
  return dayjs(date).format('YYYYMMDDTHHmm00')
}
const formatTimeForOutlook = function(date: any) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:00')
}

const calculateEndTime = function(calendarEvent: CalendarEvent): string {
  return calendarEvent.end
    ? formatTime(calendarEvent.end)
    : formatTime(
        new Date(
          new Date(calendarEvent.start).getTime() +
            DEFAULT_DURATION_MINUTES * MS_IN_MINUTES
        )
      )
}

const calculateEndTimeForOutlook = function(
  calendarEvent: CalendarEvent
): string {
  return calendarEvent.end
    ? formatTimeForOutlook(calendarEvent.end)
    : formatTimeForOutlook(
        new Date(
          new Date(calendarEvent.start).getTime() +
            DEFAULT_DURATION_MINUTES * MS_IN_MINUTES
        )
      )
}
