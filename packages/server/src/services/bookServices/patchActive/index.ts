import { throwBookMessages } from '@entities/Book/utils'
import { Book } from '@prisma/client'
import { IBooksRepository } from '@repositories'

export type IPatchActiveBookServiceRequest = {
  action: Pick<IBooksRepository, 'toggleIsActiveBook'>
  bookId: string
}

type IPatchActiveBookServiceResponse = Book

export const PatchActiveBookService = async ({
  action,
  bookId
}: IPatchActiveBookServiceRequest): Promise<IPatchActiveBookServiceResponse> => {
  const { toggleIsActiveBook } = action

  if (!bookId) throw new Error(throwBookMessages.missingBookId)

  const patchedBook = toggleIsActiveBook(bookId)

  return patchedBook
}
