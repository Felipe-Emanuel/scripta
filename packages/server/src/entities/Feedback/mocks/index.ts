import { Feedback } from '@prisma/client'
import { fakeBase64 } from '@utils'
import { randomUUID } from 'crypto'

export const feedbackEntitieMock: Feedback = {
  id: randomUUID(),
  createdAt: new Date(),
  updatedAt: new Date(),
  feedback: 'a feedback about something',
  screenshot: fakeBase64,
  type: 'bug',
  userEmail: 'foo@app.com'
}
