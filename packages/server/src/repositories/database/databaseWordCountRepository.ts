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

  const getWordCountByUserEmail = async (
    email: string,
  ): Promise<WordCount | null> => {
    const wordCounts = await prisma.wordCount.findMany({
      where: {
        email,
      },
    })

    const exisintgUser = wordCounts.find((user) => user.email === email)

    return exisintgUser || null
  }

  const updateWordCount = async (
    email: string,
    words: number,
  ): Promise<WordCount | null> => {
    const today = new Date()
    const wordCounts = await prisma.wordCount.findMany({
      where: {
        email,
        updatedAt: today,
      },
    })

    const exisintgWordCounts = wordCounts.find((user) => user.email === email)

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
    getWordCountByUserEmail,
    updateWordCount,
  }
}
