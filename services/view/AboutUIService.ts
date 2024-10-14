import { UIServiceBase } from './base/UIServiceBase'
import * as ASSETS from '~/core/constants/asset-paths'
import { CONTACT_US_LINK } from '~/core/constants/router-paths'
import * as ABOUT from '~/core/constants/user-facing-strings/about-user-strings'
import * as LABELS from '~/core/constants/user-facing-strings/label-strings'
import { type ImgAttribute } from '~/models/view/ImgAttribute'

type Card = {
  title: string
  text: string
  img?: ImgAttribute
  bullets?: string[]
}
export class AboutUIService extends UIServiceBase {
  readonly contactUsLink = CONTACT_US_LINK
  readonly contactUsButton = LABELS.CONTACT_US

  readonly heroHeader = ABOUT.HERO_HEADER

  readonly heroBody = ABOUT.HERO_BODY

  readonly heroHeaderSrc = {
    src: ASSETS.ABOUT_HEADER_BACKGROUND,
    srcSet: ASSETS.ABOUT_HEADER_BACKGROUND_SRCSET,
    title: 'hands in',
    alt: 'group of people putting hands into middle of circle'
  }

  readonly marketingCardHeader = ABOUT.CARD_SECTION_HEADER

  readonly cards: Card[] = [
    {
      title: ABOUT.CARD1_TITLE,
      text: ABOUT.CARD1_BODY,
      img: {
        src: ASSETS.ABOUT_MARKETING_CARD1,
        title: 'doctor tablet',
        alt: 'doctor viewing data on ipad'
      }
    },
    {
      title: ABOUT.CARD2_TITLE,
      text: ABOUT.CARD2_BODY,
      img: {
        src: ASSETS.ABOUT_MARKETING_CARD2,
        title: 'medical network',
        alt: 'medical symbols in decentralized network diagram'
      }
    },
    {
      title: ABOUT.CARD3_TITLE,
      text: ABOUT.CARD3_BODY,
      img: {
        src: ASSETS.ABOUT_MARKETING_CARD3,
        title: 'businesswoman network',
        alt:
          'businesswoman viewing sillhouettes in decentralized network diagram'
      }
    },
    {
      title: ABOUT.CARD4_TITLE,
      text: ABOUT.CARD4_BODY,
      img: {
        src: ASSETS.ABOUT_MARKETING_CARD4,
        title: 'handshake',
        alt:
          'labcoat and business suit shaking hands behind overlay of decentralized network diagram'
      }
    }
  ]

  readonly videoHeader = ABOUT.VIDEO_SECTION_HEADER

  readonly videoBody = ABOUT.VIDEO_SECTION_BODY

  readonly videoBulletPoints = [
    ABOUT.VIDEO_SECTION_BULLET1,
    ABOUT.VIDEO_SECTION_BULLET2,
    ABOUT.VIDEO_SECTION_BULLET3,
    ABOUT.VIDEO_SECTION_BULLET4,
    ABOUT.VIDEO_SECTION_BULLET5
  ]

  readonly videoPoster = ASSETS.ABOUT_VIDEO_POSTER
  readonly videoFile = ASSETS.ABOUT_VIDEO_FILE

  readonly blueTitle = ABOUT.BLUE_TITLE
  readonly blueSubtitle = ABOUT.BLUE_SUBTITLE
  readonly blueServices = ABOUT.BLUE_SERVICES

  readonly audienceTitle = ABOUT.AUDIENCE_TITLE
  readonly audienceInfo = ABOUT.AUDIENCE_INFO
  readonly audienceImage: ImgAttribute = {
    src: ASSETS.ABOUT_AUDIENCE_IMAGE,
    title: 'presenters',
    alt: '3 women sitting on stools presenting in live event'
  }
}
