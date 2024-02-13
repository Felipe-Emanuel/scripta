import NextAhth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID ?? ''
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET ?? ''
const secret = process.env.NEXT_PUBLIC_SECRET ?? ''

// @ts-expect-error: in build process, AuthOptions, by next-auth imports don't work and show an error message about AuthOptions itsn't incompatible with type never
export const authOptions: never = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  secret,
}

const handler = NextAhth(authOptions)
export { handler as GET, handler as POST }
