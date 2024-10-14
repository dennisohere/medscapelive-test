export interface IP2PLink {
  eventCountryP2PLinkId: number
  liveEventId: string
  countryId: number
  countryName: string
  resourceUrl: string
  resourceUrlDescription?: string
  isActive: boolean
}

export default class P2PLink implements IP2PLink {
  eventCountryP2PLinkId: number
  liveEventId: string
  countryId: number
  countryName: string
  resourceUrl: string
  resourceUrlDescription?: string
  isActive: boolean
  constructor(init?: Partial<P2PLink>) {
    Object.assign(this, init)
  }
}
