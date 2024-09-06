import { useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { v4 as uuiv4 } from 'uuid'

import { useHighlightController } from '@features/Highlight/controller'
import { useBook } from '@shared/hooks/contexts/useBook'
import {
  TBookResponse,
  TCreateChapterRequest,
  TPatchActiveBookRequest,
  TUpdateBookRequest
} from '@shared/types'
import { TEditBookSchema, editBookSchema } from '../BookInformationUtils'
import { deleteBook, patchActiveOrConcluedBook, updateBook } from '../services'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes'
import { useUser } from '~/src/app/shared/hooks/useUser'
import { createNewChapter } from '../../newChapter/services'
import { useLocalStorage } from '~/src/app/shared/hooks/useLocalStorage'
import { CURRENT_CHAPTER_ID } from '../../newChapter/controller'
import { toast } from 'react-toastify'
import { useChapterConfig } from '~/src/app/shared/hooks/contexts/useChapterConfig'
import { useMutation, useQueryClient } from 'react-query'
import { cacheName } from '~/src/app/shared/utils/constants/cacheName'

export const useBookController = (image?: string) => {
  const { sessionCustomer } = useUser()
  const { menuState } = useChapterConfig()
  const { setLocalStorage } = useLocalStorage()
  const { push } = useRouter()
  const { refetch } = useHighlightController()
  const { choiseBookToSeeInfo, selectedBook } = useBook()

  const [isCharactersCardHovered, setIsCharactersCardHovered] = useState(false)
  const [action, setAction] = useState({
    isDeleting: false,
    isDesactiving: false,
    isEditing: false
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

  const toggleEditing = () =>
    setAction({
      ...action,
      isEditing: !action.isEditing
    })

  const handleUpdateBook = useCallback(
    async (data: TEditBookSchema) => {
      if (selectedBook) {
        const patchedBook: TUpdateBookRequest = {
          book: {
            createdAt: selectedBook.createdAt,
            description: data.description,
            Gender: data.gender!,
            heroPathUrl: image !== '' ? selectedBook?.heroPathUrl : data.heroPathUrl!,
            publishedUrl: data.publishedUrl!,
            Theme: data.theme!,
            title: data.title!,
            totalWords: data.totalWords
          }
        }

        const updatedBook = await updateBook(selectedBook?.id, patchedBook)

        updatedBook &&
          choiseBookToSeeInfo({
            ...selectedBook,
            ...patchedBook.book
          })

        refetch()
        return updatedBook
      }
    },
    [choiseBookToSeeInfo, refetch, image, selectedBook]
  )

  const patchBookActiveAndConclued = useCallback(
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

  const { mutateAsync: handlePatchActiveOrConcluedBook } = useMutation({
    mutationKey: cacheName.allBooks,
    mutationFn: patchBookActiveAndConclued,
    onSuccess(editedItem) {
      queryClient.setQueryData([cacheName.allBooks], (data: TBookResponse[] = []) => {
        return data.map((item) => (item.id === editedItem?.id ? editedItem : item))
      })
    }
  })

  const deletingBook = useCallback(async () => {
    if (selectedBook) {
      const deletedBook = await deleteBook(selectedBook.id)

      return deletedBook
    }
  }, [selectedBook])

  const queryClient = useQueryClient()

  const { mutateAsync: handleDeleteBook } = useMutation({
    mutationKey: cacheName.allBooks,
    mutationFn: deletingBook,
    onSuccess() {
      if (selectedBook) {
        const cachedBooks = queryClient.getQueryData<TBookResponse[]>(cacheName.allBooks)

        queryClient.setQueryData([cacheName.allBooks], () =>
          cachedBooks?.filter((book) => book.id !== selectedBook.id)
        )
      }
    }
  })

  const editSchema = useForm<TEditBookSchema>({
    resolver: zodResolver(editBookSchema)
  })

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = editSchema

  useEffect(() => {
    if (selectedBook) {
      setValue('publishedUrl', selectedBook.publishedUrl)
      setValue('description', selectedBook.description)
      setValue('heroPathUrl', selectedBook.heroPathUrl)
      setValue('gender', selectedBook.Gender)
      setValue('theme', selectedBook.Theme)
      setValue('title', selectedBook.title)
      setValue('totalWords', selectedBook.totalWords)
    }
  }, [selectedBook, setValue])

  const onSubmit = async (data: TEditBookSchema) => await handleUpdateBook(data)

  const goToNewChapter = useCallback(async () => {
    if (selectedBook) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { opened, content, ...chapterConfig } = menuState
      const newChapter: TCreateChapterRequest = {
        chapter: {
          bookId: selectedBook.id,
          chapterText: '',
          chapterTitle: '',
          id: uuiv4(),
          ...chapterConfig
        }
      }

      if (sessionCustomer) {
        const response = await createNewChapter(newChapter, sessionCustomer.email)

        if (response) {
          setLocalStorage(CURRENT_CHAPTER_ID, newChapter.chapter.id)
          push(`${APP_ROUTES.private.books.name}/${selectedBook?.id}`)
          return response
        }
      }

      toast.error('Usuário não encontrado')
    }
  }, [menuState, selectedBook, sessionCustomer, setLocalStorage, push])

  const goToChapters = () => push(`${APP_ROUTES.private.books.name}/${selectedBook?.id}/chapter`)

  return {
    isCharactersCardHovered,
    action,
    editSchema,
    errors,
    isValid,
    onSubmit,
    handleSubmit,
    setIsCharactersCardHovered,
    toggleDeleting,
    toggleDesactiving,
    toggleEditing,
    handlePatchActiveOrConcluedBook,
    handleDeleteBook,
    goToNewChapter,
    goToChapters
  }
}
