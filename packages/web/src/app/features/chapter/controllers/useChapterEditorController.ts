import { useCallback } from 'react'
import { useParams } from 'next/navigation'

import { patchChapterHTML } from '../services'
import { useUser } from '@hooks/useUser'
import { useLocalEditor } from '@hooks/useLocalEditor'
import { useLocalParams } from '@hooks/useLocalParams'
import { TChapterResponse, TPatchChapterHTMLRequest } from '@shared/types'
import { useQueryMutation } from '~/src/app/shared/hooks/useReactQuery'

export const useChapterEditorController = () => {
  const { currentParams } = useLocalParams()
  const { menuState } = useLocalEditor({})
  const { sessionCustomer } = useUser()

  const params = useParams()
  const isEditing = currentParams?.isEditing === 'true'

  const { mutate } = useQueryMutation<TChapterResponse, TPatchChapterHTMLRequest>({
    mutationFn: patchChapterHTML,
    cacheName: 'chapters'
  })

  const patchChapter = useCallback(
    async (html: string | undefined) => {
      if (sessionCustomer) {
        const body: TPatchChapterHTMLRequest = {
          data: {
            chapter: {
              bookId: String(params.bookId),
              id: String(params.chapterId || currentParams.chapterId),
              chapterText: String(html),
              ...menuState
            }
          },
          userEmail: sessionCustomer?.email
        }

        mutate(body)
      }
    },
    [currentParams.chapterId, menuState, mutate, params.bookId, params.chapterId, sessionCustomer]
  )

  return {
    patchChapter,
    isEditing
  }
}
