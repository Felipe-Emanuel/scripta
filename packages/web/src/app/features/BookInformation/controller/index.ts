import { useCallback, useState } from 'react'
import { patchActiveBook } from '../services'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'

export const useBookInformationController = () => {
  const { choiseBookToSeeInfo, selectedBook } = useBookInformation()
  const [isCharactersCardHovered, setIsCharactersCardHovered] = useState(false)
  const [action, setAction] = useState({
    isDeleting: false,
    isDesactiving: false
  })

  const toggleDeleting = () =>
    setAction({
      ...action,
      isDeleting: !action.isDeleting
    })

  const toggleDesactiving = () =>
    setAction({
      ...action,
      isDesactiving: !action.isDesactiving
    })

  const handleDesactiveBook = useCallback(async () => {
    if (selectedBook) {
      const patchedBook = await patchActiveBook(selectedBook?.id)

      patchedBook && choiseBookToSeeInfo(patchedBook)

      return patchedBook
    }
  }, [choiseBookToSeeInfo, selectedBook])

  return {
    isCharactersCardHovered,
    action,
    setIsCharactersCardHovered,
    toggleDeleting,
    toggleDesactiving,
    handleDesactiveBook
  }
}
