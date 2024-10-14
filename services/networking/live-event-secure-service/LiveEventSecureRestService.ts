import { RESOURCE_LINK } from '../../../core/constants/service-paths'
import GetResourceLinkResponse from '../responses/GetResourceLinkResponse'
import * as LABEL from '../../../core/constants/user-facing-strings/resource-link-strings'
import type LiveEventSecureService from './LiveEventSecureService'
import type {AxiosInstance} from "axios";
export default class LiveEventSecureRestService
  implements LiveEventSecureService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private client: AxiosInstance) {}

  async getResourceLinks(
    liveEventId: string,
    country?: string
  ): Promise<GetResourceLinkResponse> {
    const response = await this.client
      .get<GetResourceLinkResponse>(RESOURCE_LINK, {
        params: {
          liveEventId,
          country
        }
      })
      .catch((err) => {
        if (err.response) {
          return err.response.data
        } else if (err.request) {
          return { errorMessage: LABEL.NO_SERVER_RESPONSE }
        } else {
          return { errorMessage: LABEL.SERVER_ERROR }
        }
      })
    return response.data
  }
}
