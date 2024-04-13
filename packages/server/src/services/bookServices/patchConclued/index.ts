import { throwBookMessages } from '@entities/Book/utils'
import { Book } from '@prisma/client'
import { IBooksRepository } from '@repositories'

export type IPatchConcluedBookServiceRequest = {
  action: Pick<IBooksRepository, 'toggleConcluedBook'>
  bookId: string
}

type IPatchConcluedBookServiceResponse = Book

export const PatchConcluedBookService = async ({
  action,
  bookId
}: IPatchConcluedBookServiceRequest): Promise<IPatchConcluedBookServiceResponse> => {
  const { toggleConcluedBook } = action

  if (!bookId) throw new Error(throwBookMessages.missingBookId)

  const patchedBook = toggleConcluedBook(bookId)

  return patchedBook
}
