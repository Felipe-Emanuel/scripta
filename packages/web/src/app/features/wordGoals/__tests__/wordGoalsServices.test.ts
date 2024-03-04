import { api } from '@shared/services/axios/api'
import { TUpdateWordsGoalRequest } from '@shared/types/requests/TUpdateWordsGoalRequest'
import { waitFor } from '@testing-library/react'

jest.mock('@shared/services/axios/api')
let mockApi: {
  patch: jest.MockedFunction<typeof api.patch>
}

beforeEach(() => {
  mockApi = {
    patch: jest.fn(),
  }
})

describe('authServices', () => {
  it('should call post method', async () => {
    const endpoint = '/wordCount'
    const body: TUpdateWordsGoalRequest = {
      email: 'test@example.com',
      wordGoals: 500,
    }

    await mockApi.patch(endpoint, body)
    await waitFor(() => {
      expect(mockApi.patch.mock.calls[0][0]).toMatch(endpoint)
      expect(mockApi.patch.mock.calls[0][1]).toHaveProperty('email', body.email)
    })
  })
})
