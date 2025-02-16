export type TUpdateChapterRequest = {
  chapter: {
    bookId: string
    id: string
    chapterText: string
    wordsCounter: number
    firstLineIndent: string
    fontSize: string
    fontWeight: string
    lineHeight: string
  }
}
