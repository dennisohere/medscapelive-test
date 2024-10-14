
export default {
  data() {
    return {
      dateFormatConfig: {
        dayOfWeekNames: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        dayNames: [
          '1st',
          '2nd',
          '3rd',
          '4th',
          '5th',
          '6th',
          '7th',
          '8th',
          '9th',
          '10th',
          '11th',
          '12th',
          '13th',
          '14th',
          '15th',
          '16th',
          '17th',
          '18th',
          '19th',
          '20th',
          '21st',
          '22nd',
          '23rd',
          '24th',
          '25th',
          '26th',
          '27th',
          '28th',
          '29th',
          '30th',
          '31st'
        ]
      }
    }
  },
  methods: {
    getDescription(description: string): string {
      const maxChar = 150

      if (description === undefined || description === null) {
        return ''
      }
      return description?.length > maxChar
        ? description?.substring(0, maxChar) + '....'
        : description
    },
    getSpeakers(speakers: string[]): string {
      if (speakers === undefined) {
        return ''
      }
      return speakers.join(', ')
    },
    getEventDateTimeFormatted(startDate: any, endDate: any): Array<string> {
      const result = this.getEventDateTime(startDate, endDate)
      return result.split(' | ')
    },
    getEventDateTime(startDate: any, endDate: any): string {
      if (startDate === undefined || startDate === null) {
        return ''
      }
      const oneDayMilliSec = 1000 * 60 * 60 * 24
      const eventStartDateTime = new Date(startDate)

      let totalDuration = 0
      if (endDate === undefined || endDate === null) {
        return this.getSingleDayEventDetail(eventStartDateTime, totalDuration)
      }

      const eventEndDateTime = new Date(endDate)
      totalDuration = eventEndDateTime.valueOf() - eventStartDateTime.valueOf()

      const days = Math.floor(totalDuration / oneDayMilliSec)
      if (days === 0) {
        return this.getSingleDayEventDetail(eventStartDateTime, totalDuration)
      }
      return this.getMultiDayEventDetail(eventStartDateTime, eventEndDateTime)
    },
    getSingleDayEventDetail(currentDate: Date, durationInMs: number): string {
      const formatedMonth = this.dateFormatConfig.monthNames[
        currentDate.getMonth()
      ]
      const formatedDay = this.dateFormatConfig.dayOfWeekNames[
        currentDate.getDay()
      ]
      const formatedDate = this.dateFormatConfig.dayNames[
        currentDate.getDate() - 1
      ]
      const formatedCurrentDay = `${formatedDay}, ${formatedMonth} ${formatedDate}`
      const formatedDuration = this.formatDuration(currentDate, durationInMs)
      return `${formatedCurrentDay} @ ${formatedDuration}`
    },
    getMultiDayEventDetail(startDate: any, endDate: any) {
      const formatedStartMonth = this.dateFormatConfig.monthNames[
        startDate.getMonth()
      ]

      const formatedStartDate = this.dateFormatConfig.dayNames[
        startDate.getDate() - 1
      ]
      let formatedStartDateTime = `${formatedStartMonth} ${formatedStartDate}`

      const formatedEndDate = this.dateFormatConfig.dayNames[
        endDate.getDate() - 1
      ]
      let formatedEndDateTime = formatedEndDate
      const formatedEndMonth = this.dateFormatConfig.monthNames[
        endDate.getMonth()
      ]

      // Check whether start & end date months are same or not
      if (startDate.getMonth() !== endDate.getMonth()) {
        formatedEndDateTime = `${formatedEndMonth} ${formatedEndDate}`
      }

      // Check whether start & end date years are same or not
      if (startDate.getFullYear() !== endDate.getFullYear()) {
        formatedStartDateTime = `${formatedStartDateTime} ${startDate.getFullYear()}`
        formatedEndDateTime = `${formatedEndMonth} ${formatedEndDate} ${endDate.getFullYear()}`
      }

      return `${formatedStartDateTime} - ${formatedEndDateTime}`
    },
    formatDuration(currentDate: Date, duration: number) {
      const time = this.getTime(currentDate)
      let result = `${time}`
      if (duration > 0) {
        const hours = this.getHour(duration)
        const minutes = this.getMinute(duration)
        const hourResult =
          hours > 0 ? (hours > 1 ? `${hours} hrs` : `${hours} hr`) : ''
        const minutesResult = minutes > 0 ? `${minutes} min` : ''
        result =
          `${time} | ${hourResult}` +
          (hourResult !== '' ? ` ${minutesResult}` : `${minutesResult}`)
      }
      return result
    },
    getHour(milliseconds: number) {
      // 1- Convert to seconds:
      const seconds = milliseconds / 1000
      // 2- Extract hours:
      const hours = Math.trunc(seconds / 3600) // 3,600 seconds in 1 hour
      return hours
    },
    getMinute(milliseconds: number) {
      // 1- Convert to seconds:
      let seconds = milliseconds / 1000
      seconds = seconds % 3600 // seconds remaining after extracting hours
      // 2- Extract minutes:
      const minutes = seconds / 60 // 60 seconds in 1 minute
      return minutes
    },
    getTime(datetime: Date) {
      const d = new Date(datetime)
      let hours = d.getHours()
      const min = d.getMinutes()
      const ampm = hours >= 12 ? ' pm' : 'am'
      hours = hours % 12
      hours = hours === 0 ? 12 : hours
      const minuteReult = min > 0 ? ':' + min.toString() : ''
      const result =
        hours.toString() +
        minuteReult +
        ' ' +
        ampm +
        ' ' +
        this.getLocalTimeZone(datetime)
      return result
    },
    getLocalTimeZone(datetime?: Date) {
      if (datetime === undefined || datetime === null) {
        return ''
      }
      const timeZonefilter = datetime.toString().match(/\(([A-Za-z\s].*)\)/)
      let result = ''
      if (
        timeZonefilter !== undefined &&
        timeZonefilter !== null &&
        timeZonefilter.length > 1
      ) {
        result = timeZonefilter[1]
      }

      const timeZonefilter01 = result.match(/\b([A-Z])/g)
      if (
        timeZonefilter01 !== undefined &&
        timeZonefilter01 !== null &&
        timeZonefilter01.length > 1
      ) {
        result = timeZonefilter01.join('')
      }
      return result
    },
    stdTimezoneOffset(datetime: Date) {
      const jan = new Date(datetime.getFullYear(), 0, 1)
      const jul = new Date(datetime.getFullYear(), 6, 1)
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
    },
    isDstObserved(datetime: Date) {
      return datetime.getTimezoneOffset() < this.stdTimezoneOffset(datetime)
    },
    ignoreDst(datetime: Date) {
      const result = datetime
      if (this.isDstObserved(datetime)) {
        result.setTime(datetime.getTime() - 60 * 60 * 1000)
      }
      return result
    },
    getLocalTimeZoneString(eventTime: string, startDate: any) {
      console.log('getLocalTimeZoneString', eventTime, startDate)
      if (!eventTime || !startDate) {
        return ''
      }
      const eventStartDateTime = new Date(startDate)
      return eventTime + ' ' + this.getLocalTimeZone(eventStartDateTime)
    }
  }
}
