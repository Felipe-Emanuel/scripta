import { BsEye } from 'react-icons/bs'
import { Button, Icon, PageFlip, Text } from '@shared/components'
import { TBookResponse } from '@shared/types'
import { RightArrow } from '@shared/animations/animatedRightArrow'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes'

interface ICurrentChapterProps {
  selectedBook: TBookResponse
  minuature?: boolean
}

export function CurrentChapter({ selectedBook, minuature }: ICurrentChapterProps) {
  const { push } = useRouter()

  if (!selectedBook?.chapters?.[0])
    return (
      <Text size="sm" text="Adicione um capítulo para começar" color="gray" weight="semi-bold" />
    )

  return (
    selectedBook?.chapters && (
      <div className="size-64">
        <PageFlip minuature={minuature} chapters={selectedBook?.chapters} />
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button.root
            radius="full"
            color="primary"
            variant="light"
            onPress={() =>
              push(
                `${APP_ROUTES.private.books.name}/${selectedBook?.id}/${APP_ROUTES.private.chapters.name}/${selectedBook?.chapters?.[0]?.id}?isEditing=false`
              )
            }
            endContent={<Icon icon={BsEye} color="white" />}
          >
            <Button.label size="xs" text="Visualizar" />
          </Button.root>
          <Button.root
            radius="full"
            color="primary"
            variant="light"
            onPress={() =>
              push(
                `${APP_ROUTES.private.books.name}/${selectedBook?.id}/${APP_ROUTES.private.chapters.name}/${selectedBook?.chapters?.[0]?.id}?isEditing=true`
              )
            }
            endContent={<RightArrow />}
          >
            <Button.label size="xs" text="Editar" />
          </Button.root>
        </div>
      </div>
    )
  )
}
