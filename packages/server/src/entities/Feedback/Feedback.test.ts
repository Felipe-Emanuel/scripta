import { FeedbackEntitie } from '.'
import { feedbackEntitieMock } from './mocks'
import { throwFeedbackMessages } from './utils'

describe('createFeedback', () => {
  it('should throw about notBase64', () => {
    const { createFeedback } = FeedbackEntitie({
      ...feedbackEntitieMock,
      screenshot: 'unexpected base 64'
    })

    const sut = createFeedback()

    expect(sut).rejects.toThrow(throwFeedbackMessages.notBase64)
  })

  it('should create a new feedback without screenshot', async () => {
    const { createFeedback } = FeedbackEntitie({
      ...feedbackEntitieMock,
      screenshot: ''
    })

    const sut = await createFeedback()

    expect(sut.screenshot).toBe('')
  })

  it('should throw about unexpectedType', () => {
    const { createFeedback } = FeedbackEntitie({
      ...feedbackEntitieMock,
      type: ''
    })

    const sut = createFeedback()

    expect(sut).rejects.toThrow(throwFeedbackMessages.unexpectedType)
  })

  it('should throw about unexpectedFeedback', () => {
    const { createFeedback } = FeedbackEntitie({
      ...feedbackEntitieMock,
      feedback: ''
    })

    const sut = createFeedback()

    expect(sut).rejects.toThrow(throwFeedbackMessages.unexpectedFeedback)
  })

  it('should create a new feedback', async () => {
    const { createFeedback } = FeedbackEntitie(feedbackEntitieMock)

    const sut = await createFeedback()

    expect(sut).toBe(feedbackEntitieMock)
  })
})
