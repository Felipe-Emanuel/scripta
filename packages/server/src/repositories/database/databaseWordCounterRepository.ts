import { WordCount, WordsCounter } from '@prisma/client'
import { TWordCounter } from '@types'
import { prisma } from 'src/lib'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { v4 as uuidv4 } from 'uuid'

export const databaseWordCounterRepository = (): IWordCounterRepository => {
  const createWordCounter = async (
    wordCount: WordCount,
    wordCounterId: string,
  ): Promise<TWordCounter> => {
    return await prisma.wordsCounter.create({
      data: {
        id: wordCounterId,
        wordCount: {
          create: {
            id: uuidv4(),
            email: wordCount.email,
            words: wordCount.words,
            updatedAt: wordCount.updatedAt,
            createdAt: wordCount.createdAt,
          },
        },
      },
      include: {
        wordCount: true,
      },
    })
  }

  const getCounterById = async (
    wordCounterId: string,
  ): Promise<TWordCounter | null> => {
    const existingWordCounter = await prisma.wordsCounter.findFirst({
      where: { id: wordCounterId },
      include: {
        wordCount: true,
      },
    })

    return existingWordCounter || null
  }

  const updatedWordCounter = async (
    updatedAt: Date,
    words: number,
    wordCount: WordCount,
  ): Promise<WordCount> => {
    const existingWordCounter = await prisma.wordCount.findFirst({
      orderBy: {
        updatedAt: 'desc',
      },
      where: {
        id: wordCount.id,
      },
    })

    if (existingWordCounter) {
      return await prisma.wordCount.update({
        data: {
          ...existingWordCounter,
          words,
          updatedAt,
        },
        where: {
          id: wordCount.id,
        },
      })
    }

    return existingWordCounter
  }

  const insertWordCount = async (
    wordCount: WordCount,
  ): Promise<WordsCounter> => {
    const existingWordCounter = await prisma.wordsCounter.findFirst({
      where: {
        id: wordCount.wordsCounterId,
      },
      include: {
        wordCount: true,
      },
    })

    if (existingWordCounter) {
      return await prisma.wordsCounter.update({
        where: {
          id: wordCount.wordsCounterId,
        },
        data: {
          wordCount: {
            create: {
              id: wordCount.id,
              email: wordCount.email,
              words: wordCount.words,
              createdAt: wordCount.createdAt,
              updatedAt: wordCount.updatedAt,
            },
          },
        },
      })
    }

    return existingWordCounter
  }

  return {
    createWordCounter,
    getCounterById,
    updatedWordCounter,
    insertWordCount,
  }
}
