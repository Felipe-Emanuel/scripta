import { api } from '@shared/services/axios/api'
import { TGetReaderByBookRequest, TReader, TReaderResponse } from '@shared/types'
import { AxiosError } from 'axios'

export const getReadersById = async () => {
  try {
    const endPoint = `/getReaders`

    const { data } = await api.get<TReaderResponse[]>(endPoint)

    return data
  } catch (error) {
    if (error instanceof AxiosError) throw new Error('Falha ao recuperar leitores')
  }
}

export const getOnlyReaderByEmail = async (readerEmail: string) => {
  if (!readerEmail) return
  try {
    const endPoint = `reader/${readerEmail}`

    const { data } = await api.get<TReader>(endPoint)

    return data
  } catch (error) {
    if (error instanceof AxiosError) throw new Error(`Falha ao recuperar o leitor ${readerEmail}`)
  }
}

export const getReaderByBook = async ({ bookId }: TGetReaderByBookRequest) => {
  try {
    const endPoint = `reader/${bookId}`

    const { data } = await api.get<TReaderResponse[]>(endPoint)
    return data
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(`Falha ao recuperar o leitores do livro ${bookId}`)
  }
}
