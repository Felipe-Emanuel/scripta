import { useCallback, useEffect, useState } from 'react'
import { useUser } from '@shared/hooks/useUser'
import { useQueryData } from '@shared/hooks/useReactQuery'
import {
  getOnlyReaderByEmail,
  getReaderByBook,
  getReadersByEmail
} from '@features/readers/services'
import { TBookResponse, TCurrentTab, TReader, TReaderResponse } from '@shared/types'
import { useQueryClient } from 'react-query'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useForm } from 'react-hook-form'
import { TSearchBookSchema, searchBookSchema } from '@features/readers/ReaderUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import { IReaderBookDetailsProps } from '@features/readers/views/ReaderBookDetails'
import { IReaderDetailsProps } from '@features/readers/views/ReaderDetails'

export const useReadersController = () => {
  const { sessionCustomer } = useUser()
  const [readerEmail, setReaderEmail] = useState('')
  const [isShowingDetails, setIsShowingDetails] = useState(false)
  const [isShowingBookDetails, setIsShowingBookDetails] = useState(false)
  const [filtringByBook, setFiltringByBook] = useState(false)
  const [specificReader, setSpecificReader] = useState<TReader>()
  const [allReadersByBook, setAllReadersByBook] = useState<TReaderResponse[]>()

  const toggleDetails = () => setIsShowingDetails((isShowing) => !isShowing)

  const toggleBookDetails = () => {
    setIsShowingDetails(false)
    setIsShowingBookDetails((isShowing) => !isShowing)
  }

  const getAllReaders = useCallback(() => {
    const readers = getReadersByEmail(sessionCustomer?.email)

    setFiltringByBook(false)
    return readers
  }, [sessionCustomer?.email])

  const { data: allReadersByAuthor } = useQueryData(
    getAllReaders,
    'allReaders',
    '6-hours',
    !!sessionCustomer?.email
  )

  const seeReader = useCallback((userEmail: string) => {
    setReaderEmail(userEmail)
    setIsShowingDetails(true)
    setIsShowingBookDetails(false)
  }, [])

  const getSpecificReader = useCallback(async () => {
    const reader = await getOnlyReaderByEmail(readerEmail)

    setIsShowingBookDetails(false)
    if (reader) return setSpecificReader(reader)
  }, [readerEmail])

  useEffect(() => {
    getSpecificReader()
  }, [getSpecificReader])

  const queryClient = useQueryClient()

  const cachedBooks = queryClient.getQueryData<TBookResponse[]>(cacheName.allBooks)

  const getAllReadersByBook = useCallback(
    async (bookId: string) => {
      const readers = await getReaderByBook({
        authorEmail: sessionCustomer?.email,
        bookId
      })

      setFiltringByBook(true)
      return setAllReadersByBook(readers)
    },
    [sessionCustomer?.email]
  )

  const allReaders = filtringByBook ? allReadersByBook : allReadersByAuthor
  const coordinates =
    allReaders?.map((reader) => ({
      email: reader.userEmail,
      lat: reader.latitude,
      lng: reader.longitude,
      name: reader.userName
    })) || []

  const searchBook = useForm<TSearchBookSchema>({
    resolver: zodResolver(searchBookSchema)
  })

  const { watch } = searchBook

  const onSearch = () => {
    const bookTitle = watch('bookTitle')

    const filtaredBooks = cachedBooks?.filter((book) =>
      book.title.toLocaleLowerCase().includes(bookTitle)
    )

    return filtaredBooks?.length ? filtaredBooks : cachedBooks
  }

  const books = onSearch() || []

  const currentTab: TCurrentTab = filtringByBook ? 'Livro' : 'Todos'
  const totalReaders = allReadersByAuthor?.length || 0
  const totalReadersByBook = books?.length || 0

  const bookDetilProps: IReaderBookDetailsProps = {
    currentTab,
    isShowingBookDetails,
    searchBook,
    totalReaders,
    totalReadersByBook,
    filterByBook: getAllReadersByBook,
    handleFilterByAll: getAllReaders,
    toggleBookDetails,
    books
  }

  const readerDetailsProps: IReaderDetailsProps = {
    isShowingDetails,
    reader: specificReader,
    toggleDetails
  }

  return {
    coordinates,
    seeReader,
    readerDetailsProps,
    bookDetilProps
  }
}
