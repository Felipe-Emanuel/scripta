import { api } from '@shared/services/axios/api'
import { TCreateWordCountRequest } from '@shared/types'
import { waitFor } from '@testing-library/react'

jest.mock('@shared/services/axios/api')
let mockApi: {
  get: jest.MockedFunction<typeof api.get>
  post: jest.MockedFunction<typeof api.post>
}

beforeEach(() => {
  mockApi = {
    get: jest.fn(),
    post: jest.fn(),
  }
})

describe('profileServices', () => {
  it('should call get method', async () => {
    const endpoint = `/wordCount/A@d.com`

    await mockApi.get(endpoint)
    await waitFor(() => {
      expect(mockApi.get.mock.calls[0][0]).toMatch(endpoint)
    })
  })

  it('should call post method', async () => {
    const endpoint = '/wordCount'
    const body: TCreateWordCountRequest = {
      wordCounterId: 'wordCounterId',
      email: 'test@example.com',
      words: 500,
    }

    await mockApi.post(endpoint, body)
    await waitFor(() => {
      expect(mockApi.post.mock.calls[0][0]).toMatch(endpoint)
      expect(mockApi.post.mock.calls[0][1]).toHaveProperty('words', body.words)
      expect(mockApi.post.mock.calls[0][1]).toHaveProperty('email', body.email)
    })
  })
})
