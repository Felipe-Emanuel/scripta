import { BookContext } from '@shared/contexts/BookContext'
import { useContext } from 'react'

export const useBook = () => useContext(BookContext)
