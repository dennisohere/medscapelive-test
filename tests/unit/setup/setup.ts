import {createVuetify} from "vuetify";
import {UIService} from "~/services/view/base/UIService";
import mitt from "mitt";
import {createStore} from "~/tests/unit/setup/create-store";
import EventPage from '@/pages/events.vue'
import HomePage from '@/pages/index.vue'
import AboutPage from '@/pages/about.vue'
import LiveEventCmePage from '@/pages/live-event/cme/[activityId].vue'
import LiveEventCheckinPage from '@/pages/live-event/check-in/[liveEventId].vue'
import LiveEventRestService from "~/services/networking/live-events/LiveEventRestService";
import type {AxiosInstance} from "axios";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})
global.ResizeObserver = require('resize-observer-polyfill')


const mockUIService = new UIService(vuetify)
const emitter = mitt();
const store = createStore()
const router  = useRouter();

const mockLiveEventService = new LiveEventRestService({} as AxiosInstance);


router.addRoute({component: HomePage, path: '/' },)
router.addRoute({component: EventPage, path: '/events' },)
router.addRoute({component: AboutPage, path: '/about' },)
router.addRoute({component: LiveEventCmePage, path: '/live-event/cme/:activityId', name: 'cmeRoute' },)
router.addRoute({component: LiveEventCheckinPage, path: '/live-event/check-in/:liveEventId', name: 'checkinRoute' },)

export {router, vuetify, mockUIService, emitter, store, mockLiveEventService};

