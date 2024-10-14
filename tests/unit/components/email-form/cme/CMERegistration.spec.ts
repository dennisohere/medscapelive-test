import { AxiosError, AxiosResponse } from 'axios'
import { Wrapper } from '@vue/test-utils'
import { createNuxtTestWrapper } from '../../../setup/create-wrapper'
import CMERegistration from '@/components/email-form/cme/CMERegistration.vue'
import {
  mockWindowLocation,
  unmockWindowLocation
} from '~/tests/unit/setup/mock-window-location'
import { ERROR_PROCESSING_EMAIL } from '~/core/constants/user-facing-strings/error-strings'
describe('CMERegistration', () => {
  let wrapper: Wrapper<CMERegistration>
  beforeEach(() => {
    wrapper = createNuxtTestWrapper(CMERegistration)
    mockWindowLocation()
  })
  afterEach(() => {
    unmockWindowLocation()
  })
  describe('methods', () => {
    describe('sendEmailForm', () => {
      it('sets isFailure = false', async () => {
        wrapper.vm.$liveEventService.registerUserWithCme = jest.fn()
        wrapper.vm.$data.isFailure = true

        // Act
        await (wrapper.vm as any).sendEmailForm()

        // Assert
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$data.isFailure).toBeFalsy()
      })
      describe('activityId param exists', () => {
        const expectedActivityId = 'some-id'
        beforeEach(() => {
          wrapper.vm.$router.push({
            name: 'cmeRoute',
            params: { activityId: expectedActivityId }
          })
        })
        afterEach(() => {
          wrapper.vm.$router.push('/other-route')
        })
        describe('email is set', () => {
          const expectedEmail = 'yo@mommas.com'
          beforeEach(() => {
            wrapper.vm.$data.email = expectedEmail
          })
          it('calls registerUserWithCme with email and activityId and sets isLoading = true', async () => {
            wrapper.vm.$liveEventService.registerUserWithCme = jest.fn()
            wrapper.vm.$data.isLoading = false

            // Act
            await (wrapper.vm as any).sendEmailForm()

            // Assert
            await wrapper.vm.$nextTick()
            expect(wrapper.vm.$data.isLoading).toBeTruthy()
            expect(
              wrapper.vm.$liveEventService.registerUserWithCme
            ).toHaveBeenCalledWith(expectedEmail, expectedActivityId)
          })

          describe('Happy path', () => {
            const expectedResult =
              'https://www.cmeuniversity.com/medscape/?p=%2FHBOi6QzoxEPWaBQrk7mQNStvfCqD0CZ5y2DA7b6P7'
            beforeEach(() => {
              wrapper.vm.$liveEventService.registerUserWithCme = jest
                .fn()
                .mockResolvedValueOnce(expectedResult)
            })
            it('assigns the window location to the registration URL', async () => {
              // Act
              await (wrapper.vm as any).sendEmailForm()

              // Assert
              await wrapper.vm.$nextTick()

              expect(
                wrapper.vm.$liveEventService.registerUserWithCme
              ).toHaveBeenCalledWith(expectedEmail, expectedActivityId)
              await wrapper.vm.$nextTick()
              expect(window.location.assign).toHaveBeenLastCalledWith(
                expectedResult
              )
            })
          })

          describe('Failure path', () => {
            describe('error message exists', () => {
              const errorMessage = 'yomommas errorMessage'
              const error = {
                isAxiosError: true,
                response: {
                  data: {
                    message: errorMessage
                  }
                } as AxiosResponse
              } as AxiosError
              beforeEach(() => {
                wrapper.vm.$liveEventService.registerUserWithCme = jest
                  .fn()
                  .mockRejectedValueOnce(error)
              })

              it('sets isLoading = false, isFailure = true and errorMessage to error from server', async () => {
                // Act
                await (wrapper.vm as any).sendEmailForm()

                // Assert
                await wrapper.vm.$nextTick()
                expect(wrapper.vm.$data.isLoading).toBeFalsy()
                expect(wrapper.vm.$data.isFailure).toBeTruthy()
                expect(wrapper.vm.$data.errorMessage).toEqual(errorMessage)
              })
            })
            describe('error message does not exist', () => {
              const error = {
                isAxiosError: true,
                response: {} as AxiosResponse
              } as AxiosError
              beforeEach(() => {
                wrapper.vm.$liveEventService.registerUserWithCme = jest
                  .fn()
                  .mockRejectedValueOnce(error)
              })

              it('sets isLoading = false, isFailure = true and errorMessage to generic error processing error message', async () => {
                // Act
                await (wrapper.vm as any).sendEmailForm()

                // Assert
                await wrapper.vm.$nextTick()
                expect(wrapper.vm.$data.isLoading).toBeFalsy()
                expect(wrapper.vm.$data.isFailure).toBeTruthy()
                expect(wrapper.vm.$data.errorMessage).toEqual(
                  ERROR_PROCESSING_EMAIL
                )
              })
            })
          })
        })
        describe('no email', () => {
          it('does not Register the attendee', async () => {
            wrapper.vm.$liveEventService.registerUserWithCme = jest.fn()
            // Act
            await (wrapper.vm as any).sendEmailForm()

            // Assert
            await wrapper.vm.$nextTick()
            expect(
              wrapper.vm.$liveEventService.registerUserWithCme
            ).not.toHaveBeenCalled()
          })
        })
      })

      describe('no activityId param', () => {
        beforeEach(() => {
          wrapper.vm.$router.push('/no-param-route')
        })
        it('does not register the attendee', async () => {
          const expectedEmail = 'yo@mommas.com'
          ;(wrapper.vm as any).email = expectedEmail

          wrapper.vm.$liveEventService.registerUserWithCme = jest.fn()

          // Act
          await (wrapper.vm as any).sendEmailForm()

          // Assert
          await wrapper.vm.$nextTick()
          expect(
            wrapper.vm.$liveEventService.registerUserWithCme
          ).not.toHaveBeenCalled()
        })
      })
    })
  })
})
