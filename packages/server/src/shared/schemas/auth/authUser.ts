import { z } from 'zod'
import { throwUserMessages } from '@utils'

export const authTag = 'auth'

export const authUserSchema = {
  schema: {
    description: 'Autenticação do usuário',
    tags: [authTag],
    response: {
      401: z.object({
        message: z.string()
      }),
      200: z.object({
        name: z.string(),
        picture: z.string().nullable(),
        accessToken: z.string()
      })
    },
    body: z.object({
      email: z
        .string({
          invalid_type_error: throwUserMessages.invalidEmail
        })
        .email(),
      password: z.string().nullable()
    })
  }
}
