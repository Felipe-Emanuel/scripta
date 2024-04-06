import { ReaderEntitie } from '@entities/Reader'
import { Reader } from '@prisma/client'
import { IReaderRepository } from '@repositories'

export type TUpdateReaderRequest = {
  action: Pick<IReaderRepository, 'updateReader'>
  readerId: string
  newReader: Reader
  email: string
}

type TUpdateReaderResponse = Reader

export const UpdateReaderService = async ({
  action,
  readerId,
  newReader,
  email,
}: TUpdateReaderRequest): Promise<TUpdateReaderResponse> => {
  const { updateReader } = action

  const { updateReader: update } = ReaderEntitie(newReader, email)

  const updatedReader = await update(readerId, newReader)

  await updateReader(readerId, updatedReader)

  return updatedReader
}
