import { useTimeout } from '@shared/hooks/useTimeout'
import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react'

jest.useFakeTimers()

describe('useTimeout', () => {
  it('should able to update a situation if it is valid after a selected delay', async () => {
    let situation = true
    const updateSituation = () => (situation = false)
    const delay = 1000
    renderHook(() => useTimeout(situation, updateSituation, delay))

    act(() => {
      jest.advanceTimersByTime(delay)
    })

    await waitFor(() => {
      expect(situation).toEqual(false)
    })
  })
})
