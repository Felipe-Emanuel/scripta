'use client'

import { Chapter } from '../chapter'
import { useNewChapterController } from './controller'

export function NewChapter() {
  const { chapter, chapterId } = useNewChapterController()

  if (!chapter) return null

  return (
    <Chapter.root>
      <Chapter.toggle />
      <Chapter.options chapter={chapter} />
      <Chapter.title title={chapter?.chapterTitle} />
      <Chapter.editor initialContent={chapter?.chapterText} />
      <Chapter.preview chapterId={chapterId} chapters={[chapter]} />
    </Chapter.root>
  )
}
