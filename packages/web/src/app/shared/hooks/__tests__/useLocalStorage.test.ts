import { useLocalStorage } from '@shared/hooks/useLocalStorage'
import { renderHook } from '@testing-library/react'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  const { result: localStorageResult } = renderHook(() => useLocalStorage())
  const { getLocalStorage, setLocalStorage, STORAGE_KEY } = localStorageResult.current

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
