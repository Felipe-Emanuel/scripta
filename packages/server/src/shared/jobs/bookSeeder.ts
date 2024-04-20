/**
 * Use this job to populate book table database
 * be carefull with env, if are in dev or prod
 */

import { Book } from '@prisma/client'
import cron from 'node-cron'
import { prisma } from 'src/lib'
import { v4 as uuidv4 } from 'uuid'
import {
  genres,
  themes
} from '../../../../web/src/app/features/booksPerformance/BooksPerformanceUtils'

const combinedObject = [genres, themes].map((array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
})

const usedCombinations = []
const isConcluded = Math.random() < 0.5

async function createBookWithDetails(genreLabel: string, themeLabel: string) {
  const book: Book = {
    title: `A New Book - ${Math.random()}`,
    userEmail: 'felipesullivan50@gmail.com', // key to determine where it should be stored
    description: 'description',
    publishedUrl: 'publishedUrl',
    heroPathUrl: 'heroPathUrl',
    conclued: isConcluded,
    Gender: genreLabel,
    Theme: themeLabel,
    id: uuidv4(),
    totalWords: Math.random() * 50000,
    createdAt: new Date(),
    updatedAt: new Date(),
    hits: Math.random() * 500,
    isActive: true
  }

  try {
    await prisma.book.create({
      data: book,
      include: {
        characters: true,
        reactions: true
      }
    })
    console.log(`Book with genre "${genreLabel}" and theme "${themeLabel}" created successfully.`)
  } catch (error) {
    console.error('Error creating book:', error)
  }
}

export const bookSeederJob = cron.schedule(
  '* * * * *',
  async () => {
    while (usedCombinations.length < combinedObject[0].length) {
      for (let i = 0; i < combinedObject[0].length; i++) {
        if (usedCombinations.includes(`${i}-${i}`)) continue

        const genreLabel = combinedObject[0][i].label
        const themeLabel = combinedObject[1][i].label

        await createBookWithDetails(genreLabel, themeLabel)

        usedCombinations.push(`${i}-${i}`)

        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  },
  {
    scheduled: false
  }
)
