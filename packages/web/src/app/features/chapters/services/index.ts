import { api } from '~/src/app/shared/services/axios/api'
import { TChapterResponse } from '~/src/app/shared/types'

export const getAllChapters = async (bookId: string) => {
  const endpoint = `/chapters/${bookId}`

  try {
    const { data } = await api.get<TChapterResponse[]>(endpoint)

    return data
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha ao resgatar capítulos do livro com id ${bookId}: ${err.message}`)
  }
}
