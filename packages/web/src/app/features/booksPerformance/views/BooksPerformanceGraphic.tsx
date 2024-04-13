import { Graphics } from '@features/Graphics'
import { booksPerformanceGraphicTV } from '../BookPerformanceTV'

type TSeries = {
  name: string
  data: number[]
}

interface BooksPerformanceGraphicProps {
  series: TSeries[]
  catgories: string[]
}

export function BooksPerformanceGraphic({ catgories, series }: BooksPerformanceGraphicProps) {
  const formattedSeries = series.reduce(
    (acc, serie) => ({
      ...acc,
      data: [...acc.data, ...serie.data],
      name: serie.name
    }),
    { data: [] } as unknown as TSeries
  )

  return (
    <Graphics.root className={booksPerformanceGraphicTV()}>
      <Graphics.content
        type="bar"
        series={[formattedSeries]}
        categories={catgories}
        labels={catgories}
        theme="dark"
        height={220}
        width="100%"
        colors={['#fff']}
      />
    </Graphics.root>
  )
}
