import axios, {type AxiosInstance, type AxiosRequestConfig} from "axios";
import {logger} from "~/core/logger";



export default (config?: AxiosRequestConfig): AxiosInstance => {
    // const nuxtConfig = useRuntimeConfig()
    const {$config} = useNuxtApp();

    const axiosInstance = axios.create(config ?? {
        baseURL: $config.public.EVENTS_SERVICE_BASE_URL,
    })

    axiosInstance.interceptors.request.use((config)=> {
        // logger.log('req config', config);

        return config;
    })

    axiosInstance.interceptors.response.use((config) => {
        // logger.log('response config', config);
        return config;
    })

    return axiosInstance;
}


