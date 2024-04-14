import { api } from '@shared/services/axios/api'
import { TBookResponse, TPatchActiveBookRequest, TUpdateBookRequest } from '@shared/types'
import { toast } from 'react-toastify'

export const patchActiveOrConcluedBook = async ({ bookId, where }: TPatchActiveBookRequest) => {
  try {
    const endpoint = `books/${bookId}`

    const body: Pick<TPatchActiveBookRequest, 'where'> = {
      where
    }

    const { data } = await api.put<TBookResponse>(endpoint, body)

    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao atualizar estado de ativo do livro, ${err.message}`)
    }
  }
}

export const deleteBook = async (bookId: string) => {
  try {
    const endpoint = `books/${bookId}`

    const { data } = await api.delete<TBookResponse>(endpoint)

    toast('Livro deletado com sucesso', {
      type: 'info'
    })

    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao deletar o livro ${bookId}, ${err.message}`)
    }
  }
}

export const updateBook = async (bookId: string, updatedBook: TUpdateBookRequest) => {
  try {
    const endpoint = `updateBook/${bookId}`

    const body: TUpdateBookRequest = {
      ...updatedBook
    }

    const { data } = await api.put<TBookResponse>(endpoint, body)

    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao atualizar o livro ${bookId}, ${err.message}`)
    }
  }
}
