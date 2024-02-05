import { TBookWithCharacters } from '@types'
import { randomUUID } from 'crypto'
import { bookEntitieMock } from './bookEntitieMock'
import { fakeBase64 } from '@constants/fakeBase64'

export const bookWithCharactersMock: TBookWithCharacters = {
  book: {
    ...bookEntitieMock,
  },
  characters: [
    {
      age: 34,
      bookId: randomUUID(),
      createdAt: new Date(),
      description: 'character description Fake',
      hairColor: 'black',
      heroPathUrl: fakeBase64,
      id: randomUUID(),
      lifeStatus: 'alive',
      lifeStatusDetails: 'lifeStatusDetails',
      name: 'Horonel',
      race: 'Human',
      sexuality: 'man',
      updatedAt: new Date(),
    },
  ],
}
