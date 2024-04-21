import { api } from '@shared/services/axios/api'
import { TBookRequest, TCreateBookRequest } from '@shared/types'

export const createBook = async ({ userEmail, book }: TCreateBookRequest) => {
  try {
    const endpoint = `/books/${userEmail}`

    const body: TCreateBookRequest = {
      userEmail,
      book
    }

    const { data } = await api.post<TBookRequest>(endpoint, body)

    return data
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha na criação do livro, ${book.title}: ${err.message}`)
  }
}
