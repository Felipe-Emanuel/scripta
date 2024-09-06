import { Editor } from '@features/textEditor'

interface INewChapterEditor {
  bookId: string
}

export function NewChapterEditor({ bookId }: INewChapterEditor) {
  return (
    <Editor.root>
      <Editor.text bookId={bookId} />
    </Editor.root>
  )
}
