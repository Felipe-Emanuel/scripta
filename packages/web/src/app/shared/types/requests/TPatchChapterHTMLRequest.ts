import { TUpdateChapterRequest } from './TUpdateChapterRequest'

export type TUpdateChapter = Pick<
  TUpdateChapterRequest['chapter'],
  'id' | 'chapterText' | 'lineHeight' | 'fontWeight' | 'fontSize' | 'firstLineIndent' | 'bookId'
>

export type TPatchChapterHTMLRequest = {
  userEmail: string
  data: {
    updatedChapter: TUpdateChapter
  }
}
