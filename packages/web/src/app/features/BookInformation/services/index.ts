import { api } from '@shared/services/axios/api'
import { TBookResponse } from '@shared/types'

export const patchActiveBook = async (bookId: string) => {
  try {
    const endpoint = `books/${bookId}`

    const { data } = await api.put<TBookResponse>(endpoint)

    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao atualizar estado de ativo do livro, ${err.message}`)
    }
  }
}
