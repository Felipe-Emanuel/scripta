import { generateRandomString } from '~/src/shared/utils'
import { ChapterEntitie } from '.'
import { chapterMock } from './mocks'
import { constants, throwChapterMessages } from './utils'
import { jestErrorHandler } from '__tests__/jestErrorHandler'
import { bookEntitieMock } from '../Book/mocks'

describe('createChapter', () => {
  it('should throw about wordsCounter', async () => {
    try {
      const { createChapter } = ChapterEntitie({
        ...chapterMock,
        // @ts-expect-error: testando tipo de valor da propriedade conforme esperado no backend
        wordsCounter: 'unexpected string'
      })

      await createChapter()
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.wrongWordsCounter
      })
    }
  })

  it('should throw about /MAX/ words into a unique chapter', async () => {
    const { MAX_WORDS_BY_CHAPTER } = constants

    try {
      const { createChapter } = ChapterEntitie({
        ...chapterMock,
        wordsCounter: MAX_WORDS_BY_CHAPTER * 2
      })

      await createChapter()
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.maxLength
      })
    }
  })

  it('should throw about /MIN/ words into a unique chapter', async () => {
    const { MIN_WORDS_BY_CHAPTER } = constants

    try {
      const { createChapter } = ChapterEntitie({
        ...chapterMock,
        wordsCounter: MIN_WORDS_BY_CHAPTER / 2
      })

      await createChapter()
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.minLength
      })
    }
  })

  it('should throw about /MAX/ words into a chapter title', async () => {
    const { MAX_CHAPTER_TITLE_CHARACTERS } = constants

    const chapterTitle = generateRandomString(MAX_CHAPTER_TITLE_CHARACTERS * 2)

    try {
      const { createChapter } = ChapterEntitie({
        ...chapterMock,
        chapterTitle
      })

      await createChapter()
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.maxLengthTitle
      })
    }
  })

  it('should throw about /MIN/ words into a chapter title', async () => {
    const { MIN_CHAPTER_TITLE_CHARACTERS } = constants

    const chapterTitle = generateRandomString(MIN_CHAPTER_TITLE_CHARACTERS / 2)

    try {
      const { createChapter } = ChapterEntitie({
        ...chapterMock,
        chapterTitle
      })
      await createChapter()
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.minLengthTitle
      })
    }
  })

  it('should reaturn a valid created book', async () => {
    const { createChapter } = ChapterEntitie(chapterMock)

    const sut = await createChapter()

    expect(sut).toStrictEqual(chapterMock)
  })
})

describe('validBookdId', () => {
  it('should throw about invalid bookId', async () => {
    try {
      const { validBookdId } = ChapterEntitie()

      await validBookdId({
        bookId: ''
      })
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.notFound
      })
    }
  })

  it('return a valid bookId', async () => {
    const bookId = bookEntitieMock.id

    const { validBookdId } = ChapterEntitie()

    const sut = await validBookdId({
      bookId
    })

    expect(sut.bookId).toBe(bookId)
  })
})

describe('patchChapterTitle', () => {
  it('should throw about invalid new title required', async () => {
    try {
      const { patchChapterTitle } = ChapterEntitie()

      await patchChapterTitle('')
    } catch (e) {
      jestErrorHandler({
        error: e,
        expected: throwChapterMessages.titleRequired
      })
    }
  })

  it('return a valid book with new title', async () => {
    const newTitle = 'new title'

    const { patchChapterTitle } = ChapterEntitie()

    const sut = await patchChapterTitle(newTitle)

    expect(sut.chapterTitle).toBe(newTitle)
  })
})
