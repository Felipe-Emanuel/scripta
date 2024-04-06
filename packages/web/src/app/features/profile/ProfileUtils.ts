import { z } from 'zod'

export const updateWordCountSchema = z.object({
  wordCount: z.coerce.number().min(100, 'Mínimo de 100.'),
})

export type TUpdateWordCountSchema = z.infer<typeof updateWordCountSchema>
