import { FeedbackEntitie } from '@entities/Feedback'
import { Feedback } from '@prisma/client'
import { IFeedbackRepository } from '@repositories'
import { v4 as uuidv4 } from 'uuid'
import { TCreateFeedbackBodySchema } from '~/src/shared/schemas'

export type TCreateFeedbackServiceRequest = {
  action: Pick<IFeedbackRepository, 'createFeedback'>
  feedback: TCreateFeedbackBodySchema['feedback']
}

type TCreateFeedbackServiceResponse = Feedback

export const CreateFeedbackService = async ({
  action,
  feedback
}: TCreateFeedbackServiceRequest): Promise<TCreateFeedbackServiceResponse> => {
  const { createFeedback } = action

  const { createFeedback: create } = FeedbackEntitie(feedback)

  const createdFeedback = await create()

  const { feedback: message, screenshot, type, userEmail } = createdFeedback

  const newFeedback: Feedback = {
    feedback: message,
    screenshot,
    type,
    userEmail,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  await createFeedback(newFeedback)

  return newFeedback
}
