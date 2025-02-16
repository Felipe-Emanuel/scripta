import { Chapter } from '@prisma/client'

export type TUpdateChapter = Pick<
  Chapter,
  'id' | 'chapterText' | 'lineHeight' | 'fontWeight' | 'fontSize' | 'firstLineIndent' | 'bookId'
>
