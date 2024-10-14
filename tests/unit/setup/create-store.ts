import {Module, Store} from 'vuex'
import * as liveEventStoreConstants from '~/store/liveEventSearch/constants/liveEventSearch.types'

import * as rootStoreConfig from '@/store'
import {RootStoreState} from '~/store/root.state'
import {vi} from 'vitest'
import LiveEventSearchStoreState from "~/store/liveEventSearch/liveEventSearch.state";
import liveEventStoreConfig from '@/store/liveEventSearch'
import {assign, merge} from "lodash";


export const createStore = (mocks?: StoreConfig): Store<any> => {
  const storeConfig = mocks || createMockedStoreConfig()
  return new Store(storeConfig)
}

export const createStoreConfig = () => ({
  ...(rootStoreConfig as Module<RootStoreState, RootStoreState>),
  state: new RootStoreState(),
  modules: {
    [liveEventStoreConstants.name]: {
      ...(liveEventStoreConfig as Module<LiveEventSearchStoreState, RootStoreState>),
      state: new LiveEventSearchStoreState()
    }
  },
})
export type StoreConfig = ReturnType<typeof createStoreConfig>

export const createMockedStoreConfig = (): StoreConfig => {
  const mockedStoreOptions = createStoreConfig()
  mockModule(mockedStoreOptions)
  mockModule(mockedStoreOptions.modules.liveEventSearch)
  return {
    // ...mockedStoreOptions,
    modules: {
      [liveEventStoreConstants.name]: {
        ...mockedStoreOptions.modules[liveEventStoreConstants.name]
      }
    }
  }
  function mockModule(module: Module<any, RootStoreState>) {
    for (const key in module.mutations) {
      module.mutations![key] = vi.fn()
    }
    for (const key in module.actions) {
      module.actions![key] = vi.fn()
    }
    for (const key in module.getters) {
      module.getters![key] = vi.fn()
    }
  }
}
