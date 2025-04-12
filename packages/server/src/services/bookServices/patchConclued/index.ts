import { IBooksRepository } from '@repositories'
import { TUpdateBoolsBookInfoSchemaResponse } from '@schemas'
import { throwBookMessages } from '@utils'

export type IPatchConcluedBookServiceRequest = {
  action: Pick<IBooksRepository, 'toggleConcluedBook'>
  bookId: string
}

type IPatchConcluedBookServiceResponse = TUpdateBoolsBookInfoSchemaResponse

export const PatchConcluedBookService = async ({
  action,
  bookId
}: IPatchConcluedBookServiceRequest): Promise<IPatchConcluedBookServiceResponse> => {
  const { toggleConcluedBook } = action

  if (!bookId) throw new Error(throwBookMessages.missingBookId)

  const patchedBook = await toggleConcluedBook(bookId)

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
