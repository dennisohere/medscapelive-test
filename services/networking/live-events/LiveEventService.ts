import { LiveEventSearchParams } from '../params/LiveEventSearchParams'
import GetLiveEventSearchFiltersResponse from '../responses/GetLiveEventsSearchFiltersResponse'
import LiveEvent from '@/models/LiveEvent'
import { EventCheckIn } from '~/models/EventCheckIn'

export default interface LiveEventService {
  getLiveEventSearchFilters(
    startDate?: string
  ): Promise<GetLiveEventSearchFiltersResponse>
  searchLiveEvents(params?: LiveEventSearchParams): Promise<LiveEvent[]>
  registerUserWithCme(emailAddress: string, activityId: string): Promise<string>
  getEventMetadata(liveEventId: string): Promise<LiveEvent>
  checkInToVirtualEvent(
    liveEventId: string,
    email: string
  ): Promise<EventCheckIn>
  getEventMetadataFromDb(liveEventId: string): Promise<LiveEvent[]>
}
