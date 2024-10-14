/* eslint-disable no-useless-constructor */
export class EventCheckIn {
  constructor(
    readonly isRegistered: boolean,
    readonly isP2PEvent: boolean,
    readonly isInternal: boolean,
    readonly url: string,
    readonly message: string,
    readonly country?: string,
    readonly specialty?: string,
    readonly profession?: string,
    readonly isEventEnded?: boolean
  ) {}
}

export interface EventCheckInUserProfile {
  country?: string
  specialty?: string
  profession?: string
}
