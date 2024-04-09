import { TFeedbackType } from '@shared/types'

import { HTMLMotionProps } from 'framer-motion'

import { FaBug } from 'react-icons/fa'
import { FaLightbulb } from 'react-icons/fa'
import { IoIosThumbsUp } from 'react-icons/io'
import { FaNewspaper } from 'react-icons/fa'
import { RiEmotionSadFill } from 'react-icons/ri'
import { FaQuestion } from 'react-icons/fa'

export const motionProps: HTMLMotionProps<'section'> = {
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  }
}

let id = 0

export const feedbackTypes: TFeedbackType[] = [
  {
    id: id++,
    label: 'Bug',
    value: 'bug',
    icon: FaBug,
    initialFeedback:
      'Aqui estão algumas observações que gostaria de compartilhar sobre o bug que encontrei...'
  },
  {
    id: id++,
    label: 'Melhoria',
    value: 'improvement',
    icon: FaLightbulb,
    initialFeedback:
      'Tenho algumas ideias para melhorar esta funcionalidade. Aqui está o que estou pensando...'
  },
  {
    id: id++,
    label: 'Elogio',
    value: 'praise',
    icon: IoIosThumbsUp,
    initialFeedback:
      'Queria expressar o quanto estou impressionado com esta funcionalidade. Ótimo trabalho!'
  },
  {
    id: id++,
    label: 'Sugestão',
    value: 'suggestion',
    icon: FaNewspaper,
    initialFeedback:
      'Tenho uma sugestão que acredito que poderia melhorar esta parte do sistema. Que tal...'
  },
  {
    id: id++,
    label: 'Dificuldade',
    value: 'difficulty',
    icon: RiEmotionSadFill,
    initialFeedback:
      'Estou enfrentando alguns problemas com esta funcionalidade. Aqui estão os detalhes...'
  },
  {
    id: id++,
    label: 'Pergunta',
    value: 'question',
    icon: FaQuestion,
    initialFeedback:
      'Tenho uma dúvida sobre como usar esta parte do sistema. Você poderia me ajudar com isso?'
  }
]
