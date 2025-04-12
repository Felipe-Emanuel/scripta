import { IBooksRepository } from '@repositories'
import { TDeleteBookSchemaResponse } from '@schemas'
import { throwBookMessages } from '@utils'

export type TDeleteBookServiceRequest = {
  action: Pick<IBooksRepository, 'deleteBook'>
  bookId: string
}

type TDeleteBookServiceRequestResponse = TDeleteBookSchemaResponse['deletedBook']

export const DeleteBookService = async ({
  action,
  bookId
}: TDeleteBookServiceRequest): Promise<TDeleteBookServiceRequestResponse> => {
  const { deleteBook } = action

  if (!bookId) throw new Error(throwBookMessages.missingBookId)

  const deletedBook = await deleteBook(bookId)

  return {
    title: deletedBook.title,
    description: deletedBook.description,
    id: deletedBook.id,
    socialLink: deletedBook.socialLink,
    heroPathUrl: deletedBook.heroPathUrl,
    conclued: deletedBook.conclued,
    isActive: deletedBook.isActive,
    Gender: deletedBook.Gender,
    Theme: deletedBook.Theme,
    hits: deletedBook.hits,
    totalWords: deletedBook.totalWords
  }
}
