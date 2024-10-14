import { Wrapper } from '@vue/test-utils'
import { createNuxtTestWrapper } from '../../setup/create-wrapper'
import EmailForm from '@/components/email-form/EmailForm.vue'
describe('EmailForm', () => {
  let wrapper: Wrapper<EmailForm>
  beforeEach(() => {
    wrapper = createNuxtTestWrapper(EmailForm)
  })
  describe('methods', () => {
    describe('validateEmail', () => {
      describe('valid email', () => {
        it('returns true', () => {
          const email = 'yomommas@email.com'
          // Act
          const actualResult = (wrapper.vm as any).validateEmail(email)

          // Assert
          expect(actualResult).toBeTruthy()
        })
      })
      describe('invalid email', () => {
        const expectedInvalidEmailMessage = 'Please enter a valid email address'
        it('returns invalid email message', () => {
          const email = 'yomommas@.com'

          // Act
          const actualResult = (wrapper.vm as any).validateEmail(email)

          // Assert
          expect(actualResult).toEqual(expectedInvalidEmailMessage)
        })
        it('returns invalid email message', () => {
          const email = '.com'

          // Act
          const actualResult = (wrapper.vm as any).validateEmail(email)

          // Assert
          expect(actualResult).toEqual(expectedInvalidEmailMessage)
        })
        it('returns invalid email message', () => {
          const email = 'yo momma@ma.com'

          // Act
          const actualResult = (wrapper.vm as any).validateEmail(email)

          // Assert
          expect(actualResult).toEqual(expectedInvalidEmailMessage)
        })
        it('returns invalid email message', () => {
          const email = 'j@a.c'

          // Act
          const actualResult = (wrapper.vm as any).validateEmail(email)

          // Assert
          expect(actualResult).toEqual(expectedInvalidEmailMessage)
        })
        it('returns invalid email message', () => {
          const email = 'yomommas@email.com.'

          // Act
          const actualResult = (wrapper.vm as any).validateEmail(email)

          // Assert
          expect(actualResult).toEqual(expectedInvalidEmailMessage)
        })
      })
    })
  })
})
