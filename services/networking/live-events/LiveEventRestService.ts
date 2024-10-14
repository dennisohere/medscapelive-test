import qs from 'qs'
import GetLiveEventsResponse from '../responses/GetLiveEventsResponse'
import GetLiveEventSearchFiltersResponse from '../responses/GetLiveEventsSearchFiltersResponse'
import { type LiveEventSearchParams } from '../params/LiveEventSearchParams'
import type LiveEventService from './LiveEventService'
import {
  CME_REGISTRATION,
  EVENTS_SEARCH,
  EVENTS_SEARCH_FILTERS,
  CHECK_IN_ATTENDEE,
  EVENT_METADATA
} from '~/core/constants/service-paths'

import LiveEvent from '@/models/LiveEvent'
import { EventCheckIn } from '~/models/EventCheckIn'
import type {AxiosInstance} from "axios";
export default class LiveEventRestService implements LiveEventService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private client: AxiosInstance) {}

  async getLiveEventSearchFilters(
    startDate?: string
  ): Promise<GetLiveEventSearchFiltersResponse> {
    const response = await this.client.get<GetLiveEventSearchFiltersResponse>(
      EVENTS_SEARCH_FILTERS,
      {
        params: {
          startDate
        }
      }
    )
    return response.data
  }

  async searchLiveEvents(params?: LiveEventSearchParams): Promise<LiveEvent[]> {
    const response = await this.client.get<GetLiveEventsResponse>(
      EVENTS_SEARCH,
      {
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: 'repeat' })
      }
    )
    return response.data.liveEvents
  }

  async registerUserWithCme(
    emailAddress: string,
    activityId: string
  ): Promise<string> {
    const registrationResponse = await this.client.post<string>(
      CME_REGISTRATION,
      {
        emailAddress,
        activityId
      }
    )

    return registrationResponse.data
  }

  async getEventMetadata(liveEventId: string): Promise<LiveEvent> {
    const response = await this.client.get<{ liveEvent: LiveEvent }>(
      `${EVENT_METADATA}/${liveEventId}`
    )
    return response.data.liveEvent
  }

  async checkInToVirtualEvent(
    liveEventId: string,
    email: string
  ): Promise<EventCheckIn> {
    const response = await this.client.post<EventCheckIn>(CHECK_IN_ATTENDEE, {
      liveEventId,
      email
    })
    return response.data
  }

  async getEventMetadataFromDb(liveEventId: string): Promise<LiveEvent[]> {
    const includeHiddenEvents: boolean = true
    const response = await this.client.get<{ liveEvents: LiveEvent[] }>(
      `${EVENTS_SEARCH}`,
      {
        params: {
          aventriId: liveEventId,
          includeHiddenEvents
        }
      }
    )
    return response.data.liveEvents
  }
}
