import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { drafts } from '@shared/utils/constants/drafts'

type TDraftName = keyof typeof drafts

export const useDraft = <T>(draftName: TDraftName) => {
  const { setLocalStorage, deleteFromStorage, getLocalStorage } = useLocalStorage()

  const getCurrentDraft = useCallback(
    () => getLocalStorage(draftName),
    [draftName, getLocalStorage]
  )

  const updateDraft = useCallback(
    (newDraft: T) => {
      const currentDraft: T = getLocalStorage(draftName)

      const updatedDraft = {
        ...currentDraft,
        ...newDraft
      }

      setLocalStorage(draftName, updatedDraft)
    },
    [draftName, setLocalStorage, getLocalStorage]
  )

  const clearDraft = useCallback(() => {
    deleteFromStorage(draftName)
  }, [draftName, deleteFromStorage])

  const draft: T = getCurrentDraft()

  return {
    draft,
    updateDraft,
    clearDraft
  }
}
