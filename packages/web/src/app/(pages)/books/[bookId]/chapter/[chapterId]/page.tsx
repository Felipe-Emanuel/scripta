'use client'

import { useRouter } from 'next/navigation'
import { Text } from '~/src/app/shared/components'

interface IChapterIdPage {
  params: {
    chapterId: string
  }
}

export default function ChapterIdPage({ params }: IChapterIdPage) {
  const { back } = useRouter()

  if (!params.chapterId) return back()

  return <Text text={params.chapterId} align="center" />
}
