import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'

import { TUpdateChapterRequest } from '@shared/types'
import { useGetAllBooks } from '@shared/hooks/useGetAllBooks'
import { useBook } from '@shared/hooks/contexts/useBook'
import { useChapterConfig } from '@shared/hooks/contexts/useChapterConfig'
import { useUser } from '@shared/hooks/useUser'
import { useLocalStorage } from '@shared/hooks/useLocalStorage'
import { chapterSchema, TChapterSchema } from '../NewChapterUtils'
import { updateChapter } from '../services'
import { useDebounce } from '~/src/app/shared/hooks/useDebounce'
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes'

export const CURRENT_CHAPTER_ID = 'currentChapterId'

export const useNewChapterController = (bookId: string) => {
  const { setLocalStorage, getLocalStorage, deleteFromStorage } = useLocalStorage()
  const { debounced } = useDebounce()
  const { back, replace } = useRouter()
  const { choiseBookToSeeInfo } = useBook()
  const { menuState, clearMenuState } = useChapterConfig()
  const { sessionCustomer } = useUser()
  const { userBooks, isGettingBooks } = useGetAllBooks()

  const currentBook = userBooks?.find((book) => book.id === bookId)

  const goBack = () => {
    if (currentBook) {
      back()
      choiseBookToSeeInfo(currentBook)
    }
  }

  const newChapterSchema = useForm<TChapterSchema>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      chapterTitle: 'Novo título'
    }
  })

  const { register, watch } = newChapterSchema

  const writeChapter = useCallback(
    async (body: TUpdateChapterRequest) => {
      if (sessionCustomer) {
        const response = updateChapter(body, sessionCustomer.email)

        ;(await response) && setLocalStorage(CURRENT_CHAPTER_ID, body.chapter.id)

        return response
      }

      toast.error('Usuário não encontrado')
    },
    [sessionCustomer, setLocalStorage]
  )

  const currentChapterId = getLocalStorage(CURRENT_CHAPTER_ID)

  if (!currentChapterId) {
    replace(APP_ROUTES.private.books.name)
    currentBook && choiseBookToSeeInfo(currentBook)
  }

  const onWrite = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { opened, content, ...chapterConfig } = menuState

    const newChaper: TUpdateChapterRequest = {
      chapter: {
        id: currentChapterId,
        chapterText: content,
        bookId: bookId,
        chapterTitle: watch('chapterTitle'),
        ...chapterConfig
      }
    }

    console.log('chamar a api passando: ', newChaper)

    return writeChapter(newChaper)
  }

  console.log('watch("chapterTitle"): ', watch('chapterTitle'))

  const write = () => debounced(onWrite, 1000)

  useEffect(() => {
    return () => {
      deleteFromStorage(CURRENT_CHAPTER_ID)
      clearMenuState()
    }
  }, [clearMenuState, deleteFromStorage])

  return {
    currentBook,
    isGettingBooks,
    newChapterSchema,
    goBack,
    register,
    write
  }
}
