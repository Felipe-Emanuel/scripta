import { isToday } from 'src/shared/utils/dates'
import { isPasswordStrong } from 'src/shared/utils/stringValidations'

describe('isPasswordStrong', () => {
  it('should able to validate a strong password', () => {
    const strongPassword = 'A@a12345'

    const sut = isPasswordStrong(strongPassword)

    expect(sut).toBeTruthy()
  })

  it('should able to validate a wrath password', () => {
    const wrathPassword = 'aksnb'

    const sut = isPasswordStrong(wrathPassword)

    expect(sut).not.toBeTruthy()
  })
})

describe('isToday', () => {
  it('should validate if date is today', () => {
    const today = new Date()

    const sut = isToday(today)

    expect(sut).toBe(true)
    expect(sut).not.toBe(false)
  })
})
