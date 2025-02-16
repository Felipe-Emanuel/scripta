'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Editor } from '@features/textEditor'
import { useChapterEditorController } from '../controllers/useChapterEditorController'

interface IChapterEditorProps {
  initialContent?: string
}

export function ChapterEditor({ initialContent }: IChapterEditorProps) {
  const { patchChapter, isEditing } = useChapterEditorController()

  return (
    <AnimatePresence mode="sync">
      {isEditing && (
        <motion.div
          id="text-editor-root"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: !isEditing ? 'circIn' : 'circOut'
          }}
        >
          <Editor.root>
            <Editor.text initialContent={initialContent} callBack={patchChapter} />
          </Editor.root>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
