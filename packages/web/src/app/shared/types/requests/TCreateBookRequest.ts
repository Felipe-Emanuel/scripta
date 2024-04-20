export type TNewBook = {
  title: string
  description: string
  publishedUrl: string
  heroPathUrl: string
  conclued: boolean
  isActive: boolean
  Gender: string
  Theme: string
  totalWords: number
}

export type TCreateBookRequest = {
  userEmail: string
  book: TNewBook
}
