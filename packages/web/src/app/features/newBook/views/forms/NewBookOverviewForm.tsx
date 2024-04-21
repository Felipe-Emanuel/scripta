import { FaBook } from 'react-icons/fa'
import { Button, Chip, Image, ScrollShadow, Tooltip } from '@nextui-org/react'

import { isLink } from '@memorize/server/src/shared/utils/stringValidations'

import { TCreateBookSchemaWithImage } from '@features/newBook/controller'
import { useDraft } from '@shared/hooks/useDraft'
import { formatNumber } from '@shared/utils/validation'
import { capitalizeName } from '@shared/utils/transformers'
import { Icon, Text, Title } from '@shared/components'
import * as tv from './NewBookFormsTV'

export function NewBookOverviewForm() {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')

  const isUrl = isLink(draft?.publishedUrl ?? '')

  const ellipsis = draft?.title.length > 35 ? '...' : ''

  const bookTitle = `${capitalizeName(draft?.title).substring(0, 35)}${ellipsis}`

  return (
    <div className={tv.newBookOverviewFormTV()}>
      <div className={tv.newBookOverviewFormHeroSideTV()}>
        {draft?.heroPathUrl ? (
          <Image
            data-testid="new-book-overview-form-hero"
            removeWrapper
            alt="Imagem escolhida para capa do livro"
            src={draft?.heroPathUrl}
            className={tv.newBookOverviewFormHeroTV()}
          />
        ) : (
          <div className={tv.newBookOverviewFormHeroFallbackTV()} />
        )}
        <div className={tv.newBookOverviewFormHeroSideInfoTV()}>
          {draft?.title.length > 35 ? (
            <Tooltip showArrow content={capitalizeName(draft?.title)}>
              <div>
                <Text text={bookTitle.length ? bookTitle : 'Seu título'} size="md" />
              </div>
            </Tooltip>
          ) : (
            <div>
              <Text text={bookTitle.length ? bookTitle : 'Seu título'} size="md" />
            </div>
          )}
          <span>
            <Text
              textStyle="uppercase"
              as="small"
              size="xs"
              text={`${capitalizeName(draft?.gender || 'Gênero')} /`}
              color="green-500"
              weight="bold"
            />{' '}
            <Text
              textStyle="uppercase"
              as="small"
              size="xs"
              text={capitalizeName(draft?.theme || 'Tema')}
              color="gray"
              weight="bold"
            />
          </span>
          <div className={tv.newBookOverviewFormHeroSideChipsTV()}>
            {draft?.conclued && (
              <Chip size="sm" color="secondary" variant="bordered">
                <Text text="Concluído" className={tv.newBookOverviewFormHeroSideChipsTextTV()} />
              </Chip>
            )}
            <Chip size="sm" color="secondary" variant="bordered">
              <Text
                text={draft?.isActive ? 'Público' : 'Oculto'}
                className={tv.newBookOverviewFormHeroSideChipsTextTV()}
              />
            </Chip>
          </div>
          <div className={tv.newBookOverviewFormHeroSideTotalWordsTV()}>
            <Tooltip showArrow content={draft?.totalWords}>
              <div className={tv.newBookOverviewFormHeroSideIconWrapperTV()}>
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
              className={tv.newBookOverviewFormHeroSideButtonFallbackTV()}
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

      <div className={tv.newBookOverviewFormDescriptionSideTV()}>
        <Title as="h2" size="md" title="Descrição" />
        <ScrollShadow hideScrollBar className={tv.newBookOverviewFormDescriptionSideContentTV()}>
          <Text
            data-testid="new-book-overview-form-description"
            text={
              draft?.description ||
              'Adicione uma descrição com até 1000 palavras que resuma bem o seu livro. Seja criativo e direto!'
            }
            color="gray"
            size="sm"
          />
        </ScrollShadow>
      </div>
    </div>
  )
}
