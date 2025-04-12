import { IBooksRepository } from '@repositories'
import { TGetBookByIdSchemaResponse } from '@schemas'

export type TGetBookByIdServiceRequest = {
  action: Pick<IBooksRepository, 'getBookById'>
  bookId: string
  shouldReturnAuthorId?: boolean
}

export type TGetBookByIdServiceResponse = TGetBookByIdSchemaResponse & { userId?: string }

export const GetBookByIdService = async ({
  action,
  bookId,
  shouldReturnAuthorId = false
}: TGetBookByIdServiceRequest): Promise<TGetBookByIdServiceResponse> => {
  const { getBookById } = action

  const existentBook = await getBookById(bookId)

  const existentBookWithAuthorId = {
    ...existentBook,
    userId: existentBook.userId
  }

  return shouldReturnAuthorId ? existentBookWithAuthorId : existentBook
}
