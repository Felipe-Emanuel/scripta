import { throwFeedbackMessages } from '@entities/Feedback/utils'
import { Feedback } from '@prisma/client'
import { IFeedbackRepository } from '@repositories'

export type TGetFeedbackServiceRequest = {
  action: Pick<IFeedbackRepository, 'getFeedbacks'>
  isAdmin: boolean
}

type TGetFeedbackServiceResponse = Feedback[]

export const GetFeedbackService = async ({
  action,
  isAdmin
}: TGetFeedbackServiceRequest): Promise<TGetFeedbackServiceResponse> => {
  const { getFeedbacks } = action

  if (!isAdmin) throw new Error(throwFeedbackMessages.invalidUser)

  const feedbacks = getFeedbacks()

  return feedbacks || []
}
