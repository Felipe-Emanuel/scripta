import { isPasswordStrong } from '@shared/utils/validation'

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
