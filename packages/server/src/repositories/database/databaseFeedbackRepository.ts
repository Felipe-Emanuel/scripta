import { Feedback } from '@prisma/client'
import { IFeedbackRepository } from '../FeedbackRepository'
import { prisma } from 'src/lib'

export const databaseFeedbackRepository = (): IFeedbackRepository => {
  const createFeedback = async (feedBack: Feedback): Promise<Feedback[]> => {
    const newFeedback = await prisma.feedback.create({
      data: feedBack
    })

    return [newFeedback]
  }

  const getFeedbacks = async (): Promise<Feedback[]> => {
    const feedbacks = await prisma.feedback.findMany()

    return feedbacks || []
  }

  return {
    createFeedback,
    getFeedbacks
  }
}
