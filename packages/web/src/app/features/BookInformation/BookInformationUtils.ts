import { isBase64 } from '@scripta/server/src/shared/utils/stringValidations'
import { z } from 'zod'

export const editBookSchema = z.object({
  title: z.string().min(3, 'Mínimo de 3 caracteres').max(50, 'máximo de 50 caracteres').nullable(),
  description: z.string().min(10, 'Mínimo de 10 caracteres').max(500, 'máximo de 500 caracteres'),
  publishedUrl: z.string().nullable(),
  heroPathUrl: z
    .string()
    .nullable()
    .refine((value) => value === null || (value && !isBase64(value)), {
      message: 'Imagem inválida'
    }),
  gender: z.string().min(3, 'Mínimo de 3 caracteres').max(50, 'máximo de 50 caracteres').nullable(),
  theme: z.string().min(3, 'Mínimo de 3 caracteres').max(50, 'máximo de 50 caracteres').nullable(),
  totalWords: z.coerce.number().min(0, 'Não pode ser negativo')
})

export type TEditBookSchema = z.infer<typeof editBookSchema>

export const animationVariants = {
  initial: (isRight: boolean) => ({
    opacity: 0,
    x: isRight ? '50vw' : '-50vw'
  }),
  animate: {
    opacity: 1,
    x: 0
  },
  exit: (isRight: boolean) => ({
    opacity: 0,
    x: isRight ? '-50vw' : '50vw'
  })
}
