import { IChapterRepository, IGoalRepository } from '@repositories'
import { GetAllBooksService, TGetAllBooksServiceRequest } from '@services'
import { GetChapterByIdService, TGetChapterByIdServiceRequest } from '../getChapterById'
import { countWords, throwChapterMessages } from '@utils'
import { TUpdateChapterSchemaRequest, TUpdateChapterSchemaResponse } from '@schemas'

type TAction = Pick<IChapterRepository, 'updateChapter' | 'getChapterById'> &
  TGetAllBooksServiceRequest['action'] &
  Pick<IGoalRepository, 'updateGoal'>

export type TUpdateChapterServiceRequest = {
  actions: TAction
  updatedChapter: TUpdateChapterSchemaRequest['updatedChapter']
  userid: string
  newWords?: number
}

type TUpdateChapterServiceResponse = TUpdateChapterSchemaResponse

export const UpdateChapterService = async ({
  actions,
  updatedChapter,
  userid,
  newWords = 0
}: TUpdateChapterServiceRequest): Promise<TUpdateChapterServiceResponse> => {
  const { updateChapter, getAllBooks, getChapterById, updateGoal } = actions

  const actionGetAllBooks: TGetAllBooksServiceRequest['action'] = { getAllBooks }
  const getChapterAction: TGetChapterByIdServiceRequest['action'] = { getChapterById }

  const booksByEmail = await GetAllBooksService({
    action: actionGetAllBooks,
    userid,
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
    await updateGoal(userid, wordsAdded)
  }

  return res
}
