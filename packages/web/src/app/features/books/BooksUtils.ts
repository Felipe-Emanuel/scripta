'use client'

import { TMenuSearchDefaultItem } from '@shared/types'

import { MdFeedback } from 'react-icons/md'
import { BsStarFill } from 'react-icons/bs'
import { FaInfo } from 'react-icons/fa'

let id = 0

export const menuSearchDefaultItem: TMenuSearchDefaultItem[] = [
  {
    id: id++,
    label: 'Destaque',
    value: 'Highlight',
    tip: 'Aqui você tem acesso à uma visão privilegiada do seu livro mais acessado, conseguindo acesso direto ao que seus leitores mais apreciam em você.',
    ref: 'highlight-root',
    icon: BsStarFill
  },
  {
    id: id++,
    label: 'Informações do Livro',
    value: 'BookInformationRoot',
    tip: 'Aqui você encontra uma visão geral do livro selecionado, onde consegue, de maneira rápida e fácil, acessar seus personagens, ver informações sobre as reações, acessos, leitores e palavras, além de conseguir acessar diretamente a sua publicação.',
    ref: 'book-information-root',
    icon: FaInfo
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
