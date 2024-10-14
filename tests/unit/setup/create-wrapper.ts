import { vi } from 'vitest'
import { type ComponentMountingOptions, shallowMount, type VueWrapper } from '@vue/test-utils'
import {emitter, mockLiveEventService, mockUIService, router, store, vuetify} from "~/tests/unit/setup/setup";
import {mountSuspended} from "@nuxt/test-utils/runtime";
import {sharedStubs} from "~/tests/utility/stubs";
import {createHead} from "@unhead/vue";

vi.mock('vue-router');

// Mock the constants
vi.mock('~/core/constants/router-paths')
vi.doMock('~/plugins/uiService', () => ({
    uiService: mockUIService,
}))
const stubbedComponents = ['appendIcon', 'nuxt', 'router-link', 'client-only']

vi.mock('~/core/constants/slot-names', () => ({
    HERO_HEADER_CONTENT_SLOT: 'hero-header-content',
    HERO_HEADER_RIGHT_ITEM_SLOT: 'hero-header-right-item'
}))


export function createNuxtTestWrapper(component: any, options?: ComponentMountingOptions<VueWrapper>): VueWrapper<typeof component> {
    const stubs = [...stubbedComponents, ...(options?.stubs as [] || [])]
    const config = useRuntimeConfig();

    const bus = {
        $on: emitter.on,
        $emit: emitter.emit,
        $off: emitter.off,
    };

    const route = useRoute();
    const head = options?.head || createHead();

    return shallowMount(component, {
        global: {
            plugins: [vuetify, head],
            mocks: {
                $uiService: mockUIService,
                $liveEventService: options?.$liveEventService || mockLiveEventService,
                $store: options?.store || store,
                $config: options?.$config || config,
                $router: router,
                $route: options?.route || route,
                $bus: bus,
                $on: emitter.on,
                $off: emitter.off,
                useHead: head.push,
                ...(options?.mocks as {})
            },
            stubs: {
                VDialog: sharedStubs.vDialog,
            }
        },
        props: options?.props,
        data: options?.data,
        // localVue: options?.localVue || localVue,
        stubs,
        propsData: options?.propsData,
        // computed: options?.computed,
        // methods: options?.methods,
        // router: options?.router || router,
        template: options?.template || '<div></div>',
        attachTo: options?.attachTo,
        mixins: options?.mixins,
    })
}

