import { Feedback } from '@prisma/client'
import { IFeedbackRepository } from '../FeedbackRepository'

let feedbacks: Feedback[] = []

export const inMemoryFeedbackRepository = (): IFeedbackRepository => {
  const createFeedback = async (feedBack: Feedback): Promise<Feedback[]> => {
    const updatedFeedback = (feedbacks = [{ ...feedbacks, ...feedBack }])

    return updatedFeedback
  }

  const getFeedbacks = async (): Promise<Feedback[]> => feedbacks

  return {
    createFeedback,
    getFeedbacks
  }
}
