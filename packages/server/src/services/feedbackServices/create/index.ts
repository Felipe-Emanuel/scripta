import { FeedbackEntitie } from '@entities/Feedback'
import { Feedback } from '@prisma/client'
import { IFeedbackRepository } from '@repositories'
import { v4 as uuidv4 } from 'uuid'

export type TCreateFeedbackServiceRequest = {
  action: Pick<IFeedbackRepository, 'createFeedback'>
  feedback: Feedback
}

type TCreateFeedbackServiceResponse = Feedback

export const CreateFeedbackService = async ({
  action,
  feedback
}: TCreateFeedbackServiceRequest): Promise<TCreateFeedbackServiceResponse> => {
  const { createFeedback } = action

  const { createFeedback: create } = FeedbackEntitie(feedback)

  const createdFeedback = await create()

  const newFeedback: Feedback = {
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...createdFeedback
  }

  await createFeedback(newFeedback)

  return newFeedback
}
