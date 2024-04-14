import { isBase64, isLink } from '@memorize/server/src/shared/utils/stringValidations'
import { z } from 'zod'

export const editBookSchema = z.object({
  title: z.string().min(3, 'Mínimo de 3 caracteres').max(50, 'máximo de 50 caracteres').nullable(),
  description: z.string().min(10, 'Mínimo de 10 caracteres').max(500, 'máximo de 500 caracteres'),
  publishedUrl: z
    .string()
    .nullable()
    .refine((value) => value === null || (value && isLink(value)), {
      message: 'URL inválida'
    }),
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
