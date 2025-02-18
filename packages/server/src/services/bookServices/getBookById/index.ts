import { IBooksRepository } from '@repositories'
import { bookByIdSchema } from '@schemas'
import { BookWithChapters } from '../getAllBooks'

export type TGetBookByIdServiceRequest = {
  action: Pick<IBooksRepository, 'getAllBooks'>
  paramUserEmail: string
  paramBookId: string
}

export type TGetBookByIdServiceResponse = BookWithChapters

export const GetBookByIdService = async ({
  action,
  paramBookId,
  paramUserEmail
}: TGetBookByIdServiceRequest): Promise<TGetBookByIdServiceResponse> => {
  const { getAllBooks } = action

  const { userEmail, bookId } = bookByIdSchema.parse({
    userEmail: paramUserEmail,
    bookId: paramBookId
  })

  const onlyFirstChapter = true
  const books = await getAllBooks(userEmail, onlyFirstChapter)

  const existentBook = books?.find((book) => book.id === bookId)

  return existentBook
}
