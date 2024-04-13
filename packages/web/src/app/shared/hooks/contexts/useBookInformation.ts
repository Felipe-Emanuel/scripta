import { BookInformationContext } from '@shared/contexts/BookInformationContext'
import { useContext } from 'react'

export const useBookInformation = () => useContext(BookInformationContext)
