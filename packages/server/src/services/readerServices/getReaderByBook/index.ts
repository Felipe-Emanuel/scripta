import { ReaderEntitie } from '@entities/Reader'
import { throwReaderMessages } from '@entities/Reader/utils'
import { Reader } from '@prisma/client'
import { IReaderRepository } from '@repositories'

export type TGetReaderByBookRequest = {
  action: Pick<IReaderRepository, 'getAllReadersByBook'>
  bookId: string
  email: string
}

type TGetReaderByBookResponse = Reader[]

export const GetReaderByBook = async ({
  action,
  bookId,
  email,
}: TGetReaderByBookRequest): Promise<TGetReaderByBookResponse> => {
  const { getAllReadersByBook } = action

  if (!bookId) throw new Error(throwReaderMessages.invalidBook)

  const existentReaders = await getAllReadersByBook(bookId)

  if (!existentReaders.length) return []

  const { getReaderByBook } = ReaderEntitie(existentReaders[0], email)

  const readersByBook = await getReaderByBook(existentReaders, bookId)

  return readersByBook
}
