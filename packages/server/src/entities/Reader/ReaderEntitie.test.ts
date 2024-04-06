import { Reader } from '@prisma/client'
import { ReaderEntitie } from '.'
import { mockReader } from './mocks'
import { throwReaderMessages } from './utils'
import { userEntitieMock } from '@entities/User/mocks/userEntitieMock'
import { bookEntitieMock } from '@entities/Book/mocks'

describe('createReader', () => {
  it('should throw exception about conflict emails', () => {
    const { createReader } = ReaderEntitie(
      {
        ...mockReader,
        userEmail: mockReader.userEmail
      },
      mockReader.userEmail
    )
    const sut = createReader()

    expect(sut).rejects.toThrow(throwReaderMessages.emailsShouldBeDifferents)
  })

  it('should throw exception about invalid region', () => {
    const { createReader } = ReaderEntitie(
      {
        ...mockReader,
        latitude: undefined
      },
      userEntitieMock.email
    )

    const sut = createReader()

    expect(sut).rejects.toThrow(throwReaderMessages.invalidRegion)
  })

  it('should be able to create a new reader', async () => {
    const { createReader } = ReaderEntitie(mockReader, userEntitieMock.email)
    const sut = await createReader()

    expect(sut).toEqual(mockReader)
  })
})

describe('getReaderByBook', () => {
  it('should throw exception about conflict emails', () => {
    const { getReaderByBook } = ReaderEntitie(
      {
        ...mockReader
      },
      ''
    )
    const sut = getReaderByBook([mockReader], bookEntitieMock.id)
    expect(sut).rejects.toThrow(throwReaderMessages.invalidUser)
  })

  it('should throw exception about invalid book', () => {
    const { getReaderByBook } = ReaderEntitie(
      {
        ...mockReader
      },
      mockReader.userEmail
    )
    const sut = getReaderByBook([mockReader], '')
    expect(sut).rejects.toThrow(throwReaderMessages.invalidBook)
  })

  it('should be able to return a list of readers', async () => {
    const { getReaderByBook } = ReaderEntitie(
      {
        ...mockReader
      },
      mockReader.userEmail
    )
    const sut = await getReaderByBook([mockReader], bookEntitieMock.id)
    expect(sut).toHaveLength(1)
  })
})

describe('updateReader', () => {
  const newReader: Reader = {
    ...mockReader,
    latitude: -17.860072299444084,
    longitude: -41.508565834241985
  }

  it('should throw wception about invalidUser', () => {
    const { updateReader } = ReaderEntitie(
      {
        ...mockReader
      },
      mockReader.userEmail
    )

    const sut = updateReader(mockReader.id, {
      ...newReader,
      userEmail: 'unexpectedEmail'
    })
    expect(sut).rejects.toThrow(throwReaderMessages.invalidUser)
  })

  it('should throw wception about invalidBook', () => {
    const { updateReader } = ReaderEntitie(
      {
        ...mockReader
      },
      mockReader.userEmail
    )

    const sut = updateReader('', newReader)
    expect(sut).rejects.toThrow(throwReaderMessages.invalidBook)
  })

  it('should throw wception about invalidRegion', () => {
    const { updateReader } = ReaderEntitie(
      {
        ...mockReader
      },
      mockReader.userEmail
    )

    const sut = updateReader(mockReader.id, {
      ...newReader,
      longitude: undefined
    })
    expect(sut).rejects.toThrow(throwReaderMessages.invalidRegion)
  })

  it('should be able to return a updated reader', async () => {
    const { updateReader } = ReaderEntitie(
      {
        ...mockReader
      },
      mockReader.userEmail
    )

    const sut = await updateReader(mockReader.id, newReader)
    expect(sut.longitude).toEqual(newReader.longitude)
  })
})
