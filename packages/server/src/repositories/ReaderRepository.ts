import { Reader } from '@prisma/client'
import { TFormattedUser } from '@types'

export interface IReaderRepository {
  createReader: (reader: Reader) => Promise<Reader>
  getAllReadersByBook: (bookId: string) => Promise<Reader[]>
  updateReader: (readerId: string, newReader: Reader) => Promise<Reader>
  getAllReadersByAuthor: (authorEmail: string) => Promise<Reader[]>
  createOnlyBookReader: (bookId: string, newReader: Reader) => Promise<Reader[]>
  getReaderFromEmail: (readerEmail: string) => Promise<TFormattedUser>
}
