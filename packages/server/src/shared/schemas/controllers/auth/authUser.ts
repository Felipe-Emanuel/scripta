import { z } from 'zod'
import { throwUserMessages } from '@entities/User/utils'

export const authTag = 'auth'

export const authUserSchema = {
  schema: {
    description: 'Autenticação do usuário',
    tags: [authTag],
    response: {
      401: z.object({
        message: z.string()
      }),
      201: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        picture: z.string(),
        portfolioUrl: z.string(),
        rule: z.string(),
        accessToken: z.string(),
        expirationTime: z.string(),
        createdAt: z.string(),
        updatedAt: z.string()
      })
    },
    body: z.object({
      email: z
        .string({
          invalid_type_error: throwUserMessages.invalidEmail
        })
        .email(),
      password: z.string()
    })
  }
}
