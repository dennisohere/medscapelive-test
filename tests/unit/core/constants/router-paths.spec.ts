import path from 'path'
import fs from 'fs'
import { HOME, EVENTS, ABOUT } from '@/core/constants/router-paths'
import srcDirname from '@/index'
import { describe, it, expect } from 'vitest'

describe('router-paths constants', () => {
  const pagesDirectoryName = '/pages'
  it(`verifies the paths in ${pagesDirectoryName} folder, as described in nuxt framework `, () => {
    const vueExtension = '.vue'
    const eventsPath =
      path.join(srcDirname, pagesDirectoryName, EVENTS) + vueExtension
    const aboutPath =
      path.join(srcDirname, pagesDirectoryName, ABOUT) + vueExtension

    // Assert
    expect(fs.existsSync(eventsPath)).toBeTruthy()
    expect(fs.existsSync(aboutPath)).toBeTruthy()
  })
  it('verifies home path because home is defined by the index.vue in /pages, as described in nuxt framework', () => {
    expect(HOME).toEqual('/')
  })
})
