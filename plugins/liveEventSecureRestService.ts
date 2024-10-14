import LiveEventSecureRestService from '~/services/networking/live-event-secure-service/LiveEventSecureRestService'
import type {NuxtAxiosInstance} from "@nuxtjs/axios";
import type LiveEventService from "~/services/networking/live-events/LiveEventService";
import axios, {type AxiosInstance} from "axios";
import * as AUTH from "~/core/constants/authorization.constants";


interface LiveEventClient {
  $liveEventService: LiveEventService
}

declare module '#app' {
  interface Vue extends LiveEventClient {}
  interface Store<S> extends LiveEventClient {}
  interface NuxtAppOptions extends LiveEventClient {}
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const axiosInstance = useAxios({
    baseURL: config.public.EVENTS_SERVICE_BASE_URL,
    auth: {
      username: AUTH.DB_SERVICE_AUTH_USER_NAME,
      password: config.DB_SERVICE_AUTH_KEY
    }
  })

  const liveEventSecureService = new LiveEventSecureRestService(
      axiosInstance as AxiosInstance
  )

  nuxtApp.provide('liveEventSecureService',  liveEventSecureService);
});

