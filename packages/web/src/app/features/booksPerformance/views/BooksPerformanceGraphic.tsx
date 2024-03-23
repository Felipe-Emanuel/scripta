import { Graphics } from '@features/Graphics'

interface BooksPerformanceGraphicProps {
  series: {
    name: string
    data: number[]
  }[]
  catgories: string[]
}

export function BooksPerformanceGraphic({
  catgories,
  series,
}: BooksPerformanceGraphicProps) {
  return (
    <Graphics.root className="w-full p-2 bg-bar-graphic-background backdrop-blur-md rounded-2xl h-full">
      <Graphics.content
        type="bar"
        series={series}
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
