import { throwBookMessages } from '@entities/Book/utils'
import { Book } from '@prisma/client'
import { IBooksRepository } from '@repositories'

export type TDeleteBookServiceRequest = {
  action: Pick<IBooksRepository, 'deleteBook'>
  bookId: string
}

type TDeleteBookServiceRequestResponse = Book

export const DeleteBookService = async ({
  action,
  bookId,
}: TDeleteBookServiceRequest): Promise<TDeleteBookServiceRequestResponse> => {
  const { deleteBook } = action

  if (!bookId) throw new Error(throwBookMessages.missingBookId)

  return await deleteBook(bookId)
}
