import { z } from 'zod'
import { throwUserMessages } from '~/src/entities/User/utils'

export const userTag = 'user'

export const createUserSchema = {
  schema: {
    description: 'Criação de novo usuário',
    tags: [userTag],
    response: {
      200: z.object({
        message: z.string()
      }),
      404: z.object({
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
      name: z.string(),
      password: z.string(),
      hasProvider: z.boolean(),
      email: z.string().email({
        message: throwUserMessages.invalidEmail
      })
    })
  }
}
