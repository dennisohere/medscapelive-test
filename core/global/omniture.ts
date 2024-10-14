/* eslint-disable camelcase */
declare const s_md: { pageURL?: string }
declare const wmdPageLink: (
  module: string,
  element?: EventTarget | null
) => void
declare const wmdPageview: (pageName: string, pageNumber: number) => void
declare const wmdSetContext: (key: string, value: string) => void
declare const wmdRemContext: (key: string | string[]) => void
declare const addLinkTrackVars: (key: string) => void
declare const remLinkTrackVars: (key: string | string[]) => void
export function sendWmdPageview(pageNumber = 0, customPageData: string = '') {
  if (typeof wmdPageview !== 'undefined') {
    try {
      let pageName = location.hostname + location.pathname
      if (customPageData !== '') {
        pageName = pageName + customPageData
      }
      if (s_md) {
        s_md.pageURL = location.href
      }
      wmdPageview(pageName, pageNumber)
    } catch (e) {
      console.error('Unable to run wmdPageview.', e)
    }
  }
}

export function sendWmdPageLink(
  module: string = '',
  element: EventTarget | null,
  userVars: Record<string, string>
) {
  if (typeof wmdPageLink !== 'undefined') {
    try {
      for (const key in userVars) {
        wmdSetContext(key, userVars[key])
        addLinkTrackVars(key)
      }
      wmdPageLink(module, element)
      for (const key in userVars) {
        wmdRemContext(key)
        remLinkTrackVars(key)
      }
    } catch (e) {
      console.error('Unable to run wmdPageLink.', e)
    }
  }
}
