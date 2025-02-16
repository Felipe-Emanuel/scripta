import { api } from '@shared/services/axios/api'
import { TAuthRequest, TCreateUserRequest } from '@shared/types'
import { waitFor } from '@testing-library/react'

jest.mock('@shared/services/axios/api')
let mockApi: {
  post: jest.MockedFunction<typeof api.post>
}

beforeEach(() => {
  mockApi = {
    post: jest.fn()
  }
})

describe('authServices', () => {
  it('should call post method', async () => {
    const endpoint = '/auth'
    const body: TAuthRequest = {
      email: 'test@example.com',
      password: 'A@a12345'
    }

    await mockApi.post(endpoint, body)
    await waitFor(() => {
      expect(mockApi.post.mock.calls[0][0]).toMatch(endpoint)
      expect(mockApi.post.mock.calls[0][1]).toHaveProperty('email', body.email)
    })
  })
})

describe('createUser', () => {
  it('should call create user functions', async () => {
    const endpoint = '/auth'
    const body: TCreateUserRequest = {
      email: 'test@example.com',
      password: 'A@a12345',
      name: 'John Doe',
      hasProvider: true
    }

    await mockApi.post(endpoint, body)
    await waitFor(() => {
      expect(mockApi.post.mock.calls[0][0]).toMatch(endpoint)
      expect(mockApi.post.mock.calls[0][1]).toHaveProperty('name', body.name)
    })
  })
})
