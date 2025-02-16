import { useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { useBook } from '@shared/hooks/contexts/useBook'
import { TCreateChapterRequest, TPatchActiveBookRequest, TUpdateBookRequest } from '@shared/types'
import { TEditBookSchema, editBookSchema } from '../BookInformationUtils'
import { deleteBook, patchActiveOrConcluedBook, updateBook } from '../services'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useUser } from '@hooks/useUser'
import { createNewChapter, patchConclued } from '../../newChapter/services'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useLocalEditor } from '@hooks/useLocalEditor'
import { useDragAndPasteImage } from '~/src/app/shared/hooks/useDragAndPasteImage'
import { useHighlightController } from '../../Highlight/controller'

export const useBookController = () => {
  const { isDragActive, image, getRootProps, onPaste, clearimage } = useDragAndPasteImage()

  const { sessionCustomer } = useUser()
  const { menuState } = useLocalEditor({})
  const { selectedBook, choiseBookToSeeInfo, clearSelectedBook } = useBook()
  const { push } = useRouter()
  const { refetch } = useHighlightController()
  const [newChapterId, setNewChapterId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [prevTab, setPrevTab] = useState(activeTab)
  const [isCharactersCardHovered, setIsCharactersCardHovered] = useState(false)
  const [action, setAction] = useState({
    isDeleting: false,
    isDesactiving: false,
    isEditing: false,
    isConfirm: false
  })

  const isMovingRight = activeTab > prevTab
  const changeTab = (tabIndex: number) => {
    setActiveTab(tabIndex)
    setPrevTab(activeTab)
  }

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

  const ToggleConfirm = useCallback(
    () =>
      setAction({
        ...action,
        isConfirm: !action.isConfirm
      }),
    [action]
  )

  const queryClient = useQueryClient()

  const handleUpdateBook = useCallback(
    async (data: TEditBookSchema) => {
      if (selectedBook) {
        const patchedBook: TUpdateBookRequest = {
          book: {
            createdAt: selectedBook.createdAt,
            description: data.description,
            Gender: data.gender!,
            heroPathUrl: String(image) || selectedBook?.heroPathUrl,
            socialLink: data.socialLink!,
            Theme: data.theme!,
            title: data.title!
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
    [choiseBookToSeeInfo, image, refetch, selectedBook]
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
    mutationKey: [cacheName.allBooks],
    mutationFn: patchBookActiveAndConclued,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [cacheName.allBooks]
      })
    }
  })

  const deletingBook = useCallback(async () => {
    if (selectedBook) {
      const deletedBook = await deleteBook(selectedBook.id)

      return deletedBook
    }
  }, [selectedBook])

  const { mutateAsync: handleDeleteBook } = useMutation({
    mutationKey: [cacheName.allBooks],
    mutationFn: deletingBook,
    onSuccess() {
      clearSelectedBook()

      return queryClient.invalidateQueries({
        queryKey: [cacheName.allBooks]
      })
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
      setValue('socialLink', selectedBook.socialLink)
      setValue('description', selectedBook.description)
      setValue('heroPathUrl', selectedBook.heroPathUrl)
      setValue('gender', selectedBook.Gender)
      setValue('theme', selectedBook.Theme)
      setValue('title', selectedBook.title)
    }
  }, [selectedBook, setValue])

  const onSubmit = async (data: TEditBookSchema) => await handleUpdateBook(data)

  const goToNewChapter = useCallback(async () => {
    if (selectedBook) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { opened, content, ...chapterConfig } = menuState

      const chapterId = newChapterId || uuidv4()
      setNewChapterId(chapterId)

      const newChapter: TCreateChapterRequest = {
        chapter: {
          bookId: selectedBook.id,
          chapterText: '',
          chapterTitle: '',
          id: chapterId,
          ...chapterConfig
        }
      }

      if (sessionCustomer) {
        const response = await createNewChapter(newChapter, sessionCustomer.email)

        if (response?.data?.message === 'O ultimo capítulo não está concluído') {
          return ToggleConfirm()
        }

        push(
          `${APP_ROUTES.private.books.name}/${selectedBook?.id}?chapterId=${chapterId}&isEditing=true`
        )
        return response
      }

      toast.error('Usuário não encontrado')
    }
  }, [selectedBook, menuState, sessionCustomer, ToggleConfirm, push, newChapterId])

  const { mutate: markAsConclued } = useMutation({
    mutationFn: () => patchConclued(String(selectedBook?.chapters?.[0]?.id)),
    onSuccess: () => goToNewChapter()
  })

  const goToChapters = () => push(`${APP_ROUTES.private.books.name}/${selectedBook?.id}/chapters`)

  return {
    isCharactersCardHovered,
    action,
    editSchema,
    errors,
    isValid,
    isMovingRight,
    activeTab,
    markAsConclued,
    changeTab,
    ToggleConfirm,
    onSubmit,
    handleSubmit,
    setIsCharactersCardHovered,
    toggleDeleting,
    toggleDesactiving,
    toggleEditing,
    handlePatchActiveOrConcluedBook,
    handleDeleteBook,
    goToNewChapter,
    goToChapters,

    isDragActive,
    image,
    getRootProps,
    onPaste,
    clearimage
  }
}
