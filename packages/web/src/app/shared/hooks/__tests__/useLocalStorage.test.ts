import { useLocalStorage } from '@shared/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  const { getLocalStorage, setLocalStorage, STORAGE_KEY } = useLocalStorage()

  it('should return item from localStorage', () => {
    window.localStorage.setItem(`${STORAGE_KEY}key`, JSON.stringify('John'))

    const sut = getLocalStorage('key')

    expect(sut).toStrictEqual('John')
  })

  it('should add item at localStorage', () => {
    setLocalStorage('key', 'Doe')

    const sut = window.localStorage.getItem(`${STORAGE_KEY}key`)

    expect(sut).toStrictEqual(JSON.stringify('Doe'))
  })
})
