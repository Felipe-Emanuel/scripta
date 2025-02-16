import { Chapter } from '@prisma/client'
import { IChapterRepository } from '../ChapterRepository'
import { prisma } from '~/src/lib'
import { TUpdateChapter } from '@types'

export const databaseChapterRepository = (): IChapterRepository => {
  const createChapter = async (chapter: Chapter): Promise<Chapter> => {
    const newChapter = await prisma.chapter.create({
      data: chapter
    })

    return newChapter
  }

  const getChapterById = async (chapterId: string): Promise<Chapter> => {
    const existentChapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId
      }
    })

    return existentChapter || null
  }

  const updateChapter = async (chapter: TUpdateChapter, newWords: number): Promise<Chapter> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingRecord = await prisma.dailyWordCount.findFirst({
      where: {
        chapterId: chapter.id,
        date: {
          gte: today
        }
      }
    })

    if (existingRecord) {
      await prisma.dailyWordCount.update({
        where: { id: existingRecord.id },
        data: {
          wordsWritten: existingRecord.wordsWritten + newWords
        }
      })
    } else {
      await prisma.dailyWordCount.create({
        data: {
          chapterId: chapter.id,
          wordsWritten: newWords
        }
      })
    }

    const updatedChapter = await prisma.chapter.update({
      where: {
        id: chapter.id
      },
      data: {
        ...chapter,
        wordsCounter: { increment: newWords }
      }
    })

    return updatedChapter || null
  }

  const getAllChapters = async (bookId: string): Promise<Chapter[]> => {
    const allChapters = await prisma.chapter.findMany({
      where: {
        bookId
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return allChapters || []
  }

  const deleteChapter = async (chapterId: string): Promise<string> => {
    await prisma.chapter.delete({
      where: {
        id: chapterId
      }
    })

    return 'Capítulo deletado com sucesso!'
  }

  const getAllUpdatedChapters = async (userEmail: string): Promise<Chapter[]> => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const chapters = await prisma.chapter.findMany({
      where: {
        Book: {
          User: {
            email: userEmail
          }
        },
        updatedAt: {
          gte: today
        }
      }
    })

    return chapters || []
  }

  return {
    createChapter,
    getChapterById,
    updateChapter,
    getAllChapters,
    deleteChapter,
    getAllUpdatedChapters
  }
}
