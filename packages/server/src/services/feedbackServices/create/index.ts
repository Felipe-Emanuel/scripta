import { IFeedbackRepository } from '@repositories'
import { TCreateFeedbackBodySchema, TCreateFeedbackBodySchemaResponse } from '@schemas'

export type TCreateFeedback = TCreateFeedbackBodySchema['feedback'] & { userId: string }

export type TCreateFeedbackServiceRequest = {
  action: Pick<IFeedbackRepository, 'createFeedback'>
  feedback: TCreateFeedbackBodySchema['feedback']
  userId: string
}

type TCreateFeedbackServiceResponse = TCreateFeedbackBodySchemaResponse

export const CreateFeedbackService = async ({
  action,
  userId,
  feedback
}: TCreateFeedbackServiceRequest): Promise<TCreateFeedbackServiceResponse> => {
  const { createFeedback } = action

  const { feedback: message, screenshot, type } = feedback

  const newFeedback: TCreateFeedback = {
    feedback: message,
    screenshot,
    type,
    userId
  }

  await createFeedback(newFeedback)

  return {
    message: 'Feedback enviado com sucesso!'
  }
}
