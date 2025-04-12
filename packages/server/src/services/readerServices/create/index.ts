import { User } from '@prisma/client'
import { IReaderRepository } from '@repositories'
import { TCreateReaderSchemaRequest, TCreateReaderSchemaResponse } from '@schemas'
import { throwReaderMessages } from '@utils'

export type TCreateReaderRequest = {
  action: Pick<IReaderRepository, 'createReader'>
  reader: User
  authorId: string
  body: TCreateReaderSchemaRequest
}

type TCreateReaderResponse = TCreateReaderSchemaResponse

export type TCreateReaderEntitie = {
  id: string // deve ser o id do usuário logado (leitor)
  picture: string
  bookId: string
  userId: string
  userName: string
  latitude?: number
  longitude?: number
}

export const CreateReaderService = async ({
  action,
  reader,
  authorId,
  body
}: TCreateReaderRequest): Promise<TCreateReaderResponse> => {
  const { createReader } = action

  if (!reader?.id) throw new Error(throwReaderMessages.invalidUser)

  const { bookId, location } = body

  const recordingReader: TCreateReaderEntitie = {
    id: reader.id,
    bookId,
    picture: reader.picture,
    userId: authorId,
    userName: reader.name,
    ...location
  }

  const newReader = await createReader(recordingReader)

  return {
    bookId: newReader.bookId,
    latitude: newReader.latitude,
    longitude: newReader.longitude,
    picture: newReader.picture,
    userName: newReader.userName
  }
}
