import { WordCount } from '@prisma/client'

export type TWordCounter = {
  id: string
  email: string
  wordCount: WordCount[]
}
