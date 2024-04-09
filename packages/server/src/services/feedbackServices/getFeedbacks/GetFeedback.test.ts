import { inMemoryFeedbackRepository } from '@repositories'
import { GetFeedbackService, TGetFeedbackServiceRequest } from '.'
import { throwFeedbackMessages } from '@entities/Feedback/utils'
import { CreateFeedbackService, TCreateFeedbackServiceRequest } from '../create'
import { feedbackEntitieMock } from '@entities/Feedback/mocks'

describe('GetFeedbackService', () => {
  const { getFeedbacks, createFeedback } = inMemoryFeedbackRepository()

  const action: TGetFeedbackServiceRequest['action'] = {
    getFeedbacks
  }

  const createFeedbackAction: TCreateFeedbackServiceRequest['action'] = {
    createFeedback
  }

  it('should throw about invalid user', () => {
    const sut = GetFeedbackService({
      action,
      isAdmin: false
    })

    expect(sut).rejects.toThrow(throwFeedbackMessages.invalidUser)
  })

  it('should return correctly existents feedbacks', async () => {
    await CreateFeedbackService({
      action: createFeedbackAction,
      feedback: feedbackEntitieMock
    })

    const sut = await GetFeedbackService({
      action,
      isAdmin: true
    })

    expect(sut).toHaveLength(1)
  })
})
