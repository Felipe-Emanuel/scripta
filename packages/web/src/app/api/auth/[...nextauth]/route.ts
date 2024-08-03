import { createUser } from '@features/auth/services'
import { createNewGoal } from '@features/wordGoals/services'
import NextAhth, { User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
const googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!

const secret = process.env.NEXT_PUBLIC_SECRET

type Profile = {
  user: Partial<User>
}

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
    async signIn({ user: { email, name } }: Profile) {
      const isAllowedToSignIn = true

      if (isAllowedToSignIn && email && name) {
        await createNewGoal({
          email,
          goals: {
            createdAt: new Date(),
            words: 0,
            goal: 0
          }
        })

        await createUser({
          email,
          name,
          password: '', // as created by a provider, password will be created in the backend and be sent to the user email address
          hasProvider: true
        })

        return true
      } else {
        return false
      }
    }
  }
}

const handler = NextAhth(authOptions)
export { handler as GET, handler as POST }
