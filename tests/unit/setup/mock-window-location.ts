/* eslint-disable import/no-mutable-exports */
import {vi} from "vitest";

export const originalWindowLocation = window.location

export const mockWindowLocation = () => {
  delete window.location

  const mockLocation = {
    ...Object.getOwnPropertyDescriptors(originalWindowLocation),
    assign: {
      value: vi.fn(),
      configurable: true
    },
    search: {
      value: vi.fn(),
      configurable: true
    },
    replace: {
      value: vi.fn(),
      configurable: true
    }
  }
  window.location = Object.defineProperties({}, mockLocation)
}

export const unmockWindowLocation = () => {
  window.location = originalWindowLocation
}
