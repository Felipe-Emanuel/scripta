import { z } from 'zod'

const minLengthPassword = 8

export const authSubmitSchema = z.object({
  Name: z.string().min(15, 'Digite seu nome completo').default('').nullable(),
  email: z.string().min(18, 'Pro favor, verifique seu e-mail'),
  password: z
    .string()
    .min(
      minLengthPassword,
      `Senhas devem ter pelomenos ${minLengthPassword} caracteres`,
    ),
})

export type TAuthSubmitSchema = z.infer<typeof authSubmitSchema>
