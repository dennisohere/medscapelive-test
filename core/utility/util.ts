export const getValueFromWindow = (key: string, defaultValue = ''): string => {
  if (typeof window !== 'undefined') {
    const keys = key.split('.')

    let obj = window as { [key: string]: any }
    for (let i = 0; i < keys.length; i++) {
      const prop = keys[i]
      // eslint-disable-next-line no-prototype-builtins
      if (!obj || !obj.hasOwnProperty(prop)) {
        return defaultValue
      } else {
        obj = obj[prop]
      }
    }

    return obj.toString()
  } else {
    return defaultValue
  }
}

export const getCookieValue = (cookies: any, name: string) => {
  if (typeof window !== 'undefined') {
    const cookie = cookies.split(';').find((c: any) => matchesName(c, name))

    if (cookie) {
      return cookie.trim().substring(name.length + 1)
    }

    return null
  } else {
    return null
  }
}

export const matchesName = (cookie: string, name: string) =>
  cookie
    .split('=')[0]
    .trim()
    .toLowerCase() === name.toLowerCase()

export const createScript = (content: any, id: any) => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = id
    script.setAttribute('src', content)
    script.async = true
    document.head.appendChild(script)
  }
}
