export const MS_IN_MINUTES = 60 * 1000
export const DEFAULT_DURATION_MINUTES = 60

export const GOOGLE_PARAMS = {
  BASE_URL: 'https://calendar.google.com/calendar/render?action=TEMPLATE',
  QUERY_DATES: '&dates=',
  QUERY_FRONT_SLASH: '/',
  QUERY_LOCATION: '&location=',
  QUERY_TEXT: '&text='
}

export const OUTLOOK_PARAMS = {
  BASE_URL: 'https://outlook.live.com/calendar/0/action/compose?',
  QUERY_START_DATE: 'startdt=',
  QUERY_SUBJECT: '&subject=',
  QUERY_END_DATE: '&enddt=',
  QUERY_LOCATION: '&location='
}

export const YAHOO_PARAMS = {
  BASE_URL: 'https://calendar.yahoo.com/?v=60',
  QUERY_END_DATE: '&ET=',
  QUERY_LOCATION: '&in_loc=',
  QUERY_START_DATE: '&ST=',
  QUERY_TITLE: '&TITLE='
}

export const ICS_PARAMS = {
  BASE_URL: 'data:text/calendar;charset=utf8,',
  BEGIN_CAL: 'BEGIN:VCALENDAR',
  VERSION: 'VERSION:2.0',
  BEGIN_EVENT: 'BEGIN:VEVENT',
  QUERY_START_DATE: 'DTSTART:',
  QUERY_END_DATE: 'DTEND:',
  QUERY_SUMMARY: 'SUMMARY:',
  QUERY_LOCATION: 'LOCATION:',
  QUERY_END_EVENT: 'END:VEVENT',
  END_CAL: 'END:VCALENDAR'
}
export const IE_CALENDAR_PARAMS = {
  CALENDAR_MIME: 'text/calendar',
  ICS_DOWNLOAD_FILE_NAME: 'download.ics',
  IE_10_UA_FRAGMENT: 'MSIE ',
  IE_11_UA_FRAGMENT: 'Trident/'
}
