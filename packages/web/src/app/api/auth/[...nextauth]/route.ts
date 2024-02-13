import NextAhth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''
const googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? ''

/**
 * autenticação com facebook requer finalziação do mvp para incluir politica de privacidades
 */

// const facebookClientId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID ?? ''
// const facebookClientSecret =
//   process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET ?? ''

const secret = process.env.NEXT_PUBLIC_SECRET ?? ''

// @ts-expect-error: in build process, AuthOptions, by next-auth imports don't work and show an error message about AuthOptions itsn't incompatible with type never
export const authOptions: never = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    //   FacebookProvider({
    //     clientId: facebookClientId,
    //     clientSecret: facebookClientSecret,
    //   }),
  ],
  secret,
}

const handler = NextAhth(authOptions)
export { handler as GET, handler as POST }
