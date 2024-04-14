export type TUpdateBookRequest = {
  book: {
    title: string
    description: string
    publishedUrl: string
    heroPathUrl: string
    Gender: string
    Theme: string
    createdAt: Date
    totalWords: number
  }
}
