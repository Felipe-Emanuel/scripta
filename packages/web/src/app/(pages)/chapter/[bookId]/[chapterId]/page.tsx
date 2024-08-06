import { Text } from '@shared/components'
import { TextEditor } from '@features/textEditor/views/TextEditor'

interface IChapter {
  params: {
    chapterId: string
  }
}

export default function EditChapter({ params }: IChapter) {
  return (
    <>
      <Text text={`EDITANDO capítulo do livro ${params.chapterId}`} />
      <TextEditor />
    </>
  )
}
