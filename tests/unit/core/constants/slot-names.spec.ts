import * as slotNames from '@/core/constants/slot-names'
import { describe, it, expect } from 'vitest'

describe('slot names', () => {
  it('verifies that there are no duplicate keys/values', () => {
    // Arrange
    const variableNames: string[] = Object.values(slotNames)

    const variableValues: string[] = Object.keys(slotNames)

    // Act

    // Assert
    expect(variableNames).toEqual(Array.from(new Set(variableNames)))
    expect(variableValues).toEqual(Array.from(new Set(variableValues)))
  })
})
