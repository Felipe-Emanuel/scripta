import { createUser } from '@features/auth/services'
import NextAhth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'
import { TSessionCustomer } from '~/src/app/shared/types'

type User = {
  id: string
  name: string
  email: string
  image: string
}

type Account = {
  provider: string
  type: string
  providerAccountId: string
  access_token: string
  expires_at: number
  scope: string
  token_type: string
  id_token: string
}

type Profile = {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
}

type AuthData = {
  user: User
  account: Account
  profile: Profile
}

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
const googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!

const secret = process.env.NEXT_PUBLIC_SECRET

// @ts-expect-error: in build process, AuthOptions, by next-auth imports don't work and show an error message about AuthOptions itsn't incompatible with type never
export const authOptions: never = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret
    })
  ],
  secret,
  callbacks: {
    async signIn(authData: AuthData) {
      const {
        user: { email, name, image },
        account: { id_token }
      } = authData
      const isAllowedToSignIn = email && name
      if (isAllowedToSignIn) {
        try {
          await createUser({
            token: id_token
          })

          const cookie: TSessionCustomer = {
            name,
            picture: image,
            accessToken: id_token
          }

          const cookiesServerSide = cookies()
          cookiesServerSide.set('_sst', JSON.stringify(cookie), {
            secure: true,
            maxAge: 86400,
            sameSite: 'strict'
          })

          return true
        } catch {
          return false
        }
      } else {
        return false
      }
    }
  }
}

const handler = NextAhth(authOptions)
export { handler as GET, handler as POST }
