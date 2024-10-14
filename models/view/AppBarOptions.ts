import { type ImgAttribute } from './ImgAttribute'
import {
  MEDSCAPE_LIVE_LOGO_COLOR,
  MEDSCAPE_LIVE_LOGO_WHITE
} from '~/core/constants/asset-paths'

export const defaultAppBarOptions = {
  hideOnScroll: false,
  flat: false,
  color: 'white',
  showExtension: false,
  navIconColor: '',
  logoImg: {
    title: 'medscape live logo',
    alt: 'logo of medscape live events',
    src: MEDSCAPE_LIVE_LOGO_COLOR
  } as ImgAttribute
}

export type AppBarOptions = typeof defaultAppBarOptions

export const eventAppBarOptions: AppBarOptions = {
  hideOnScroll: true,
  flat: true,
  color: '#005b81',
  showExtension: true,
  navIconColor: 'white',
  logoImg: {
    src: MEDSCAPE_LIVE_LOGO_WHITE,
    title: 'white medscape live logo',
    alt: 'white logo of medscape live events'
  } as ImgAttribute
}

export const blueAppBarOptionsNoExtension: AppBarOptions = {
  hideOnScroll: false,
  flat: true,
  color: '#005b81',
  showExtension: false,
  navIconColor: 'white',
  logoImg: { src: MEDSCAPE_LIVE_LOGO_WHITE } as ImgAttribute
}
