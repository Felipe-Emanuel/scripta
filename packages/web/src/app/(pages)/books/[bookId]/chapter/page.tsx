import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { Text } from '~/src/app/shared/components'
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes'

interface IChapterPage {
  params: {
    bookId: string
  }
}

export default function ChapterPage({ params }: IChapterPage) {
  return (
    <div className="flex items-center justify-center flex-col">
      <Text text={`Visualizando capítulos do livro ${params.bookId}`} align="center" />
      <Button>
        <Text
          text={
            <Link
              href={`${APP_ROUTES.private.books.name}/${params.bookId}/chapter/idDoCapítuloParaEditar`}
            >
              Selecionar este capítulo
            </Link>
          }
        />
      </Button>
    </div>
  )
}
