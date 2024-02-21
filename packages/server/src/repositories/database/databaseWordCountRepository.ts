import { WordCount } from '@prisma/client'
import { prisma } from 'src/lib'
import { IWordCountRepository } from 'src/repositories/WordCountRepository'

export const databaseWordCountRepository = (): IWordCountRepository => {
  const createWordCount = async (
    wordCount: WordCount,
  ): Promise<WordCount[]> => {
    const wordCounts = await prisma.wordCount.create({
      data: wordCount,
    })

    const updateWordCount = [{ ...wordCounts, ...wordCount }]
    return updateWordCount
  }

  const getWordCountByUserId = async (
    userId: string,
  ): Promise<WordCount | null> => {
    const wordCounts = await prisma.wordCount.findMany({
      where: {
        userId,
      },
    })

    const exisintgUser = wordCounts.find((user) => user.userId === userId)

    return exisintgUser || null
  }

  const updateWordCount = async (
    userId: string,
    words: number,
  ): Promise<WordCount | null> => {
    const today = new Date()
    const wordCounts = await prisma.wordCount.findMany({
      where: {
        userId,
        updatedAt: today,
      },
    })

    const exisintgWordCounts = wordCounts.find((user) => user.userId === userId)

    if (exisintgWordCounts) {
      const updatedWordCount: WordCount = {
        ...exisintgWordCounts,
        words,
      }

      return await prisma.wordCount.update({
        where: {
          id: updatedWordCount.id,
        },
        data: updatedWordCount,
      })
    }

    return null
  }

  return {
    createWordCount,
    getWordCountByUserId,
    updateWordCount,
  }
}
