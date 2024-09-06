import { useCallback } from 'react'
import { useQueryClient } from 'react-query'

import { TBookResponse } from '@shared/types'
import { getAllBooks } from '@features/Highlight/services'
import { cacheName } from '../utils/constants/cacheName'
import { useQueryData } from './useReactQuery'
import { useUser } from './useUser'

export const useGetAllBooks = () => {
  const { sessionCustomer } = useUser()

  const qyeryClient = useQueryClient()
  const cachedBooks = qyeryClient.getQueryData<TBookResponse[]>(cacheName.allBooks)

  const getBooks = useCallback(async () => {
    const books = await getAllBooks(sessionCustomer?.email)

    return books || []
  }, [sessionCustomer?.email])

  const {
    data: books,
    isLoading: isGettingBooks,
    refetch
  } = useQueryData(getBooks, 'allBooks', '12-hours', !cachedBooks?.length)

  const userBooks = cachedBooks?.length ? cachedBooks : books

  return {
    userBooks,
    isGettingBooks,
    refetch
  }
}
