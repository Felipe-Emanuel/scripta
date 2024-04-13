import { formatNumber, isPasswordStrong, progressGoal } from '@shared/utils/validation'

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

describe('progressGoal', () => {
  it('should be able to return goal progress', () => {
    const words = 250
    const goals = 500

    const sut = progressGoal(words, goals)

    expect(sut).toEqual(50)
  })
})

describe('formatNumber', () => {
  it('should returns 10.0k', () => {
    const sut = formatNumber(10000)

    expect(sut).toBe('10.0k')
  })
})
