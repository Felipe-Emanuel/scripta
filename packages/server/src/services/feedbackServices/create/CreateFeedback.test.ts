import { inMemoryFeedbackRepository } from '@repositories'
import { CreateFeedbackService, TCreateFeedbackServiceRequest } from '.'
import { feedbackEntitieMock, userEntitieMock } from '~/src/shared/mocks'

describe('CreateFeedbackService', () => {
  const { createFeedback } = inMemoryFeedbackRepository()

  const action: TCreateFeedbackServiceRequest['action'] = {
    createFeedback
  }

  it('should correctly create a new feedback', async () => {
    const sut = await CreateFeedbackService({
      action,
      userId: userEntitieMock.id,
      feedback: feedbackEntitieMock
    })

    expect(sut.message).toEqual('Feedback enviado com sucesso!')
  })
})
