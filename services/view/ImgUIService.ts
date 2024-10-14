import { UIServiceBase } from './base/UIServiceBase'
import * as LABEL from '~/core/constants/user-facing-strings/label-strings'
import * as ASSETS from '~/core/constants/asset-paths'
import { type ImgAttribute } from '~/models/view/ImgAttribute'

export class ImgUIService extends UIServiceBase {
  readonly medscapeLogo: ImgAttribute = { alt: LABEL.MEDSCAPE_LOGO_ALT }
  readonly medscapeLiveLogo: ImgAttribute = {
    src: ASSETS.MEDSCAPE_LIVE_LOGO_WHITE,
    alt: 'white logo of medscape live events',
    title: 'white medscape live logo'
  }

  readonly dropDownIndicator: ImgAttribute = {
    title: 'dropdown',
    src: ASSETS.DROP_DOWN_INDICATOR,
    alt: 'blue upside down chevron'
  }

  readonly rightIndicator: ImgAttribute = {
    src: ASSETS.RIGHT_INDICATOR,
    alt: 'right indictation',
    title: 'right pointing chevron'
  }

  readonly leftIndicator: ImgAttribute = {
    src: ASSETS.LEFT_INDICATOR,
    alt: 'left pointing chevron',
    title: 'left indicator'
  }

  readonly medscapeLiveImage: ImgAttribute = {
    src: ASSETS.EMAIL_FORM_IMAGE,
    alt: 'medscape live event ticket in envelope',
    title: 'ticket image'
  }

  readonly brandlessEnvelopeImage: ImgAttribute = {
    src: ASSETS.MEDSCAPE_LIVE_REGISTRATION_CONFIRM_ENVELOPE,
    alt: 'Event ticket in envelope',
    title: 'Event ticket image'
  }

  readonly addToCalendarGoogleImage: ImgAttribute = {
    src: ASSETS.GOOGLE_CALENDAR_IMAGE,
    alt: 'add live event to google calendar',
    title: 'Add To Google Calendar'
  }

  readonly addToCalendarOutlookImage: ImgAttribute = {
    src: ASSETS.OUTLOOK_CALENDAR_IMAGE,
    alt: 'add live event to outlook calendar',
    title: 'Add To Outlook Calendar'
  }

  readonly addToCalendarYahooImage: ImgAttribute = {
    src: ASSETS.YAHOO_CALENDAR_IMAGE,
    alt: 'add live event to yahoo calendar',
    title: 'Add To Yahoo Calendar'
  }

  readonly downloadEventIcsImage: ImgAttribute = {
    src: ASSETS.ICS_CALENDAR_IMAGE,
    alt: 'download live event ics file',
    title: 'ICS File'
  }

  readonly medscapeLiveRegistrationUnavailableImage: ImgAttribute = {
    src: ASSETS.REGISTER_UNAVAILABLE_IMAGE,
    alt: 'Event not available in your region',
    title: 'Registration unavilable image'
  }

  readonly medscapeLiveRegistrationErrorCloseImage: ImgAttribute = {
    src: ASSETS.REGISTER_ERROR_CLOSE,
    alt: 'Internal Server Error',
    title: 'Internal Server Error'
  }

  readonly userNotFoundIcon: ImgAttribute = {
    src: ASSETS.USER_NOT_FOUND_ICON,
    alt: LABEL.USER_NOT_FOUND_ALT
  }

  readonly homeHeroImage: ImgAttribute = {
    src: ASSETS.HOME_BLUE_HERO_HEADER,
    srcSet: ASSETS.HOME_BLUE_HERO_HEADER_SRCSET,
    title: 'global data header',
    alt:
      'header abstract image of globe and decentralized network and data dashboards'
  }

  readonly locationIcon: ImgAttribute = {
    src: ASSETS.LIVE_EVENT_LOCATION_ICON,
    alt: 'event location'
  }

  readonly specialtyIcon: ImgAttribute = {
    src: ASSETS.LIVE_EVENT_SPECIALTY_ICON,
    alt: 'event specialty'
  }

  readonly clockIcon: ImgAttribute = {
    src: ASSETS.LIVE_EVENT_CLOCK_ICON,
    alt: 'event time'
  }

  readonly liveEventPreviewDefaultImages: ImgAttribute[] = [
    {
      src: ASSETS.LIVE_EVENT_PLACEHOLDER_IMG1,
      title: 'live event card image'
    },
    {
      src: ASSETS.LIVE_EVENT_PLACEHOLDER_IMG2,
      title: 'live event card image'
    },
    {
      src: ASSETS.LIVE_EVENT_PLACEHOLDER_IMG3,
      title: 'live event card image'
    }
  ]

  private imgIterator = 0
  get liveEventPreviewDefault(): ImgAttribute {
    const images = this.liveEventPreviewDefaultImages
    const index = this.imgIterator % images.length
    const image = images[index]
    this.imgIterator++
    return image
  }

  readonly mngEventPreviewDefaultImages: ImgAttribute[] = [
    {
      src: ASSETS.MNG_EVENT_PLACEHOLDER_IMG1,
      title: 'mng event card image'
    },
    {
      src: ASSETS.MNG_EVENT_PLACEHOLDER_IMG2,
      title: 'mng event card image'
    },
    {
      src: ASSETS.MNG_EVENT_PLACEHOLDER_IMG3,
      title: 'mng event card image'
    },
    {
      src: ASSETS.MNG_EVENT_PLACEHOLDER_IMG4,
      title: 'mng event card image'
    },
    {
      src: ASSETS.MNG_EVENT_PLACEHOLDER_IMG5,
      title: 'mng event card image'
    }
  ]

  private imgMngIterator = 0
  get mngEventPreviewDefault(): ImgAttribute {
    const images = this.mngEventPreviewDefaultImages
    const index = this.imgMngIterator % images.length
    const image = images[index]
    this.imgMngIterator++
    return image
  }

  readonly circleCheckIcon: ImgAttribute = {
    src: ASSETS.LIVE_EVENT_CIRCLE_CHECK,
    title: 'circle check'
  }

  readonly hybridChevronIcon: ImgAttribute = {
    src: ASSETS.HYBRID_CHEVRON,
    alt: 'hybrid dialog chevron left'
  }

  readonly hybridVirtualGraphic: ImgAttribute = {
    src: ASSETS.HYBRID_VIRTUAL,
    alt: 'hybrid dialog at home graphic'
  }

  readonly hybridInPersonGraphic: ImgAttribute = {
    src: ASSETS.HYBRID_IN_PERSON,
    alt: 'hybrid dialog in person graphic'
  }
}
