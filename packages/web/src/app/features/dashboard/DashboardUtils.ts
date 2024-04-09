'use client'

import { TMenuSearchDefaultItem } from '@shared/types'

import { RiProfileFill } from 'react-icons/ri'
import { TbChartInfographic } from 'react-icons/tb'
import { IoCalendarSharp } from 'react-icons/io5'
import { FaBookOpenReader } from 'react-icons/fa6'
import { ImBooks } from 'react-icons/im'
import { MdFeedback } from 'react-icons/md'

let id = 0

export const menuSearchDefaultItem: TMenuSearchDefaultItem[] = [
  {
    id: id++,
    label: 'Perfil',
    value: 'Profile',
    tip: 'Aqui você pode ver quantas palavras escreveu hoje. Também é possível atualizar conforme progride em sua escrita. Isso deve se atualizar à 00:00.',
    ref: 'profile-root',
    icon: RiProfileFill
  },
  {
    id: id++,
    label: 'Taxa de Satisfação',
    value: 'WordGoals',
    tip: 'Aqui você tem uma visão do seu progresso de escrita, onde pode definir uma meta que deseja alcançar diariamente.',
    ref: 'word-goals-root',
    icon: TbChartInfographic
  },
  {
    id: id++,
    label: 'Acompanhamento de referência',
    value: 'ReferralTracking',
    tip: 'Aqui você acompanha suas metas com base em filtros, onde pode ser buscado todos os dados dentro de uma semana ou mês.',
    ref: 'referral-tracking',
    icon: IoCalendarSharp
  },
  {
    id: id++,
    label: 'Leitores',
    value: 'Reader',
    tip: 'Aqui você tem uma visão de onde estão seus leitores, o que pode proporcionar insights criativos. Você pode ver todos os leitores ou filtrar por livro. Mas apenas aparecerão aqui os que aceitarem compartilhar sua localização.',
    ref: 'reader-root',
    icon: FaBookOpenReader
  },
  {
    id: id++,
    label: 'Desempenho por Gênero/Tema',
    value: 'BooksPerformance',
    tip: 'Aqui você encontra informações valiosas sobre seu desempenho. Filtrando por Acessos você consegue ver seus números em uma visão geral ou filtrada tanto por gênero ou uma combinação de gênero e tema dentro do que você tem escrito na plataforma.',
    ref: 'books-performance-root',
    icon: ImBooks
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
