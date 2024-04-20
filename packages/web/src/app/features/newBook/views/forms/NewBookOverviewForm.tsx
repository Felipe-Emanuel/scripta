import { TCreateBookSchemaWithImage } from '@features/newBook/controller'
import { Button, Chip, Image, ScrollShadow } from '@nextui-org/react'
import { Icon, Text, Title } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import { capitalizeName } from '@shared/utils/transformers'
import { FaBook } from 'react-icons/fa'

import { isLink } from '@memorize/server/src/shared/utils/stringValidations'
import { formatNumber } from '@shared/utils/validation'

export function NewBookOverviewForm() {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')

  const isUrl = isLink(draft?.publishedUrl ?? '')

  return (
    <div className="flex gap-6">
      <div className="flex gap-2">
        <Image
          removeWrapper
          alt="Imagem escolhida para capa do livro"
          src={draft?.heroPathUrl}
          className="h-52"
        />
        <div className="flex flex-col gap-4">
          <Title title={capitalizeName(draft?.title)} />
          <span>
            <Text
              textStyle="uppercase"
              as="small"
              text={`${capitalizeName(draft?.gender)} /`}
              color="green-500"
              weight="bold"
            />{' '}
            <Text
              textStyle="uppercase"
              as="small"
              text={capitalizeName(draft?.theme)}
              color="gray"
              weight="bold"
            />
          </span>
          <div className="flex gap-2">
            {draft?.conclued && (
              <Chip size="sm" color="secondary" variant="bordered">
                Concluído
              </Chip>
            )}
            <Chip size="sm" color="secondary" variant="bordered">
              {draft?.isActive ? 'Público' : 'Oculto'}
            </Chip>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2 flex items-center justify-center">
              <Icon icon={FaBook} color="white" size="md" />
            </div>
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
