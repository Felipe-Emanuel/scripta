import '@testing-library/jest-dom'
import { useDraft } from '../useDraft'
import { useLocalStorage } from '../useLocalStorage'

import { act, renderHook } from '@testing-library/react'

// Mock the useLocalStorage hook
jest.mock('../useLocalStorage', () => {
  const actual = jest.requireActual('../useLocalStorage')
  return {
    ...actual,
    useLocalStorage: jest.fn()
  }
})

// Mock the drafts constant
jest.mock('@shared/utils/constants/drafts', () => {
  const actual = jest.requireActual('@shared/utils/constants/drafts')
  return {
    ...actual
  }
})

describe('useDraft() useDraft method', () => {
  let setLocalStorageMock: jest.Mock
  let deleteFromStorageMock: jest.Mock
  let getLocalStorageMock: jest.Mock

  beforeEach(() => {
    setLocalStorageMock = jest.fn()
    deleteFromStorageMock = jest.fn()
    getLocalStorageMock = jest.fn()
    ;(useLocalStorage as jest.Mock).mockReturnValue({
      setLocalStorage: setLocalStorageMock,
      deleteFromStorage: deleteFromStorageMock,
      getLocalStorage: getLocalStorageMock
    })
  })

  describe('Happy Paths', () => {
    it('should return the current draft from local storage', () => {
      // Arrange
      const draftName = 'exampleDraft'
      const expectedDraft = { key: 'value' }
      getLocalStorageMock.mockReturnValue(expectedDraft)

      // Act
      // @ts-expect-error exampleDraft
      const { result } = renderHook(() => useDraft<typeof expectedDraft>(draftName))

      // Assert
      expect(result.current.draft).toEqual(expectedDraft)
    })

    it('should update the draft in local storage', () => {
      // Arrange
      const draftName = 'exampleDraft'
      const initialDraft = { key: 'value' }
      const newDraft = { newKey: 'newValue' }
      getLocalStorageMock.mockReturnValue(initialDraft)

      // Act
      // @ts-expect-error exampleDraft
      const { result } = renderHook(() => useDraft(draftName))
      act(() => {
        result.current.updateDraft(newDraft)
      })

      // Assert
      expect(setLocalStorageMock).toHaveBeenCalledWith(draftName, {
        ...initialDraft,
        ...newDraft
      })
    })

    it('should clear the draft from local storage', () => {
      // Arrange
      const draftName = 'exampleDraft'

      // Act
      // @ts-expect-error exampleDraft
      const { result } = renderHook(() => useDraft(draftName))
      act(() => {
        result.current.clearDraft()
      })

      // Assert
      expect(deleteFromStorageMock).toHaveBeenCalledWith(draftName)
    })
  })

  describe('Edge Cases', () => {
    it('should handle updating a draft when no initial draft exists', () => {
      // Arrange
      const draftName = 'exampleDraft'
      const newDraft = { newKey: 'newValue' }
      getLocalStorageMock.mockReturnValue(undefined)

      // Act
      // @ts-expect-error exampleDraft
      const { result } = renderHook(() => useDraft<typeof newDraft>(draftName))
      act(() => {
        result.current.updateDraft(newDraft)
      })

      // Assert
      expect(setLocalStorageMock).toHaveBeenCalledWith(draftName, newDraft)
    })

    it('should handle clearing a draft that does not exist', () => {
      // Arrange
      const draftName = 'nonExistentDraft'

      // Act
      // @ts-expect-error exampleDraft
      const { result } = renderHook(() => useDraft(draftName))
      act(() => {
        result.current.clearDraft()
      })

      // Assert
      expect(deleteFromStorageMock).toHaveBeenCalledWith(draftName)
    })
  })
})
