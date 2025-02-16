export type TNewBook = {
  title: string
  description: string
  socialLink: string
  heroPathUrl: string
  conclued: boolean
  isActive: boolean
  Gender: string
  Theme: string
}

export type TCreateBookRequest = {
  userEmail: string
  book: TNewBook
}
