import { IReaderRepository } from '@repositories'
import { TGetReaderByAuthorSchemaResponse } from '@schemas'
import { throwReaderMessages } from '@utils'

export type TGetReaderByAuthorRequest = {
  action: Pick<IReaderRepository, 'getAllReadersByAuthor'>
  userId: string
}

type TGetReaderByAuthorResponse = TGetReaderByAuthorSchemaResponse

export const GetReaderByAuthorService = async ({
  action,
  userId
}: TGetReaderByAuthorRequest): Promise<TGetReaderByAuthorResponse> => {
  const { getAllReadersByAuthor } = action

  if (!userId) throw new Error(throwReaderMessages.invalidUser)

  const readers = await getAllReadersByAuthor(userId)

  const formattedReadersByAuthor: TGetReaderByAuthorSchemaResponse = readers?.map((reader) => ({
    latitude: reader.latitude,
    longitude: reader.longitude,
    picture: reader?.picture,
    userName: reader?.userName
  }))

  return formattedReadersByAuthor
}
