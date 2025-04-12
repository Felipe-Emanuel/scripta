import { IBooksRepository } from '@repositories'
import { TUpdateBookInfoSchemaBody, TUpdateBookInfoSchemaResponse } from '@schemas'
import { throwBookMessages } from '@utils'

export type TUpdateBookServiceRequest = {
  action: Pick<IBooksRepository, 'updateBook'>
  bookId: string
  updatedBook: TUpdateBookInfoSchemaBody['book']
}
export type TUpdateBookServiceResponse = TUpdateBookInfoSchemaResponse

export const UpdateBookService = async ({
  action,
  bookId,
  updatedBook
}: TUpdateBookServiceRequest): Promise<TUpdateBookServiceResponse> => {
  const { updateBook } = action

  if (!bookId) throw new Error(throwBookMessages.missingBookId)

  const newBook = await updateBook(bookId, updatedBook)

  return newBook || null
}
