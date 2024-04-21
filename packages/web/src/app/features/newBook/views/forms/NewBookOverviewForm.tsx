import { TCreateBookSchemaWithImage } from '@features/newBook/controller'
import { Button, Chip, Image, ScrollShadow, Tooltip } from '@nextui-org/react'
import { Icon, Text, Title } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import { capitalizeName } from '@shared/utils/transformers'
import { FaBook } from 'react-icons/fa'

import { isLink } from '@memorize/server/src/shared/utils/stringValidations'
import { formatNumber } from '@shared/utils/validation'

export function NewBookOverviewForm() {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')

  const isUrl = isLink(draft?.publishedUrl ?? '')

  const ellipsis = draft?.title.length > 35 ? '...' : ''

  const bookTitle = `${capitalizeName(draft?.title).substring(0, 35)}${ellipsis}`

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-4 md:gap-6">
      <div className="flex gap-2 w-full">
        <Image
          removeWrapper
          alt="Imagem escolhida para capa do livro"
          src={draft?.heroPathUrl}
          className="h-40 sm:h-52 w-32 sm:w-40"
        />
        <div className="flex flex-col justify-between py-1">
          <Tooltip showArrow content={capitalizeName(draft?.title)}>
            <div>
              <Text text={bookTitle} size="md" />
            </div>
          </Tooltip>
          <span>
            <Text
              textStyle="uppercase"
              as="small"
              size="xs"
              text={`${capitalizeName(draft?.gender)} /`}
              color="green-500"
              weight="bold"
            />{' '}
            <Text
              textStyle="uppercase"
              as="small"
              size="xs"
              text={capitalizeName(draft?.theme)}
              color="gray"
              weight="bold"
            />
          </span>
          <div className="flex gap-2">
            {draft?.conclued && (
              <Chip size="sm" color="secondary" variant="bordered">
                <Text text="Concluído" className="text-[8px]" />
              </Chip>
            )}
            <Chip size="sm" color="secondary" variant="bordered">
              <Text text={draft?.isActive ? 'Público' : 'Oculto'} className="text-[8px]" />
            </Chip>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip showArrow content={draft?.totalWords}>
              <div className="rounded-lg bg-primary sm:p-2 flex items-center justify-center">
                <Icon icon={FaBook} color="white" size="md" />
              </div>
            </Tooltip>
            <Text text={`${formatNumber(draft?.totalWords) ?? 0} Palavras`} />
          </div>
          {draft?.publishedUrl && isUrl ? (
            <a href={draft?.publishedUrl} target="_blank">
              <Button color="primary" variant="solid" size="sm" fullWidth>
                Acessar
              </Button>
            </a>
          ) : (
            <Button
              disabled
              className="pointer-events-none opacity-50"
              color="secondary"
              variant="bordered"
              size="sm"
              fullWidth
            >
              Insira uma URL
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Title as="h2" size="md" title="Descrição" />
        <ScrollShadow hideScrollBar className="w-full max-w-96 h-44">
          <Text text={draft?.description} color="gray" size="sm" />
        </ScrollShadow>
      </div>
    </div>
  )
}
