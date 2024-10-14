import LiveEventSearchStoreState from '~/store/liveEventSearch/liveEventSearch.state'
import {mutations} from "~/store/liveEventSearch/liveEventSearch.mutations";
import {getters} from "~/store/liveEventSearch/liveEventSearch.getters";
import {actions} from "~/store/liveEventSearch/liveEventSearch.actions";


export default {
    namespaced: true,
    state() {
        return new LiveEventSearchStoreState()
    },
    mutations: mutations,
    getters: getters,
    actions: actions,
}
