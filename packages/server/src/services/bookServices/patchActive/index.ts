import { IBooksRepository } from '@repositories'
import { TUpdateBoolsBookInfoSchemaResponse } from '@schemas'
import { throwBookMessages } from '@utils'

export type IPatchActiveBookServiceRequest = {
  action: Pick<IBooksRepository, 'toggleIsActiveBook'>
  bookId: string
}

type IPatchActiveBookServiceResponse = TUpdateBoolsBookInfoSchemaResponse

export const PatchActiveBookService = async ({
  action,
  bookId
}: IPatchActiveBookServiceRequest): Promise<IPatchActiveBookServiceResponse> => {
  const { toggleIsActiveBook } = action

  if (!bookId) throw new Error(throwBookMessages.missingBookId)

  const patchedBook = await toggleIsActiveBook(bookId)

  const formattedPatchedBook: TUpdateBoolsBookInfoSchemaResponse = {
    title: patchedBook.title,
    description: patchedBook.description,
    id: patchedBook.id,
    socialLink: patchedBook.socialLink,
    heroPathUrl: patchedBook.heroPathUrl,
    conclued: patchedBook.conclued,
    isActive: patchedBook.isActive,
    Gender: patchedBook.Gender,
    Theme: patchedBook.Theme,
    hits: patchedBook.hits,
    totalWords: patchedBook.totalWords
  }

  return formattedPatchedBook
}
