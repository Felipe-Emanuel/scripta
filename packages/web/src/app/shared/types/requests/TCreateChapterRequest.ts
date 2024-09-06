export type TCreateChapterRequest = {
  chapter: {
    id: string
    chapterTitle: string
    chapterText: string
    bookId: string
    wordsCounter: number
    firstLineIndent: string
    lineHeight: string
    fontSize: string
    fontWeight: string
  }
}
