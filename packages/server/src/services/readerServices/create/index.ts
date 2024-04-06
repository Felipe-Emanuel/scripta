import { ReaderEntitie } from '@entities/Reader'
import { throwReaderMessages } from '@entities/Reader/utils'
import { Reader } from '@prisma/client'
import { IReaderRepository } from '@repositories'
import { v4 as uuidv4 } from 'uuid'

type TReaderLocation = Pick<Reader, 'latitude' | 'longitude'>

export type TCreateReaderRequest = {
  action: Pick<IReaderRepository, 'createReader'>
  location: TReaderLocation
  userEmail: string
  authorEmail: string
  picture: string
  portfolioUrl: string
  userName: string
}

type TCreateReaderResponse = Reader

export const CreateReaderService = async ({
  action,
  location,
  userEmail,
  authorEmail,
  picture,
  portfolioUrl,
  userName
}: TCreateReaderRequest): Promise<TCreateReaderResponse> => {
  const { createReader } = action

  if (!userEmail) throw new Error(throwReaderMessages.invalidUser)

  const creatingReader: Reader = {
    ...location,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: uuidv4(),
    userEmail,
    picture,
    portfolioUrl,
    userName,
    authorEmail
  }

  const { createReader: create } = ReaderEntitie(creatingReader, authorEmail)

  const newReader = await create()

  await createReader(newReader)

  return newReader
}
