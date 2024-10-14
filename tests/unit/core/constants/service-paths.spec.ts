import { describe, it, expect } from 'vitest'
import {
  EVENTS_SEARCH,
  EVENTS,
  EVENTS_SEARCH_FILTERS
} from '@/core/constants/service-paths'

describe('search-paths constants', () => {
  it('verifies all values', () => {
    // Assert
    expect(EVENTS).toEqual('events')
    expect(EVENTS_SEARCH).toEqual('search')
    expect(EVENTS_SEARCH_FILTERS).toEqual('search/filters')
  })
})
