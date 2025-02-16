import { api } from '@shared/services/axios/api'
import {
  TChapterResponse,
  TPatchChapterHTMLRequest,
  TPatchChapterTitleRequest
} from '@shared/types'

export const getChapterById = async (chapterId: string) => {
  const endpoint = `/chapter/${chapterId}`

  try {
    const { data } = await api.get<TChapterResponse>(endpoint)

    return data
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha ao resgatar o capítulo com id ${chapterId}: ${err.message}`)
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

export const patchChapterTitle = async ({ chapterId, newTitle }: TPatchChapterTitleRequest) => {
  const endpoint = `/chapter/${chapterId}`

  const data = {
    title: newTitle
  }

  try {
    const { data: updatedChapter } = await api.patch<TChapterResponse>(endpoint, data)

    return updatedChapter
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha ao atualizar o título do livro com id ${chapterId}: ${err.message}`)
  }
}

export const deleteChapter = async (chapterId: string) => {
  const endpoint = `/deleteChapter/${chapterId}`

  try {
    const { data } = await api.delete<string>(endpoint)

    return data
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Falha ao deletar o livro com id ${chapterId}: ${err.message}`)
  }
}
