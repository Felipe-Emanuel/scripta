import { api } from '~/src/app/shared/services/axios/api'
import { TBookResponse } from '~/src/app/shared/types'

export const getBookById = async (userEmail: string, bookId: string) => {
  const endpoint = `/books/${userEmail}/${bookId}`

  try {
    const { data } = await api.get<TBookResponse>(endpoint)

    return data
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha ao resgatar o capítulo com id ${bookId}: ${err.message}`)
  }
}
