import * as T from '@shared/utils/transformers'

it('should return a capitalize string', () => {
  const sut = T.capitalizeName('john doe')

  expect(sut).toEqual('John Doe')
})

describe('extractBase64', () => {
  it('should should return null', () => {
    const sut = T.extractBase64('unexpectedBaseB4')

    expect(sut).toBeNull()
  })

  it('should should remove everything before base64content', () => {
    const imageString = 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB'
    const base64Content = '/9j/4AAQSkZJRgAB'
    const sut = T.extractBase64(imageString)

    expect(sut).toBe(base64Content)
  })
})

describe('extractTypeFromBase64', () => {
  it('should should empty string', () => {
    const sut = T.extractTypeFromBase64('unexpectedBaseB4')

    expect(sut).toBe('')
  })

  it('should should remove everything before base64content', () => {
    const imageType = 'jpeg'
    const imageString = `data:image/${imageType};base64,/9j/4AAQSkZJRgAB`
    const sut = T.extractTypeFromBase64(imageString)

    expect(sut).toBe(imageType)
  })
})
