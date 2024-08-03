import { ZodError } from 'zod'
import { TJestErrorHandler } from '@types'

/**
 * Handles errors thrown by Zod validation in Jest tests.
 *
 * @template Expected - The type of the expected error message or value.
 * @param {Object} params - The parameters object.
 * @param {ZodError} params.error - The exception thrown within a try-catch block.
 * @param {Expected} params.expected - The expected value for the error message. It can be of any type.
 * @param {number} [params.position=0] - The index of the issue in the Zod error issues array. 0 by default.
 *
 * @example
 * it('should throw about wordsCounter', async () => {
 *   try {
 *     const { createChapter } = ChapterEntitie({
 *       ...chapterMock,
 *       wordsCounter: 'unexpected string'
 *     });
 *
 *     await createChapter();
 *   } catch (e) {
 *     jestErrorHandler({
 *       error: e,
 *       expected: throwChapterMessages.wrongWordsCounter
 *     });
 *   }
 * });
 */

export const jestErrorHandler = <Expected>({
  error,
  expected,
  position = 0
}: TJestErrorHandler<Expected>) => {
  if (error instanceof ZodError) {
    const errorMsg = error.issues[position].message
    expect(errorMsg).toBe(expected)
  }
}
