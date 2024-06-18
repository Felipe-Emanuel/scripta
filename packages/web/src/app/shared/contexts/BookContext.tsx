import { TBookResponse, TBookScreenState, TRootComponent } from '@shared/types'
import { createContext, useCallback, useState } from 'react'

interface IBookContextProps {
  selectedBook: TBookResponse | null
  isBookLoading: boolean
  showForm: boolean
  handleToggleCreateBook: () => void
  choiseBookToSeeInfo: (book: TBookResponse) => void
}

export const BookContext = createContext({} as IBookContextProps)

export const BookProvider = ({ children }: TRootComponent) => {
  const [selectedBook, setSelectedBook] = useState<TBookResponse | null>(null)
  const [bookScreenState, setBookScreenState] = useState<TBookScreenState>('SHOW_BOOKS')

  const choiseBookToSeeInfo = useCallback((book: TBookResponse) => setSelectedBook(book), [])

  const handleToggleCreateBook = useCallback(
    () =>
      bookScreenState === 'SHOW_BOOKS'
        ? setBookScreenState('CREATE_BOOK')
        : setBookScreenState('SHOW_BOOKS'),
    [bookScreenState]
  )

  const showForm = bookScreenState === 'CREATE_BOOK'

  const isBookLoading = !selectedBook

  return (
    <BookContext.Provider
      value={{ selectedBook, isBookLoading, showForm, handleToggleCreateBook, choiseBookToSeeInfo }}
    >
      {children}
    </BookContext.Provider>
  )
}
