import { feedbackTypes } from '@features/feedback/FeedbackUtils'

const feedbackTypesOptions = feedbackTypes.map((f) => f.value)

type FeedbackType = (typeof feedbackTypesOptions)[number]

type Feedback = {
  feedback: string
  screenshot: string
  type: FeedbackType
  userEmail: string
}

export type TCreateFeedbackRequest = {
  feedback: Feedback
}
