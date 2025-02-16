import { TBookResponse } from '@shared/types'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useQueryClient } from '@tanstack/react-query'
import { getAllBooks } from '../../Highlight/services'
import { useUser } from '~/src/app/shared/hooks/useUser'
import { useCallback } from 'react'
import { useQueryData } from '~/src/app/shared/hooks/useReactQuery'

export const useMyOwnBooks = () => {
  const { sessionCustomer } = useUser()
  const queryClient = useQueryClient()

  const cachedBooks = queryClient.getQueryData<TBookResponse[]>([cacheName.allBooks])

  const getBooks = useCallback(async () => {
    if (sessionCustomer) {
      const onlyFirstChapter = true
      const books = await getAllBooks(sessionCustomer?.email, onlyFirstChapter)

      return books
    }
  }, [sessionCustomer])

  const { data: allBooks } = useQueryData({
    getDataFn: getBooks,
    cacheName: 'allBooks',
    cacheTime: '1-hours',
    enabled: !cachedBooks?.length
  })

  const books = cachedBooks ?? allBooks

  return {
    books
  }
}
