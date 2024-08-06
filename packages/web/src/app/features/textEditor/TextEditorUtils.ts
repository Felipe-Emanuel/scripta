import { BsStarFill } from 'react-icons/bs'
import { TMenuSearchDefaultItem } from '@shared/types'


let id = 0

export const menuSearchDefaultItem: TMenuSearchDefaultItem[] = [
  {
    id: id++,
    label: 'Destaque',
    value: 'Highlight',
    tip: 'Aqui você tem acesso à uma visão privilegiada do seu livro mais acessado, conseguindo acesso direto ao que seus leitores mais apreciam em você.',
    ref: 'highlight-root',
    icon: BsStarFill
  }
]
