import { useContext } from 'react'
import { ChapterConfigContext } from '@shared/contexts/ChapterConfig'

export const useChapterConfig = () => useContext(ChapterConfigContext)
