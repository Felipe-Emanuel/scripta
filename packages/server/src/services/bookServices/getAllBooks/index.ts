import { throwBookMessages } from '@entities/Book/utils'
import { Book, Chapter } from '@prisma/client'
import { IBooksRepository } from '@repositories'

export type TGetAllBooksServiceRequest = {
  action: Pick<IBooksRepository, 'getAllBooks'>
  userEmail: string
  onlyFirstChapter: boolean
}

export type BookWithChapters = Book & { chapters?: Chapter[] }

export type TGetAllBooksServiceResponse = BookWithChapters[]

export const GetAllBooksService = async ({
  action,
  userEmail,
  onlyFirstChapter = false
}: TGetAllBooksServiceRequest): Promise<TGetAllBooksServiceResponse> => {
  const { getAllBooks } = action

  if (!userEmail) throw new Error(throwBookMessages.emailMissing)

  const books = await getAllBooks(userEmail, onlyFirstChapter)

  return books || []
}
