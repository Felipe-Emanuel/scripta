import { WordCount } from '@prisma/client'

export type TWordCounter = {
  id: string
  wordCount: WordCount[]
}
