import * as T from '@shared/utils/transformers'

it('should return a capitalize string', () => {
  const sut = T.capitalizeName('john doe')

  expect(sut).toEqual('John Doe')
})

describe('extrairBase64', () => {
  it('should should return null', () => {
    const sut = T.extrairBase64('unexpectedBaseB4')

    expect(sut).toBeNull()
  })

  it('should should remove everything before base64content', () => {
    const imageString = 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB'
    const base64Content = '/9j/4AAQSkZJRgAB'
    const sut = T.extrairBase64(imageString)

    expect(sut).toBe(base64Content)
  })
})
