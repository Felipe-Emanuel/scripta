import { api } from '@shared/services/axios/api'
import {
  TGetReaderByBookRequest,
  TReader,
  TReaderResponse,
} from '@shared/types'
import { AxiosError } from 'axios'

export const getReadersByEmail = async (authorEmail: string) => {
  try {
    const endPoint = `getReaders/${authorEmail}`

    const { data } = await api.get<TReaderResponse[]>(endPoint)

    return data
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error('Falha ao recuperar leitores')
  }
}

export const getOnlyReaderByEmail = async (readerEmail: string) => {
  if (!readerEmail) return
  try {
    const endPoint = `reader/${readerEmail}`

    const { data } = await api.get<TReader>(endPoint)

    return data
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(`Falha ao recuperar o leitor ${readerEmail}`)
  }
}

export const getReaderByBook = async ({
  authorEmail,
  bookId,
}: TGetReaderByBookRequest) => {
  if (!authorEmail) return
  try {
    const endPoint = `reader/${authorEmail}/${bookId}`

    const { data } = await api.get<TReaderResponse[]>(endPoint)
    return data
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(`Falha ao recuperar o leitores do livro ${bookId}`)
  }
}
