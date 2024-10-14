
import mitt from "mitt";


export default defineNuxtPlugin({
    name: 'eventBus',
    async setup (nuxtApp) {
        const emitter = mitt();

        nuxtApp.provide('bus', {
            $on: emitter.on,
            $emit: emitter.emit,
            $off: emitter.off,
        })
        // nuxtApp.provide('emitter', emitter.emit);
        nuxtApp.provide('on', emitter.on);
        nuxtApp.provide('off', emitter.off);
    }
})

