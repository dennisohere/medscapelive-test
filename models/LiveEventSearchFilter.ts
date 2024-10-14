export default class LiveEventSearchFilter {
  specialtyKey: string = ''
  specialtyDisplay: string = ''
  locations?: string[]
  constructor(init?: Partial<LiveEventSearchFilter>) {
    Object.assign(this, init)
  }
}
