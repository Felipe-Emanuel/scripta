import { Reader } from '@prisma/client'
import { throwReaderMessages } from './utils'

export const ReaderEntitie = (reader: Reader, authorEmail: string) => {
  const createReader = async () => {
    if (reader.userEmail === authorEmail)
      throw new Error(throwReaderMessages.emailsShouldBeDifferents)

    if (!reader.longitude || !reader.latitude)
      throw new Error(throwReaderMessages.invalidRegion)

    return reader
  }

  const getReaderByBook = async (readers: Reader[], bookId: string) => {
    if (!authorEmail) throw new Error(throwReaderMessages.invalidUser)

    if (!bookId) throw new Error(throwReaderMessages.invalidBook)

    return readers
  }

  const updateReader = async (readerId: string, newReader: Reader) => {
    if (newReader.userEmail !== authorEmail)
      throw new Error(throwReaderMessages.invalidUser)

    if (!readerId) throw new Error(throwReaderMessages.invalidBook)

    if (!newReader.longitude || !newReader.latitude)
      throw new Error(throwReaderMessages.invalidRegion)

    return newReader
  }

  return {
    createReader,
    getReaderByBook,
    updateReader,
  }
}
