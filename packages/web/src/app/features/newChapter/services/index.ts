import { api } from '@shared/services/axios/api'
import { TChapterResponse, TCreateChapterRequest, TUpdateChapterRequest } from '@shared/types'

export const createNewChapter = async (body: TCreateChapterRequest, userEmail: string) => {
  try {
    const endpoint = `/chapter/${userEmail}`

    const { data, status } = await api.post<TChapterResponse>(endpoint, body)

    return {
      data,
      status
    }
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha na criação do capítulo, ${body.chapter.chapterTitle}: ${err.message}`)
  }
}

export const updateChapter = async (body: TUpdateChapterRequest, userEmail: string) => {
  try {
    const endpoint = `/chapter/${userEmail}`

    const { data, status } = await api.put<TChapterResponse>(endpoint, body)

    return {
      data,
      status
    }
  } catch (err) {
    if (err instanceof Error)
      throw new Error(
        `Falha na atualização do capítulo, ${body.chapter.chapterTitle}: ${err.message}`
      )
  }
}
