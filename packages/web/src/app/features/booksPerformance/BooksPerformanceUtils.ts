import { TBookResponse } from '@shared/types'

export const getUniqueItems = (
  data: TBookResponse[],
  property: keyof TBookResponse,
) => {
  return data
    ?.map((item) => ({
      label: item[property],
      value: item[property].toString().toLowerCase(),
    }))
    .filter(
      (value, index, self) =>
        self.findIndex((item) => item.value === value.value) === index,
    )
}

export const genres = [
  {
    value: 'fantasia',
    label: 'Fantasia',
  },
  {
    value: 'ficcao_cientifica',
    label: 'Ficção Científica',
  },
  {
    value: 'romance',
    label: 'Romance',
  },
  {
    value: 'terror',
    label: 'Terror',
  },
  {
    value: 'suspense',
    label: 'Suspense',
  },
  {
    value: 'misterio',
    label: 'Mistério',
  },
  {
    value: 'acao',
    label: 'Ação',
  },
  {
    value: 'aventura',
    label: 'Aventura',
  },
  {
    value: 'distopia',
    label: 'Distopia',
  },
  {
    value: 'young_adult',
    label: 'Young Adult',
  },
  {
    value: 'historico',
    label: 'Histórico',
  },
  {
    value: 'biografico',
    label: 'Biográfico',
  },
  {
    value: 'poesia',
    label: 'Poesia',
  },
  {
    value: 'drama',
    label: 'Drama',
  },
  {
    value: 'comedia',
    label: 'Comédia',
  },
]

export const themes = [
  {
    value: 'amor',
    label: 'Amor',
  },
  {
    value: 'perda',
    label: 'Perda',
  },
  {
    value: 'familia',
    label: 'Família',
  },
  {
    value: 'amizade',
    label: 'Amizade',
  },
  {
    value: 'traicao',
    label: 'Traição',
  },
  {
    value: 'superacao',
    label: 'Superação',
  },
  {
    value: 'preconceito',
    label: 'Preconceito',
  },
  {
    value: 'discriminacao',
    label: 'Discriminação',
  },
  {
    value: 'politica',
    label: 'Política',
  },
  {
    value: 'guerra',
    label: 'Guerra',
  },
  {
    value: 'paz',
    label: 'Paz',
  },
  {
    value: 'natureza',
    label: 'Natureza',
  },
  {
    value: 'meio_ambiente',
    label: 'Meio ambiente',
  },
  {
    value: 'tecnologia',
    label: 'Tecnologia',
  },
  {
    value: 'futuro',
    label: 'Futuro',
  },
  {
    value: 'passado',
    label: 'Passado',
  },
  {
    value: 'morte',
    label: 'Morte',
  },
  {
    value: 'vida',
    label: 'Vida',
  },
  {
    value: 'fe',
    label: 'Fé',
  },
  {
    value: 'espiritualidade',
    label: 'Espiritualidade',
  },
]
