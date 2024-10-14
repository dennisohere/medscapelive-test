import {
  getValueFromWindow,
  getCookieValue,
  createScript
} from '~/core/utility/util'

let docCookie: any
if (typeof window !== 'undefined') {
  docCookie = document.cookie
}

const userInEU = getValueFromWindow('userInEU')
const usScript = 'https://bh.contextweb.com/cp?'
const euScript = 'https://bh-eu.contextweb.com/cp?'
const qsData = {
  p: '',
  pageurl: '',
  referrer: '',
  ev_id: '',
  did: '',
  epid: '',
  pf: '',
  usp: '',
  huid: '',
  auth_channel: '',
  pvid: '',
  val: '',
  p_subdomain: ''
}
const qsUSData = {
  us_privacy: ''
}
const qsEUData = {
  gdpr_consent: ''
}

const createData = (pId: string) => {
  qsData.p = pId
  qsData.pageurl = encodeURIComponent(window.location.href)
  qsData.referrer = encodeURIComponent(document.referrer)
  qsData.ev_id = getValueFromWindow('PageMetadata.userSegVars.gd')
  qsData.epid = getValueFromWindow('PageMetadata.extraObject.nid')
  qsData.pf = getValueFromWindow('PageMetadata.userSegVars.pf')
  qsData.usp = getValueFromWindow('PageMetadata.userSegVars.usp')
  qsData.auth_channel = getValueFromWindow(
    'PageMetadata.authVar.authenticationChannel'
  )
  qsData.val = getValueFromWindow('PageMetadata.userSegVars.val')

  if (userInEU === 'true') {
    qsData.p_subdomain = 'bh-eu'
    qsEUData.gdpr_consent = getCookieValue(docCookie, 'eupubconsent-v2') || ''
  } else {
    qsData.p_subdomain = 'bh'
    qsUSData.us_privacy = getCookieValue(docCookie, 'usprivacy') || ''
  }
}

const createPixel = () => {
  // don't run for certain auth channels
  if (
    [undefined, null, '', '100', '109', '111', '113', '114'].includes(
      qsData.auth_channel
    )
  ) {
    return
  }
  let queryString = ''
  for (const [key, value] of Object.entries(qsData)) {
    queryString += `${key}=${value}&`
  }
  if (queryString.length > 0) {
    queryString = queryString.substring(0, queryString.length - 1)
  }

  if (userInEU === 'true') {
    let queryStringEu = queryString
    if (docCookie.match(/OptanonConsent[^;]+&groups[^;]+C0002%3A1/) != null) {
      for (const [key, value] of Object.entries(qsEUData)) {
        queryStringEu += `&${key}=${value}`
      }
      createScript(euScript + queryStringEu, 'eu-script')
    }
  } else {
    let queryStringUs = queryString
    for (const [key, value] of Object.entries(qsUSData)) {
      queryStringUs += `&${key}=${value}`
    }
    createScript(usScript + queryStringUs, 'us-script')
  }
}
const initPulsePointPixel = (pId: string) => {
  createData(pId)
  createPixel()
}

export const loadPulsePointPixel = (pId: string) => {
  if (document.readyState !== 'loading') {
    initPulsePointPixel(pId)
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      initPulsePointPixel(pId)
    })
  }
}
