import { TChapterResponse } from '@shared/types'
import { PageFlip, Title } from '@shared/components'

export interface ICurrentChapterProps {
  chapters: TChapterResponse[] | undefined
  chapterId: string
}

export function CurrentChapter({ chapterId, chapters }: ICurrentChapterProps) {
  const currentChapter = chapters?.find((chapter) => chapter?.id === chapterId)

  if (!currentChapter)
    return (
      <Title title="Capítulo não designado" color="gray" size="2xl" weight="bold" align="center" />
    )

  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center size-[45rem]">
        <PageFlip chapters={[currentChapter]} />
      </div>
    </>
  )
}
