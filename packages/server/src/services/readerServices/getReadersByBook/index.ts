import { IReaderRepository } from '@repositories'
import { TGetReadersByBookIdSchemaResponse } from '@schemas'
import { throwReaderMessages } from '@utils'

export type TGetReadersByBookRequest = {
  action: Pick<IReaderRepository, 'getAllReadersByBook'>
  bookId: string
  authorId: string
}

type TGetReadersByBookResponse = TGetReadersByBookIdSchemaResponse

export const GetReadersByBook = async ({
  action,
  bookId,
  authorId
}: TGetReadersByBookRequest): Promise<TGetReadersByBookResponse> => {
  const { getAllReadersByBook } = action

  if (!bookId) throw new Error(throwReaderMessages.invalidBook)

  if (!authorId) throw new Error(throwReaderMessages.invalidUser)

  const existentReaders = await getAllReadersByBook(bookId)

  if (!existentReaders.length) return []

  const formattedReadersByBook: TGetReadersByBookIdSchemaResponse = existentReaders?.map(
    (reader) => ({
      picture: reader?.picture,
      userName: reader.userName,
      latitude: reader.latitude,
      longitude: reader.longitude
    })
  )

  return formattedReadersByBook
}
