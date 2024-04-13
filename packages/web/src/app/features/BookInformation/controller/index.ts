import { useCallback, useState } from 'react'
import { deleteBook, patchActiveOrConcluedBook } from '../services'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'
import { TPatchActiveBookRequest } from '@shared/types'

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

  const handlePatchActiveOrConcluedBook = useCallback(
    async (where: TPatchActiveBookRequest['where']) => {
      if (selectedBook) {
        const patchedBook = await patchActiveOrConcluedBook({
          bookId: selectedBook?.id,
          where
        })

        patchedBook && choiseBookToSeeInfo(patchedBook)

        return patchedBook
      }
    },
    [choiseBookToSeeInfo, selectedBook]
  )

  const handleDeleteBook = useCallback(async () => {
    if (selectedBook) {
      const deletedBook = await deleteBook(selectedBook.id)

      return deletedBook
    }
  }, [selectedBook])

  return {
    isCharactersCardHovered,
    action,
    setIsCharactersCardHovered,
    toggleDeleting,
    toggleDesactiving,
    handlePatchActiveOrConcluedBook,
    handleDeleteBook
  }
}
