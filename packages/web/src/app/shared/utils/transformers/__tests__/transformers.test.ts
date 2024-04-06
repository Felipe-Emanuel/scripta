import * as T from '@shared/utils/transformers'

it('should return a capitalize string', () => {
  const sut = T.capitalizeName('john doe')

  expect(sut).toEqual('John Doe')
})
