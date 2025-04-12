import { Feedback } from '@prisma/client'
import { IFeedbackRepository } from '../FeedbackRepository'
import { prisma } from 'src/lib'
import { TCreateFeedback } from '@services'

export const databaseFeedbackRepository = (): IFeedbackRepository => {
  const createFeedback = async (feedBack: TCreateFeedback): Promise<Feedback> => {
    const newFeedback = await prisma.feedback.create({
      data: {
        feedback: feedBack.feedback,
        type: feedBack.type,
        userId: feedBack.userId
      }
    })

    return newFeedback || null
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
