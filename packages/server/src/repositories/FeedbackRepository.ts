import { Feedback } from '@prisma/client'

export interface IFeedbackRepository {
  createFeedback: (feedBack: Feedback) => Promise<Feedback[]>
  getFeedbacks: () => Promise<Feedback[]>
}
