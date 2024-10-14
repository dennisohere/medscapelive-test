import { describe, it, expect } from 'vitest'
import { YYYY_MM_DD, MM_DD_YYYY } from '@/core/constants/date-formats'

describe('date-formats constants', () => {
  it('verifies all values', () => {
    // Assert
    expect(YYYY_MM_DD).toEqual('YYYY-MM-DD')
    expect(MM_DD_YYYY).toEqual('MM-DD-YYYY')
  })
})
