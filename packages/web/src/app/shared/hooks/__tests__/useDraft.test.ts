import { randomUUID } from 'crypto'
import { useDraft } from '../useDraft'
import { useLocalStorage } from '../useLocalStorage'
import { renderHook } from '@testing-library/react'

type TDraftToTest = {
  id: string
  content: 'mocked' | 'updated' | 'deleted'
}

describe('useDraft', () => {
  const { getLocalStorage } = useLocalStorage()
  const { result } = renderHook(() => useDraft<TDraftToTest>('newBook'))
  const { updateDraft, clearDraft } = result.current

  const newDraftMocked: TDraftToTest = {
    id: randomUUID(),
    content: 'mocked'
  }

  it('should create a new draft and receive the correctly dinamic type', () => {
    updateDraft(newDraftMocked)

    const draft: TDraftToTest = getLocalStorage('newBook')

    expect(draft.content).toBe('mocked')
  })

  it('should update a existent draft', () => {
    const oldDraft: TDraftToTest = getLocalStorage('newBook')

    expect(oldDraft.content).toBe('mocked')

    updateDraft({
      ...newDraftMocked,
      content: 'updated'
    })

    const draft: TDraftToTest = getLocalStorage('newBook')

    expect(draft.content).toBe('updated')
  })

  it('should clear a existent draft', () => {
    updateDraft({
      ...newDraftMocked,
      content: 'deleted'
    })

    clearDraft()

    const draft: TDraftToTest = getLocalStorage('newBook')

    expect(draft).toBeNull()
  })
})
