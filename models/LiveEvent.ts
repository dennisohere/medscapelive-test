export interface ILiveEvent {
  isVirtualEvent?: boolean
  virtualEventId?: string
  eventType?: string
  title?: string
  header?: string
  registerLink?: string
  eventHomePage?: string
  streamingEventPlatform?: string
  streamingEventId?: string
  date?: string
  startDate?: string
  endDate?: string
  city?: string
  location?: string
  isAccredited?: boolean
  description?: string
  speakers?: string[]
  registerLabel?: string
  imageUrl?: string
  specialties?: string[]
  specialty?: string
  excludeIfCountry?: string
  includeIfCountry?: string
  provisionalRegisterLink?: string
  isP2PEvent?: boolean
  virtualEventPlatform?: string
  eventPresence?: string
  isEventEnded?: boolean
}
export default class LiveEvent implements ILiveEvent {
  isVirtualEvent?: boolean
  virtualEventId?: string
  eventType?: string
  title?: string
  header?: string
  registerLink?: string
  eventHomePage?: string
  streamingEventPlatform?: string
  streamingEventId?: string
  date?: string
  startDate?: string
  endDate?: string
  city?: string
  location?: string
  isAccredited?: boolean
  description?: string
  speakers?: string[]
  registerLabel?: string
  imageUrl?: string
  specialties?: string[]
  specialty?: string
  excludeIfCountry?: string
  includeIfCountry?: string
  provisionalRegisterLink?: string
  isP2PEvent?: boolean
  isPromoEvent?: boolean
  virtualEventPlatform?: string
  eventPresence?: string
  isEventEnded?: boolean
  constructor(init?: Partial<LiveEvent>) {
    Object.assign(this, init)
  }
}
