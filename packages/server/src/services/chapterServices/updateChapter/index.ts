import { Chapter } from '@prisma/client'
import { IChapterRepository, IGoalRepository } from '@repositories'
import { GetAllBooksService, TGetAllBooksServiceRequest } from '@services'
import { throwChapterMessages } from '@entities/Chapter/utils'
import { GetChapterByIdService, TGetChapterByIdServiceRequest } from '../getChapterById'
import { updateChapterServiceSchema } from '@schemas'
import { TUpdateChapter } from '@types'
import { countWords } from '@utils'

type TAction = Pick<IChapterRepository, 'updateChapter' | 'getChapterById'> &
  TGetAllBooksServiceRequest['action'] &
  Pick<IGoalRepository, 'updateGoal'>

export type TUpdateChapterServiceRequest = {
  actions: TAction
  updatedChapter: TUpdateChapter
  userEmail: string
  newWords?: number
}

type TUpdateChapterServiceResponse = Chapter

export const UpdateChapterService = async ({
  actions,
  updatedChapter,
  userEmail,
  newWords = 0
}: TUpdateChapterServiceRequest): Promise<TUpdateChapterServiceResponse> => {
  const { updateChapter, getAllBooks, getChapterById, updateGoal } = actions

  const email = updateChapterServiceSchema.parse({ userEmail })

  const actionGetAllBooks: TGetAllBooksServiceRequest['action'] = { getAllBooks }
  const getChapterAction: TGetChapterByIdServiceRequest['action'] = { getChapterById }

  const booksByEmail = await GetAllBooksService({
    action: actionGetAllBooks,
    userEmail: email.userEmail,
    onlyFirstChapter: true
  })

  const existentBook = booksByEmail.find((book) => book.id === updatedChapter.bookId)
  if (!existentBook) throw new Error(throwChapterMessages.wrongId)

  const existentChapter = await GetChapterByIdService({
    action: getChapterAction,
    chapterId: updatedChapter.id
  })

  const oldWordCount = countWords(existentChapter.chapterText)
  const newWordCount = countWords(updatedChapter.chapterText)
  const wordsAdded = newWordCount - oldWordCount

  const res = await updateChapter(updatedChapter, newWords)

  if (wordsAdded > 0) {
    await updateGoal(userEmail, wordsAdded)
  }

  return res
}
