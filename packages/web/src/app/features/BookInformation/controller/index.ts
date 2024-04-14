import { useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useHighlightController } from '@features/Highlight/controller'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'
import { TPatchActiveBookRequest, TUpdateBookRequest } from '@shared/types'
import { TEditBookSchema, editBookSchema } from '../BookInformationUtils'
import { deleteBook, patchActiveOrConcluedBook, updateBook } from '../services'

export const useBookInformationController = (image?: string) => {
  const { refetch } = useHighlightController()
  const { choiseBookToSeeInfo, selectedBook } = useBookInformation()

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
            heroPathUrl: image !== '' ? image! : data.heroPathUrl!,
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

  const handlePatchActiveOrConcluedBook = useCallback(
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

  const handleDeleteBook = useCallback(async () => {
    if (selectedBook) {
      const deletedBook = await deleteBook(selectedBook.id)

      return deletedBook
    }
  }, [selectedBook])

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
    handleDeleteBook
  }
}
