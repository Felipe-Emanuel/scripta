import { TArrayExemple, TProgressInfo } from '@shared/types'
import { Variants } from 'framer-motion'
import { z } from 'zod'

export const createBookSchema = z.object({
  conclued: z.boolean().default(false),
  description: z.string().min(10, 'Mínimo de 10 palavras').max(1000, 'Máximo de 1000 palavras'),
  gender: z.string().min(3, 'Mínimo de 3 palavras').max(25, 'Máximo de 25 palavras'),
  isActive: z.boolean().default(true),
  publishedUrl: z.string().url('URL inválida!').nullable(),
  theme: z.string().min(3, 'Mínimo de 3 palavras').max(25, 'Máximo de 25 palavras'),
  title: z.string().min(3, 'Mínimo de 3 palavras').max(50, 'Máximo de 50 palavras'),
  totalWords: z.coerce.number()
})

export type TCreateBookSchema = z.infer<typeof createBookSchema>

export const generateRandomStringForExemple = (arrayExemple: TArrayExemple[]) => {
  const randomIndex = Math.floor(Math.random() * arrayExemple.length)
  const choisedExemple = arrayExemple[randomIndex]
  return choisedExemple.label
}

export const newBookWrapperFormVariants = {
  showCreateBookForm: { x: 0 },
  hideCreateBookForm: { x: '100vw' },
  exit: { x: '100vw' }
}

export const variants: Variants = {
  enter: () => {
    return {
      x: 1000
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000
    }
  }
}

let id = 0

export const progressInfo: TProgressInfo[] = [
  {
    id: id++,
    label: 'Sobre o livro',
    type: 'ABOUT_BOOK'
  },
  {
    id: id++,
    label: 'Mídia',
    type: 'MEDIA'
  },
  {
    id: id++,
    label: 'Social',
    type: 'SOCIAL'
  },
  {
    id: id++,
    label: 'Visão geral',
    type: 'OVERVIEW'
  }
]
