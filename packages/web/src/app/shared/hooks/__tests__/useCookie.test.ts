import { useCookie } from '@shared/hooks/useCookies'
import { TCreateSession } from '@shared/types'
import { parseCookies } from 'nookies'

jest.mock('@shared/hooks/useCookies', () => ({
  useCookie: () => ({
    createSession: jest.fn(),
    deleteCookie: jest.fn(),
  }),
}))

jest.mock('nookies', () => ({
  parseCookies: jest.fn(() => ({})),
}))

describe('useCookies', () => {
  const mockCookieName = 'mockCookieName'
  const mockValueSession = 'John Doe'
  const mockSession: TCreateSession = {
    cookieName: mockCookieName,
    value: mockValueSession,
  }

  it('should create a session cookie', () => {
    const { createSession } = useCookie()
    createSession(mockSession)

    expect(createSession).toHaveBeenCalledWith(mockSession)
  })

  it('should delete a session cookie', () => {
    const { deleteCookie } = useCookie()
    const cookies = parseCookies()

    deleteCookie(mockCookieName)

    const sut = cookies.mockCookieName

    expect(sut).not.toEqual(mockSession)
  })
})
