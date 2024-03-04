export type TWordCount = {
  id: string
  wordsCounterId: string
  email: string
  words: number
  wordGoals: number
  createdAt: Date
  updatedAt: Date
}

export type TWordCountResponse = {
  email: string
  id: string
  wordCount: TWordCount[]
}
