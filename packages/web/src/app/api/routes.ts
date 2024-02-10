import NextAuth, { DefaultSession, NextAuthOptions, TokenSet } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''
const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ''

interface UserSession {
  session: DefaultSession
  token: TokenSet
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  session: {
    maxAge: 30 * 60 * 24 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }: UserSession) {
      return {
        ...session,
        id: token.sub,
      }
    },

    async signIn() {
      try {
        return true
      } catch (err) {
        const defaultErrorMsg = 'Falha na autenticação: '
        if (err instanceof Error) {
          console.error(defaultErrorMsg, err.message)
          return false
        }
        console.error(defaultErrorMsg, err)
        return false
      }
    },
  },
}

export default NextAuth(authOptions)
