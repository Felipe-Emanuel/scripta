import { useQueryData } from '@shared/hooks/useReactQuery'
import { TBookResponse } from '@shared/types'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useCallback, useEffect, useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { getAllBooks } from '../services'
import { useUser } from '@shared/hooks/useUser'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'

export const useHighlightController = () => {
  const { sessionCustomer } = useUser()
  const { choiseBookToSeeInfo } = useBookInformation()

  const qyeryClient = useQueryClient()
  const cachedBooks = qyeryClient.getQueryData<TBookResponse[]>(cacheName.allBooks)

  const getBooks = useCallback(async () => {
    const books = await getAllBooks(sessionCustomer?.email)

    return books || []
  }, [sessionCustomer?.email])

  const { data: books, refetch } = useQueryData(
    getBooks,
    'allBooks',
    '12-hours',
    !cachedBooks?.length
  )

  const userBooks = cachedBooks?.length ? cachedBooks : books

  const highestHitsBook = useMemo(
    () =>
      (userBooks?.reduce((prevBook, currentBook) => {
        return (prevBook as TBookResponse).hits > currentBook.hits ? prevBook : currentBook
      }, {}) as TBookResponse) || {},
    [userBooks]
  )

  useEffect(() => {
    if (highestHitsBook) {
      choiseBookToSeeInfo(highestHitsBook)
    }
  }, [choiseBookToSeeInfo, highestHitsBook])

  return {
    highestHitsBook,
    refetch
  }
}
