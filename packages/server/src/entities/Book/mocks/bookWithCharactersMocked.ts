import { TBookWithCharacters } from '@types'
import { randomUUID } from 'crypto'
import { bookEntitieMock } from './bookEntitieMock'

export const bookWithCharactersMocked: TBookWithCharacters = {
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
      heroPathUrl: 'OGyClxpf/dddCn6S8yobkg==',
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
