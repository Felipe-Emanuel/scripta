'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CurrentChapter, ICurrentChapterProps } from '@features/currentChapter'
import { useChapterEditorController } from '../controllers/useChapterEditorController'

export function ChapterPreview({ chapterId, chapters }: ICurrentChapterProps) {
  const { isEditing } = useChapterEditorController()

  return (
    <AnimatePresence mode="wait">
      {!isEditing && (
        <motion.div
          id="text-preview-root"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: isEditing ? 'circIn' : 'circOut'
          }}
        >
          <div className="size-full flex felx-col items-center justify-center">
            <CurrentChapter chapterId={chapterId} chapters={chapters} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
