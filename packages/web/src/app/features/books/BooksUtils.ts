'use client'

import { TMenuSearchDefaultItem, TNewBookFormState, TProgressBarWhiteBarTV } from '@shared/types'

import { BsStarFill } from 'react-icons/bs'
import { FaInfo } from 'react-icons/fa'
import { MdFormatListBulletedAdd, MdFeedback } from 'react-icons/md'
import { IoLibrarySharp } from 'react-icons/io5'

export type State = {
  stage: TProgressBarWhiteBarTV
  progress: number
  label: 'Sobre o livro' | 'Mídia' | 'Social' | 'Visão geral'
  lastLabel: 'Sobre o livro' | 'Mídia' | 'Social' | 'Visão geral'
}

interface Action {
  type: TNewBookFormState['state']
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ABOUT_BOOK':
      return {
        stage: 'ABOUT_BOOK',
        progress: 1,
        label: 'Sobre o livro',
        lastLabel: 'Sobre o livro'
      }
    case 'MEDIA':
      return {
        stage: 'MEDIA',
        progress: 2,
        label: 'Mídia',
        lastLabel: 'Sobre o livro'
      }
    case 'SOCIAL':
      return {
        stage: 'SOCIAL',
        progress: 3,
        label: 'Social',
        lastLabel: 'Mídia'
      }
    case 'OVERVIEW':
      return {
        stage: 'OVERVIEW',
        progress: 4,
        label: 'Visão geral',
        lastLabel: 'Social'
      }
    default:
      return state
  }
}

export const initialState: State = {
  stage: 'ABOUT_BOOK',
  progress: 1,
  label: 'Sobre o livro',
  lastLabel: 'Sobre o livro'
}

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
    label: 'Novo Livro',
    value: 'NewBook',
    tip: 'Aqui é onde você pode adicionar um novo livro, adicionando descrições, links de redirecionamentos, quantidade de palavras e etc. Mas não se preocupe, você poderá editá-lo quando achar que é necessário.',
    ref: 'new-book-root',
    icon: MdFormatListBulletedAdd
  },
  {
    id: id++,
    label: 'Meus Livros',
    value: 'NewBook',
    tip: 'Aqui é onde você encontra uma lista abrangente e muito versátil de todos os seus livros. Você também terá alguns atalhos de ações, como visualizá-lo melhor, editar ou até mesmo deletá-lo. Para mais, selecione-o e veja mais na aba de Informações do Livro.',
    ref: 'my-own-books-root',
    icon: IoLibrarySharp
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
