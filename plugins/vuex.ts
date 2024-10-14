import liveEventSearch from "~/store/liveEventSearch";
import {actions, mutations, state} from "~/store";
import {createStore, type Store} from "vuex";


declare module 'vue' {
    interface NuxtApp {
        $store: Store<any>
    }
    interface ComponentCustomProperties {
        $store: Store<any>
    }
}

declare module '@vue/runtime-core' {
    interface NuxtApp {
        $store: Store<any>
    }
    interface ComponentCustomProperties {
        $store: Store<any>
    }
}


//
const store = createStore({
    state: state,
    mutations: mutations,
    actions: actions,
    modules: {
        liveEventSearch: liveEventSearch,
    },
    plugins: [
        // createLogger()
    ]
});



export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
    nuxtApp.provide('store', store);
});
