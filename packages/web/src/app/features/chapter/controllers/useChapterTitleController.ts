import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { useDebounce } from '@hooks/useDebounce'
import { useLocalParams } from '@hooks/useLocalParams'
import { chapterSchema, TChapterSchema } from '../ChapterUtils'
import { patchChapterTitle } from '../services'
import { useParams } from 'next/navigation'

export const useChapterTitleController = () => {
  const { currentParams } = useLocalParams()
  const { debounced } = useDebounce()
  const params = useParams()

  const isEditing = currentParams?.isEditing === 'true'

  const schema = useForm<TChapterSchema>({
    resolver: zodResolver(chapterSchema)
  })

  const { watch, register } = schema

  const { mutate } = useMutation({
    mutationFn: patchChapterTitle
  })

  const updateTitle = useCallback(async () => {
    const title = watch('title')

    mutate({
      chapterId: String(params.chapterId || currentParams.chapterId),
      newTitle: title
    })
  }, [watch, mutate, params.chapterId, currentParams.chapterId])

  const debouncedUpdateTitle = () => debounced(updateTitle, 1000)

  return {
    updateTitle,
    debouncedUpdateTitle,
    register,
    schema,
    isEditing
  }
}
