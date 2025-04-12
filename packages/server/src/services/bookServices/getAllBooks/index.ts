import { IBooksRepository } from '@repositories'
import { TGetAllBooksSchemaResponse } from '@schemas'
import { throwBookMessages } from '@utils'

export type TGetAllBooksServiceRequest = {
  action: Pick<IBooksRepository, 'getAllBooks'>
  userid: string
  onlyFirstChapter: boolean
}

export type TGetAllBooksServiceResponse = TGetAllBooksSchemaResponse[]

export const GetAllBooksService = async ({
  action,
  userid,
  onlyFirstChapter = false
}: TGetAllBooksServiceRequest): Promise<TGetAllBooksServiceResponse> => {
  const { getAllBooks } = action

  if (!userid) throw new Error(throwBookMessages.missingAuthor)

  const books = await getAllBooks(userid, onlyFirstChapter)

  return books || []
}
