import { useCallback } from 'react'
import { getAllChapters } from '../services'
import { useQueryData } from '~/src/app/shared/hooks/useReactQuery'
import { getBookById } from '../../books/services'
import { useUser } from '~/src/app/shared/hooks/useUser'

export const useChaptersController = (bookId: string) => {
  const { sessionCustomer } = useUser()
  const getBook = useCallback(async () => {
    if (sessionCustomer) {
      const res = getBookById(sessionCustomer.email, bookId)

      return res
    }
  }, [bookId, sessionCustomer])

  const { data: chapters } = useQueryData({
    cacheName: 'chapters',
    cacheTime: '1-hours',
    getDataFn: async () => await getAllChapters(bookId)
  })

  const { data: currentBook } = useQueryData({
    cacheName: 'currentBook',
    cacheTime: '1-hours',
    getDataFn: getBook
  })

  return {
    chapters,
    currentBook
  }
}
