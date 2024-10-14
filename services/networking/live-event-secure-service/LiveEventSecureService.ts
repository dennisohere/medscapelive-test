import GetResourceLinkResponse from '../responses/GetResourceLinkResponse'

export default interface LiveEventSecureService {
  getResourceLinks(
    liveEventId: string,
    country?: string
  ): Promise<GetResourceLinkResponse>
}
