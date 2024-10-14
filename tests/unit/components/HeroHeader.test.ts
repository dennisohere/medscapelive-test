import { describe, it, expect, beforeEach, vi } from 'vitest'
import {mount, RouterLinkStub, type VueWrapper} from '@vue/test-utils'
import HeroHeader from '@/components/HeroHeader.vue'
import {createNuxtTestWrapper} from "~/tests/unit/setup/create-wrapper";

vi.mock('~/core/constants/slot-names', () => ({
  HERO_HEADER_CONTENT_SLOT: 'hero-header-content',
  HERO_HEADER_RIGHT_ITEM_SLOT: 'hero-header-right-item'
}))


describe('HeroHeader.vue', () => {
  let wrapper: VueWrapper
  beforeEach(async () => {
    wrapper = createNuxtTestWrapper(HeroHeader, {
      props: {
        heroImage: {
          src: 'yomommas-img-src',
          srcSet: 'yommommas-src-set',
          title: 'some title',
          alt: 'some alt'
        }
      },
    })
  })
  describe('render', () => {
    it('matches the snapshot', () => {
      // Assert
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
