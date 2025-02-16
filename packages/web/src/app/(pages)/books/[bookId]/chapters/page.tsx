import { Chapters } from '@features/chapters'

interface IChapterPage {
  params: {
    bookId: string
  }
}

export default async function ChaptesrPage({ params }: IChapterPage) {
  return (
    <Chapters.root>
      <Chapters.header bookId={params?.bookId} />
    </Chapters.root>
  )
}
