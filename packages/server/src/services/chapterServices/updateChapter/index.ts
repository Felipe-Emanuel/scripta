import { z } from 'zod'
import { Chapter } from '@prisma/client'
import { ChapterEntitie } from '@entities/Chapter'
import { IChapterRepository } from '@repositories'
import { GetAllBooksService, TGetAllBooksServiceRequest } from '@services'
import { throwChapterMessages } from '@entities/Chapter/utils'
import { GetChapterByIdService, TGetChapterByIdServiceRequest } from '../getChapterById'

type TAction = Pick<IChapterRepository, 'updateChapter' | 'getChapterById'> &
  TGetAllBooksServiceRequest['action']

export type TUpdateChapterServiceRequest = {
  actions: TAction
  updatedChapter: Omit<Chapter, 'updatedAt'>
  userEmail: string
}

type TUpdateChapterServiceResponse = Chapter

export const UpdateChapterService = async ({
  actions,
  updatedChapter,
  userEmail
}: TUpdateChapterServiceRequest): Promise<TUpdateChapterServiceResponse> => {
  const { updateChapter, getAllBooks, getChapterById } = actions

  const paramSchema = z.object({
    userEmail: z
      .string({
        required_error: throwChapterMessages.requiredEmail
      })
      .email(throwChapterMessages.invalidEmail)
  })

  const email = paramSchema.parse({ userEmail })

  const actionGetAllBooks: TGetAllBooksServiceRequest['action'] = {
    getAllBooks
  }

  const getChapterAction: TGetChapterByIdServiceRequest['action'] = {
    getChapterById
  }

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

  const { createChapter: create } = ChapterEntitie({
    updatedAt: new Date(),
    bookId: existentBook.id,
    id: existentChapter.id,
    createdAt: existentChapter.createdAt,
    ...updatedChapter
  })

  const newChapter = await create()

  await updateChapter(newChapter)

  return newChapter
}
