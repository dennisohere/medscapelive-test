import {VueWrapper} from '@vue/test-utils'
import MdscpFooter from '@/components/MdscpFooter.vue'
import { FACEBOOK, TWITTER } from '~/core/constants/asset-paths'

import { describe, it, expect, beforeEach } from 'vitest'
import {createNuxtTestWrapper} from "~/tests/unit/setup/create-wrapper";


describe('MdscpFooter.vue', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = createNuxtTestWrapper(MdscpFooter, {
      propsData: {
        footerMenu: {
          social: [
            {
              path: 'https://www.facebook.com/medscape',
              alt: 'Facebook',
              imagePath: FACEBOOK,
              title: 'facebook icon'
            },
            {
              path: 'https://twitter.com/medscapelive',
              alt: 'Twitter',
              imagePath: TWITTER,
              title: 'twitter icon'
            }
          ],
          About: [
            {
              path: 'https://www.medscape.com/public/privacy',
              name: 'Privacy Policy'
            },
            {
              path: 'https://www.medscape.com/public/cookies',
              name: 'Cookies'
            }
          ],
          Membership: [
            {
              path: 'https://profreg.medscape.com/px/registration.do?lang=en',
              name: 'Become a Member'
            }
          ],
          Apps: [
            {
              path: 'http://www.medscape.com/public/medscapeapp',
              name: 'Medscape'
            }
          ],
          Network: [
            {
              path: 'http://www.webmd.com/',
              name: 'WebMD'
            }
          ]
        },
        copyright:
          'All material on this website is protected by copyright, Copyright © 1994-2022 by WebMD LLC. This website also contains material copyrighted by 3rd parties.',
        langMenu: [
          {
            path: 'http://www.webmd.com/',
            name: 'English'
          },
          {
            path: 'http://www.deutsch.webmd.com/',
            name: 'Deutsch'
          }
        ]
      }
    })
  })
  describe('render', () => {
    it('matches the snapshot', () => {
      // Assert
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
