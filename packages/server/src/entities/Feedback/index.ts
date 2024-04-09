import { Feedback } from '@prisma/client'
import { isBase64 } from '@utils'
import { throwFeedbackMessages } from './utils'

export const FeedbackEntitie = (feedback: Feedback) => {
  const createFeedback = async () => {
    if (feedback.screenshot && !isBase64(feedback.screenshot))
      throw new Error(throwFeedbackMessages.notBase64)

    if (!feedback.userEmail) throw new Error(throwFeedbackMessages.unexpectedEmail)

    if (!feedback.type) throw new Error(throwFeedbackMessages.unexpectedType)

    if (!feedback.feedback) throw new Error(throwFeedbackMessages.unexpectedFeedback)

    return feedback
  }

  return {
    createFeedback
  }
}
