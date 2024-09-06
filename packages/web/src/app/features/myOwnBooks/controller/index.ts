import { TBookResponse } from '@shared/types'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useQuery, useQueryClient } from 'react-query'

export const useMyOwnBooks = () => {
  const queryClient = useQueryClient()

  const cachedBooks = queryClient.getQueryData<TBookResponse[]>(cacheName.allBooks)

  const { data: queryedBooks } = useQuery<TBookResponse[]>({
    queryKey: cacheName.allBooks,
    enabled: !cachedBooks?.length
  })

  const books = cachedBooks ?? queryedBooks

  return {
    books
  }
}
