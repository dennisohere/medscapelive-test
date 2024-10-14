import path from 'path'
import { createStoreConfig } from './create-store'
import rootDir from '@'
import * as liveEventStoreConstants from '~/store/liveEventSearch/constants/liveEventSearch.types'

describe('Vuex store configuration reflects the store directory structure, as described in Vuex Store module mode in nuxt documentation', () => {
  const storePath = path.relative(__dirname, `${rootDir}/store`)
  it('verifies liveEventModule configuration', () => {
    const expectedLiveEventModule = require(`${storePath}/${liveEventStoreConstants.name}`)

    // Act
    const storeConfig = createStoreConfig()

    // Assert
    expect(
      JSON.stringify(storeConfig.modules![liveEventStoreConstants.name].state)
    ).toEqual(JSON.stringify(expectedLiveEventModule.state()))
    expect(
      JSON.stringify(storeConfig.modules![liveEventStoreConstants.name].getters)
    ).toEqual(JSON.stringify(expectedLiveEventModule.getters))
    expect(
      JSON.stringify(storeConfig.modules![liveEventStoreConstants.name].actions)
    ).toEqual(JSON.stringify(expectedLiveEventModule.actions))
    expect(
      JSON.stringify(
        storeConfig.modules![liveEventStoreConstants.name].mutations
      )
    ).toEqual(JSON.stringify(expectedLiveEventModule.mutations))
  })
})
