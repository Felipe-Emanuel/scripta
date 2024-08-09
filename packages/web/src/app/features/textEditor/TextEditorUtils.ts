import { BsStarFill } from 'react-icons/bs'
import { TMenuSearchDefaultItem } from '@shared/types'

export type TDefaultFonts = typeof defaultFonts

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

export const defaultFonts = [
  {
    key: 'Inter',
    label: 'Inter',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Semi-negrito' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Arial',
    label: 'Arial',
    weight: [
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Semi-negrito' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Courier New',
    label: 'Courier New',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Georgia',
    label: 'Georgia',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Times New Roman',
    label: 'Times New Roman',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Trebuchet MS',
    label: 'Trebuchet MS',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Verdana',
    label: 'Verdana',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Impact',
    label: 'Impact',
    weight: [{ value: 400, name: 'Regular' }]
  },
  {
    key: 'Comic Sans MS',
    label: 'Comic Sans MS',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Lucida Sans Unicode',
    label: 'Lucida Sans Unicode',
    weight: [{ value: 400, name: 'Regular' }]
  },
  {
    key: 'Tahoma',
    label: 'Tahoma',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 600, name: 'Negrito' }
    ]
  },
  {
    key: 'Palatino Linotype',
    label: 'Palatino Linotype',
    weight: [
      { value: 400, name: 'Regular' },
      { value: 600, name: 'Negrito' }
    ]
  }
]
