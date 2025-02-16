import { ChapterEditor } from './views/ChapterEditor'
import { ChapterEditToggle } from './views/ChapterEditToggle'
import { ChapterOptions } from './views/ChapterOptions'
import { ChapterPreview } from './views/ChapterPreview'
import { ChapterRoot } from './views/ChapterRoot'
import { ChapterTitle } from './views/ChapterTitle'

export const Chapter = {
  root: ChapterRoot,
  toggle: ChapterEditToggle,
  editor: ChapterEditor,
  preview: ChapterPreview,
  title: ChapterTitle,
  options: ChapterOptions
}
