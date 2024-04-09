import { toast } from 'react-toastify'
import { api } from '@shared/services/axios/api'
import { TCreateFeedbackRequest, TCreateFeedbackResponse } from '@shared/types'

export const createFeedback = async ({ feedback }: TCreateFeedbackRequest) => {
  try {
    const endpoint = '/feedback'

    const body: TCreateFeedbackRequest = {
      feedback
    }

    const { data } = await api.post<TCreateFeedbackResponse>(endpoint, body)

    if (data) {
      toast('Seu feedback foi enviado com sucesso!', {
        type: 'success'
      })

      return data
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Falha ao enviar seu Feedback, ${err.message}`)
    }
  }
}
