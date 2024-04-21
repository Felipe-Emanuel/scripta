import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUser } from '@shared/hooks/useUser'
import { TCreateBookRequest } from '@shared/types'
import { useQueryMutation } from '@shared/hooks/useReactQuery'
import { TCreateBookSchema, createBookSchema } from '../NewBookUtils'
import { createBook } from '../services'
import { useDebounce } from '@shared/hooks/useDebounce'
import { useDraft } from '@shared/hooks/useDraft'

const DELAY_TO_SEE_FORM = 600 // in ms

export type TCreateBookSchemaWithImage = {
  heroPathUrl: string
} & TCreateBookSchema

export const useNewBookController = () => {
  const { draft, updateDraft, clearDraft } = useDraft<TCreateBookSchemaWithImage>('newBook')
  const { sessionCustomer } = useUser()

  const [isFirstAccess, setIsFirstAccess] = useState(true)

  const { debounced } = useDebounce()

  const toggleFirstAccess = () => setIsFirstAccess(false)

  debounced(toggleFirstAccess, DELAY_TO_SEE_FORM)

  const createNewBook = useCallback(
    async (data: TCreateBookSchema) => {
      if (sessionCustomer) {
        const { email: userEmail } = sessionCustomer

        const book: TCreateBookRequest['book'] = {
          ...data,
          Gender: data.gender,
          heroPathUrl: String(draft?.heroPathUrl),
          Theme: data.theme,
          publishedUrl: data.publishedUrl ?? ''
        }

        const newBook = createBook({
          userEmail,
          book
        })

        return newBook
      }
    },
    [draft, sessionCustomer]
  )

  const { mutateAsync } = useQueryMutation(createNewBook, 'allBooks')

  const bookSchema = useForm<TCreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      description: draft?.description
    }
  })

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = bookSchema

  const onSubmit = async (data: TCreateBookSchema) => {
    await mutateAsync({ ...data })
    clearDraft()
  }

  const title = watch('title')
  const description = watch('description')
  const gender = watch('gender')
  const theme = watch('theme')
  const conclued = watch('conclued')
  const isActive = watch('isActive')
  const publishedUrl = watch('publishedUrl')
  const totalWords = watch('totalWords')

  const newBook = {
    ...watch(),
    conclued,
    isActive
  }

  const keys = Object.keys(watch())
  const newBookKeys = keys.find((key) => newBook[key as keyof typeof newBook])

  useEffect(() => {
    setValue('conclued', draft?.conclued ?? false)
    setValue('isActive', draft?.isActive ?? true)
    setValue('totalWords', draft?.totalWords ?? 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (newBookKeys) {
      updateDraft({
        ...draft,
        ...newBook
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, gender, theme, conclued, isActive, publishedUrl, totalWords])

  return {
    bookSchema,
    errors,
    isFirstAccess,
    conclued,
    isActive,
    handleSubmit,
    onSubmit,
    setValue,
    watch
  }
}
