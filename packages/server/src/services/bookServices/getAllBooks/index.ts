import { throwBookMessages } from '@entities/Book/utils'
import { Book } from '@prisma/client'
import { IBooksRepository } from '@repositories'

export type TGetAllBooksServiceRequest = {
  action: Pick<IBooksRepository, 'getAllBooks'>
  userEmail: string
}

type TGetAllBooksServiceResponse = Book[]

export const GetAllBooksService = async ({
  action,
  userEmail,
}: TGetAllBooksServiceRequest): Promise<TGetAllBooksServiceResponse> => {
  const { getAllBooks } = action

  if (!userEmail) throw new Error(throwBookMessages.emailMissing)

  const books = await getAllBooks(userEmail)

  return books || []
}
