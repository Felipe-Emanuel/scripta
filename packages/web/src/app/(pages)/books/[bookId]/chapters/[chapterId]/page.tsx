import { Title } from '@shared/components'
import { Chapter } from '@features/chapter'
import { getChapterById } from '@features/chapter/services'

interface IChapterIdPage {
  params: {
    chapterId: string
    bookId: string
  }
}

export default async function ChapterIdPage({ params }: IChapterIdPage) {
  const chapterId = params?.chapterId

  const chapter = await getChapterById(chapterId)

  if (!chapter)
    return (
      <Title title="Capítulo não designado" color="gray" size="2xl" weight="bold" align="center" />
    )

  return (
    <Chapter.root>
      <Chapter.toggle />
      <Chapter.options chapter={chapter} />
      <Chapter.title title={chapter.chapterTitle} />
      <Chapter.editor initialContent={chapter.chapterText} />
      <Chapter.preview chapterId={chapterId} chapters={[chapter]} />
    </Chapter.root>
  )
}
