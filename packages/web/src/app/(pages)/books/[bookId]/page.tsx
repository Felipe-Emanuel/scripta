import { NewChapter } from '@features/newChapter'

interface IBookIdPage {
  params: {
    bookId: string
  }
}

export default function BookIdPage({ params }: IBookIdPage) {
  return (
    <NewChapter.root bookId={params?.bookId ?? ''}>
      <NewChapter.header bookId={params?.bookId} />
      <NewChapter.editor bookId={params?.bookId} />
    </NewChapter.root>
  )
}
