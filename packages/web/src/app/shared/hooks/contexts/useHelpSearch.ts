import { HelpSearchContext } from '@shared/contexts/HelpSearchContext'
import { useContext } from 'react'

export const useHelpSearch = () => useContext(HelpSearchContext)
