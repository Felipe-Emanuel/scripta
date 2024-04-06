import { ReaderEntitie } from '@entities/Reader'
import { throwReaderMessages } from '@entities/Reader/utils'
import { Reader } from '@prisma/client'
import { IReaderRepository } from '@repositories'

export type TUpdateBookReadersRequest = {
  action: Pick<IReaderRepository, 'createOnlyBookReader'>
  bookId: string
  newReader: Reader
}

export type TUpdateBookReadersResponse = Reader[]

export const UpdateBookReadersService = async ({
  action,
  bookId,
  newReader,
}: TUpdateBookReadersRequest): Promise<TUpdateBookReadersResponse> => {
  const { createOnlyBookReader } = action

  if (!bookId) throw new Error(throwReaderMessages.invalidBook)

  const { createReader } = ReaderEntitie(newReader, newReader.authorEmail)

  const updatedReader = await createReader()

  await createOnlyBookReader(bookId, updatedReader)

  return [updatedReader]
}
