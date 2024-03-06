import { WordCount, WordsCounter } from '@prisma/client'
import { TWordCounter } from '@types'
import { prisma } from 'src/lib'
import { IWordCounterRepository } from 'src/repositories/WordCounterRepository'
import { v4 as uuidv4 } from 'uuid'

export const databaseWordCounterRepository = (): IWordCounterRepository => {
  const createWordCounter = async (
    wordCount: WordCount,
  ): Promise<TWordCounter> => {
    return await prisma.wordsCounter.create({
      data: {
        id: uuidv4(),
        email: wordCount.email,
        wordCount: {
          create: {
            id: uuidv4(),
            wordGoals: wordCount.wordGoals,
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

  const getCounterByEmail = async (
    email: string,
  ): Promise<TWordCounter | null> => {
    const existingWordCounter = await prisma.wordsCounter.findFirst({
      where: { email },
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
        updatedAt: 'asc',
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
        email: wordCount.email,
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
              wordGoals: wordCount.wordGoals,
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

  const updateWordGoals = async (
    email: string,
    wordGoals: number,
  ): Promise<WordCount> => {
    const existingWordCounter = await prisma.wordCount.findFirst({
      where: {
        email,
      },
    })

    if (existingWordCounter) {
      return await prisma.wordCount.update({
        data: {
          ...existingWordCounter,
          wordGoals,
          updatedAt: new Date(),
        },
        where: {
          id: existingWordCounter.id,
        },
      })
    }

    return existingWordCounter
  }

  return {
    createWordCounter,
    getCounterByEmail,
    updatedWordCounter,
    insertWordCount,
    updateWordGoals,
  }
}
