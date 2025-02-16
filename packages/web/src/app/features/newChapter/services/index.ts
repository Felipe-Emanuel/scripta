import { api } from '@shared/services/axios/api'
import { TChapterResponse, TCreateChapterRequest, TPatchChapterHTMLRequest } from '@shared/types'

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

export const patchChapterHTML = async ({ data, userEmail }: TPatchChapterHTMLRequest) => {
  const endpoint = `/chapter/${userEmail}`

  try {
    const { data: updatedChapter } = await api.put<TChapterResponse>(endpoint, data)

    return updatedChapter
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha ao atualizar o capítulo com id ${data.chapter.id}: ${err.message}`)
  }
}

export const patchConclued = async (chapterId: string) => {
  try {
    const endpoint = `/chapterConlued/${chapterId}`

    const { data } = await api.patch<TChapterResponse>(endpoint)

    return data
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha ao marcar o capítulo ${chapterId} como concluído: ${err.message}`)
  }
}
