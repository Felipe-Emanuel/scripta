import { Feedback } from '@prisma/client'
import { TCreateFeedback } from '@services'

export interface IFeedbackRepository {
  createFeedback: (feedBack: TCreateFeedback) => Promise<Feedback>
  getFeedbacks: () => Promise<Feedback[]>
}
