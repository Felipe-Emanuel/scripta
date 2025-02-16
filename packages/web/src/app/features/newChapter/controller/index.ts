import { useQueryData } from '~/src/app/shared/hooks/useReactQuery'
import { getChapterById } from '../../chapter/services'
import { useLocalParams } from '~/src/app/shared/hooks/useLocalParams'
import { useEffect } from 'react'

export const useNewChapterController = () => {
  const { currentParams } = useLocalParams()

  const { data: chapter, refetch } = useQueryData({
    cacheName: 'chapters',
    cacheTime: '1-hours',
    getDataFn: async () => getChapterById(String(currentParams?.chapterId))
  })

  useEffect(() => {
    refetch()
  }, [currentParams.isEditing, refetch])

  const chapterId = String(chapter?.id)

  return {
    chapter,
    chapterId
  }
}
