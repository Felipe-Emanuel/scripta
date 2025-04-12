import { Feedback } from '@prisma/client'
import { IFeedbackRepository } from '../FeedbackRepository'
import { TCreateFeedback } from '@services'

let feedbacks: Feedback[] = []

export const inMemoryFeedbackRepository = (): IFeedbackRepository => {
  const createFeedback = async (feedBack: TCreateFeedback): Promise<Feedback> => {
    const updatedFeedback = (feedbacks = [
      ...feedbacks,
      {
        ...feedbacks[0],
        ...feedBack
      }
    ])

    return updatedFeedback[0]
  }

  const getFeedbacks = async (): Promise<Feedback[]> => feedbacks

  return {
    createFeedback,
    getFeedbacks
  }
}
