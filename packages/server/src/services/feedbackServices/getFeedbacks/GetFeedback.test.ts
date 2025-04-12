import { inMemoryFeedbackRepository } from '@repositories'
import { GetFeedbackService, TGetFeedbackServiceRequest } from '.'
import { CreateFeedbackService, TCreateFeedbackServiceRequest } from '../create'
import { throwFeedbackMessages } from '@utils'
import { feedbackEntitieMock, userEntitieMock } from '~/src/shared/mocks'

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
      userId: userEntitieMock.id,
      feedback: feedbackEntitieMock
    })

    const sut = await GetFeedbackService({
      action,
      isAdmin: true
    })

    expect(sut).toHaveLength(1)
  })
})
