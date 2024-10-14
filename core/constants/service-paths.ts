const SEARCH = 'search'
const FILTERS = 'filters'
const CME = 'cme'
const REGISTRATION = 'registration'
export const EVENTS = 'events'
const ATTENDEE = 'attendee'
const CHECK_IN = 'checkin'
const LIVE_EVENT = 'live-event'
const V1 = 'v1'
const LIVE_EVENTS = 'live-events'
const RESOUCE_LINKS = 'resource-links'

// const prodBrowser = import.meta.browser && process.env.NODE_ENV === 'production'
const prodBrowser = true
// console.log('prodBrowser', prodBrowser, import.meta.browser)
export const EVENTS_SEARCH = prodBrowser ? `${V1}/${EVENTS}/${SEARCH}` : SEARCH
export const EVENTS_SEARCH_FILTERS = prodBrowser
  ? `${V1}/${EVENTS}/${SEARCH}/${FILTERS}`
  : `${SEARCH}/${FILTERS}`
export const CME_REGISTRATION = `${CME}/${REGISTRATION}`
export const CHECK_IN_ATTENDEE = `${CHECK_IN}/${ATTENDEE}`
export const EVENT_METADATA = `${LIVE_EVENT}`
export const RESOURCE_LINK = `${LIVE_EVENTS}/${RESOUCE_LINKS}`
