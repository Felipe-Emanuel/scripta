import { getWeekNumber, isToday } from 'src/shared/utils/dates'
import { progressGoal } from 'src/shared/utils/objectValidations'
import {
  generateStrongPass,
  isPasswordStrong,
} from 'src/shared/utils/stringValidations'

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

describe('getWeekNumber', () => {
  it('should return weeks number correctly', () => {
    const today = new Date('2024-03-05T00:55:15.917Z')

    const sut = getWeekNumber(today)
    expect(sut).toBe(1)
  })
})

describe('generateStrongPass', () => {
  it('should generate a strong password with 12 characters', () => {
    const sut = generateStrongPass()

    expect(sut.length).toBe(12)
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
