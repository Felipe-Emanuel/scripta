import { TEditBookSchema } from '@features/BookInformation/BookInformationUtils'
import { updateBook } from '@features/BookInformation/services'
import { useHighlightController } from '@features/Highlight/controller'
import { useBook } from '@shared/hooks/contexts/useBook'
import { TBookResponse, TUpdateBookRequest } from '@shared/types'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useCallback, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

export const useMyOwnBooks = (image?: string) => {
  const { refetch } = useHighlightController()
  const { choiseBookToSeeInfo } = useBook()

  const [choisedBook, setChoisedBook] = useState<TBookResponse | null>(null)
  const [action, setAction] = useState({
    isDeleting: false,
    isEditing: false
  })

  const toggleDeleting = () =>
    setAction({
      ...action,
      isDeleting: !action.isDeleting
    })

  const toggleEditing = () =>
    setAction({
      ...action,
      isEditing: !action.isEditing
    })

  const queryClient = useQueryClient()

  const cachedBooks = queryClient.getQueryData<TBookResponse[]>(cacheName.allBooks)

  const { data: queryedBooks } = useQuery<TBookResponse[]>({
    queryKey: cacheName.allBooks,
    enabled: !cachedBooks?.length
  })

  const books = cachedBooks ?? queryedBooks

  const handleUpdateBook = useCallback(
    async (data: TEditBookSchema) => {
      if (choisedBook) {
        const patchedBook: TUpdateBookRequest = {
          book: {
            createdAt: choisedBook.createdAt,
            description: data.description,
            Gender: data.gender!,
            heroPathUrl: image !== '' ? image! : data.heroPathUrl!,
            publishedUrl: data.publishedUrl!,
            Theme: data.theme!,
            title: data.title!,
            totalWords: data.totalWords
          }
        }

        const updatedBook = await updateBook(choisedBook?.id, patchedBook)

        updatedBook &&
          choiseBookToSeeInfo({
            ...choisedBook,
            ...patchedBook.book
          })

        refetch()
        return updatedBook
      }
    },
    [choiseBookToSeeInfo, refetch, image, choisedBook]
  )

  const onSubmit = async (data: TEditBookSchema) => await handleUpdateBook(data)

  return {
    books,
    action,
    choisedBook,
    toggleDeleting,
    toggleEditing,
    setChoisedBook,
    onSubmit
  }
}
