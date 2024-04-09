import { createFeedback } from '../services'
import { TCreateFeedbackRequest } from '@shared/types'

export const useFeedbackController = () => {
  const sendFeedback = async (
    feedback: TCreateFeedbackRequest,
    closeFeedbackFocused: () => void
  ) => {
    const newFeedback = await createFeedback(feedback)

    if (newFeedback) {
      closeFeedbackFocused()
    }
  }

  return {
    sendFeedback
  }
}
