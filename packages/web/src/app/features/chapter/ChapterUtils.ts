'use client'

import { MdFeedback } from 'react-icons/md'
import { TbWriting } from 'react-icons/tb'
import { FaBookOpen } from 'react-icons/fa'
import { IoToggle } from 'react-icons/io5'

import { TMenuSearchDefaultItem } from '@shared/types'
import { z } from 'zod'

export const chapterSchema = z.object({
  title: z.string().max(100, 'Que título longo...')
})

export type TChapterSchema = z.infer<typeof chapterSchema>

let id = 0

export const menuSearchDefaultItem: TMenuSearchDefaultItem[] = [
  {
    id: id++,
    label: 'Alternar Modo',
    value: 'previewerToggle',
    tip: 'Ative ou desative o modo de edição com um clique! No modo de edição, você pode escrever e modificar seu texto livremente. No modo de pré-visualização, veja sua obra formatada como um livro real, com paginação e virada de página animada.',
    ref: 'previewer-active-root',
    icon: IoToggle
  },
  {
    id: id++,
    label: 'Pré-visualizador',
    value: 'preview',
    tip: 'Veja sua escrita ganhar vida no formato de um livro real! O Pré-visualizador exibe seu texto com paginação dinâmica e um efeito de virada de página realista, proporcionando uma experiência imersiva e fiel ao formato final da obra.',
    ref: 'text-preview-root',
    icon: FaBookOpen
  },
  {
    id: id++,
    label: 'Editor de texto',
    value: 'textEditor',
    tip: 'O Editor de Texto salva automaticamente suas alterações 1 segundo após o último input. Concentre-se na escrita sem preocupações! Use-o para estruturar capítulos, organizar ideias e desenvolver personagens de forma fluida.',
    ref: 'text-editor-root',
    icon: TbWriting
  },
  {
    id: id++,
    label: 'Feedback',
    value: 'Feedback',
    tip: 'Com o Feedback é onde você contribui com a plataforma. Você pode enviar sugestões, melhorias, reportar bugs e muito mais. Você pode enviar um print para auxiliar o seu texto, tanto arrastando a imagem salva até a área de Feedback ou simplesmente copiando e colando um print na área de texto.',
    ref: 'feedback-sender',
    icon: MdFeedback
  }
]
