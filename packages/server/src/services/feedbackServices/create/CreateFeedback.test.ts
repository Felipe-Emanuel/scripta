import { inMemoryFeedbackRepository } from '@repositories'
import { CreateFeedbackService, TCreateFeedbackServiceRequest } from '.'
import { feedbackEntitieMock } from '@entities/Feedback/mocks'

describe('CreateFeedbackService', () => {
  const { createFeedback } = inMemoryFeedbackRepository()

  const action: TCreateFeedbackServiceRequest['action'] = {
    createFeedback
  }

  it('should correctly create a new feedback', async () => {
    const sut = await CreateFeedbackService({
      action,
      feedback: feedbackEntitieMock
    })

    expect(sut.feedback).toEqual(feedbackEntitieMock.feedback)
  })
})
