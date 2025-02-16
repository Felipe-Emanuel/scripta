import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUser } from '@shared/hooks/useUser'
import { TCreateBookRequest } from '@shared/types'
import { TCreateBookSchema, createBookSchema } from '../NewBookUtils'
import { createBook } from '../services'
import { useDebounce } from '@shared/hooks/useDebounce'
import { useDraft } from '@shared/hooks/useDraft'
import { useMutation } from '@tanstack/react-query'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useHighlightController } from '../../Highlight/controller'

const DELAY_TO_SEE_FORM = 600 // in ms

export type TCreateBookSchemaWithImage = {
  heroPathUrl: string
} & TCreateBookSchema

export const useNewBookController = () => {
  const { draft, updateDraft, clearDraft } = useDraft<TCreateBookSchemaWithImage>('newBook')
  const { sessionCustomer } = useUser()
  const { refetch } = useHighlightController()

  const [isFirstAccess, setIsFirstAccess] = useState(true)

  const { debounced } = useDebounce()

  const toggleFirstAccess = () => setIsFirstAccess(false)

  debounced(toggleFirstAccess, DELAY_TO_SEE_FORM)

  const createNewBook = useCallback(
    async (data: TCreateBookSchema) => {
      if (sessionCustomer) {
        const { email: userEmail } = sessionCustomer

        const { gender, theme, ...dataWithoutGenderAndTheme } = data

        const book: TCreateBookRequest['book'] = {
          ...dataWithoutGenderAndTheme,
          Gender: gender,
          heroPathUrl: String(draft?.heroPathUrl),
          Theme: theme,
          socialLink: data.socialLink ?? ''
        }

        const newBook = await createBook({
          userEmail,
          book
        })

        return newBook
      }
    },
    [draft, sessionCustomer]
  )

  const { mutateAsync } = useMutation({
    mutationKey: [cacheName.allBooks],
    mutationFn: createNewBook,
    async onSuccess() {
      refetch()
    }
  })

  const bookSchema = useForm<TCreateBookSchema>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      description: draft?.description,
      socialLink: draft?.socialLink ?? ''
    }
  })

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful, isValid }
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
  const socialLink = watch('socialLink')

  const newBook = {
    ...watch(),
    conclued,
    isActive
  }

  const keys = Object.keys(watch())
  const newBookKeys = keys.find((key) => newBook[key as keyof typeof newBook])

  useEffect(() => {
    if (draft) {
      setValue('conclued', draft?.conclued ?? false)
      setValue('isActive', draft?.isActive ?? true)
    }
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
  }, [title, description, gender, theme, conclued, isActive, socialLink])

  return {
    bookSchema,
    errors,
    isFirstAccess,
    conclued,
    isActive,
    isSubmitSuccessful,
    isValid,
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    clearDraft
  }
}
