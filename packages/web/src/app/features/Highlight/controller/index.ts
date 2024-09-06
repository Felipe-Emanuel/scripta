import { useMemo } from 'react'
import { TBookResponse } from '@shared/types'
import { useGetAllBooks } from '@shared/hooks/useGetAllBooks'

export const useHighlightController = () => {
  const { refetch, userBooks } = useGetAllBooks()

  const highestHitsBook = useMemo(
    () =>
      (userBooks?.reduce((prevBook, currentBook) => {
        return (prevBook as TBookResponse).hits > currentBook.hits ? prevBook : currentBook
      }, {}) as TBookResponse) || {},
    [userBooks]
  )

  return {
    highestHitsBook,
    refetch
  }
}
