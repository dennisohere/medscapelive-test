import dayjs from 'dayjs'
const MS_IN_MINUTES = 60 * 1000
const DEFAULT_DURATION_MINUTES = 60

export const getLocalTimeZoneString = (eventTime: string, startDate: any) => {
  if (!eventTime || !startDate) {
    return ''
  }
  const eventStartDateTime = ignoreDst(new Date(startDate))
  return eventTime + ' ' + getLocalTimeZone(eventStartDateTime)
}

export const formatTime = function(date: any) {
  return dayjs(date).format('YYYYMMDDTHHmm00')
}
export const formatTimeForOutlook = function(date: any) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:00')
}

export const calculateEndTime = function(date: any) {
  return formatTime(
    new Date(
      new Date(date).getTime() + DEFAULT_DURATION_MINUTES * MS_IN_MINUTES
    )
  )
}

export const calculateEndTimeForOutlook = function(date: any) {
  return formatTimeForOutlook(
    new Date(
      new Date(date).getTime() + DEFAULT_DURATION_MINUTES * MS_IN_MINUTES
    )
  )
}

const ignoreDst = (datetime: Date) => {
  const result = datetime
  if (isDstObserved(datetime)) {
    result.setTime(datetime.getTime() - 60 * 60 * 1000)
  }
  return result
}

const getLocalTimeZone = (datetime?: Date) => {
  if (datetime === undefined || datetime === null) {
    return ''
  }
  const timeZonefilter = datetime.toString().match(/\(([A-Za-z\s].*)\)/)
  let timeZonefilter01 = ''

  if (
    timeZonefilter !== undefined &&
    timeZonefilter !== null &&
    timeZonefilter.length > 1
  ) {
    timeZonefilter01 = timeZonefilter[1]
  }
  const result = timeZonefilter01.match(/\b([A-Z])/g)?.join('')
  return result
}

const isDstObserved = (datetime: Date) => {
  return datetime.getTimezoneOffset() < stdTimezoneOffset(datetime)
}

const stdTimezoneOffset = (datetime: Date) => {
  const jan = new Date(datetime.getFullYear(), 0, 1)
  const jul = new Date(datetime.getFullYear(), 6, 1)
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
}
