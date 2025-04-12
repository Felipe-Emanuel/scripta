import { z } from 'zod'
import { isPasswordStrong, throwUserMessages } from '@utils'

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
      409: z.object({
        message: z.string()
      }),
      201: z.object({
        name: z.string(),
        picture: z.string().nullable(),
        accessToken: z.string(),
        expirationTime: z.string()
      })
    },
    body: z.object({
      user: z
        .object({
          name: z.string().min(10, throwUserMessages.invalidName),
          password: z.string().refine((value) => isPasswordStrong(value), {
            message: throwUserMessages.strongPassword
          }),
          email: z
            .string()
            .email({
              message: throwUserMessages.invalidEmail
            })
            .nonempty({ message: throwUserMessages.areAllFieldsFilled })
        })
        .refine((data) => data.name && data.password && data.email, {
          message: throwUserMessages.areAllFieldsFilled
        })
        .optional(),
      token: z.string().optional() // criação do usuário com oAuth2, o objeto vem do token gerado pelo provedor
    })
  }
}

export type TCreateUserResponseSchema = z.infer<
  (typeof createUserSchema)['schema']['response']['201']
>
export type TCreateUserBodySchema = z.infer<(typeof createUserSchema)['schema']['body']>
