import { api } from '@shared/services/axios/api'
import { TBookResponse } from '@shared/types'
import { AxiosError } from 'axios'

export const getAllBooks = async (onlyFirstChapter = false) => {
  try {
    const endpoint = `/allBooks/${onlyFirstChapter}`

    const { data } = await api.get<TBookResponse[]>(endpoint)

    return data
  } catch (err) {
    if (err instanceof AxiosError)
      throw new Error(`Erro ao resgatar livros do usuário para o highlight: ${err.message}`)
  }
}
