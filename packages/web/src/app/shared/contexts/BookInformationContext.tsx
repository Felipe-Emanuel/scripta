import { TBookResponse, TRootComponent } from '@shared/types'
import { createContext, useCallback, useState } from 'react'

interface IBookInformationContextProps {
  selectedBook: TBookResponse | null
  isBookInformationLoading: boolean
  choiseBookToSeeInfo: (book: TBookResponse) => void
}

export const BookInformationContext = createContext({} as IBookInformationContextProps)

export const BookInformationProvider = ({ children }: TRootComponent) => {
  const [selectedBook, setSelectedBook] = useState<TBookResponse | null>(null)

  const choiseBookToSeeInfo = useCallback((book: TBookResponse) => setSelectedBook(book), [])

  const isBookInformationLoading = !selectedBook

  return (
    <BookInformationContext.Provider
      value={{ selectedBook, isBookInformationLoading, choiseBookToSeeInfo }}
    >
      {children}
    </BookInformationContext.Provider>
  )
}
