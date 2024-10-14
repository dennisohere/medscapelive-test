import { UIServiceBase } from './base/UIServiceBase'
import {
  HOME_MARKETING_CARD1,
  HOME_MARKETING_CARD2,
  HOME_MARKETING_CARD3
} from '~/core/constants/asset-paths'
import * as B2C from '~/core/constants/user-facing-strings/home-b2c-user-strings'
import { type ImgAttribute } from '~/models/view/ImgAttribute'

type Card = { header: string; body: string; img: ImgAttribute }
export class HomeMarketingUIService extends UIServiceBase {
  readonly b2cCardHeader = B2C.MARKETING_HEADER

  readonly cards: Card[] = [
    {
      header: B2C.CARD1_HEADER,
      body: B2C.CARD1_BODY,
      img: {
        src: HOME_MARKETING_CARD1,
        title: 'global member network',
        alt:
          'abstract image of globe with light beams signifying medscape global membership network'
      }
    },
    {
      header: B2C.CARD2_HEADER,
      body: B2C.CARD2_BODY,
      img: {
        src: HOME_MARKETING_CARD2,
        title: 'doctor pointing',
        alt: 'blurred image of doctor tapping decentralized network diagram'
      }
    },
    {
      header: B2C.CARD3_HEADER,
      body: B2C.CARD3_BODY,
      img: {
        src: HOME_MARKETING_CARD3,
        title: 'global data black',
        alt:
          'darker abstract image of globe and decentralized network and data dashboards'
      }
    }
  ]
}
