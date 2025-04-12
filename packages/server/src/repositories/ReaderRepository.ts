import { Reader } from '@prisma/client'
import { TCreateReaderSchemaResponse, TGetReaderByAuthorSchemaResponse } from '@schemas'
import { TCreateReaderEntitie } from '@services'

export interface IReaderRepository {
  createReader: (reader: TCreateReaderSchemaResponse) => Promise<TCreateReaderEntitie>
  getAllReadersByBook: (bookId: string) => Promise<Reader[]>
  updateReader: (readerId: string, newReader: Reader) => Promise<Reader>
  getAllReadersByAuthor: (authorId: string) => Promise<TGetReaderByAuthorSchemaResponse>
  createOnlyBookReader: (bookId: string, newReader: Reader) => Promise<Reader[]>
}
