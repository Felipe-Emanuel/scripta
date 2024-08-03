import { setCookie, destroyCookie } from 'nookies'

export interface CreateSession {
  cookieName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
}

/**
 * @returns {
 *  createSession
 * destroySession
 * }
 */

export const useCookie = () => {
  const maxAge = process.env.NEXT_PUBLIC_MAX_AGE_IN_SECONDS

  const createSession = ({ cookieName, value }: CreateSession) =>
    setCookie(null, cookieName, value, {
      maxAge,
      path: '/'
    })

  const deleteCookie = (cookieName: string) =>
    destroyCookie(null, cookieName, {
      cookieName
    })

  return {
    createSession,
    deleteCookie
  }
}
