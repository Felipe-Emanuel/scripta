'use client'

import { TMenuSearchDefaultItem } from '@shared/types'

import { MdFeedback } from 'react-icons/md'
import { z } from 'zod'

let id = 0

export const chapterSchema = z.object({
  chapterTitle: z
    .string({
      required_error: 'Digite ao menos 1 caracter'
    })
    .min(1, 'Digite ao menos 1 caracter')
    .max(50, 'Digite no máximo 50 caracteres'),
  firstLineIndent: z.string().default('2')
  // bookId
  // wordsCounter
  // firstLineIndent
  // lineHeight
  // fontSize
  // fontWeight
})

export type TChapterSchema = z.infer<typeof chapterSchema>

export const menuSearchDefaultItem: TMenuSearchDefaultItem[] = [
  {
    id: id++,
    label: 'Feedback',
    value: 'Feedback',
    tip: 'Com o Feedback é onde você contribui com a plataforma. Você pode enviar sugestões, melhorias, reportar bugs e muito mais. Você pode enviar um print para auxiliar o seu texto, tanto arrastando a imagem salva até a área de Feedback ou simplesmente copiando e colando um print na área de texto.',
    ref: 'feedback-sender',
    icon: MdFeedback
  }
]
