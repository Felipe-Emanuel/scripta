'use client'

import { ElementType } from 'react'
import { Card, CardHeader, CardFooter, Button } from '@nextui-org/react'
import NextImage from 'next/image'

import { FaUserSecret } from 'react-icons/fa'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import { HiTrophy } from 'react-icons/hi2'
import { FaBook } from 'react-icons/fa'

import { Icon, Text } from '@shared/components'
import HighlightFallback from '@assets/images/highlight-fallback.png'
import { formatNumber } from '@shared/utils/validation'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'
import { useHighlightController } from '../controller'
import * as tv from '../HighlightTV'

type TRenderInfo = {
  label: string
  icon: ElementType
}

export function HighlightCard() {
  const { selectedBook, choiseBookToSeeInfo } = useBookInformation()
  const { highestHitsBook } = useHighlightController()

  const RenderInfo = ({ icon, label }: TRenderInfo) => (
    <div className="flex items-center gap-2">
      <div className="rounded-lg bg-white p-2 flex items-center justify-center">
        <Icon icon={icon} color="primary" />
      </div>
      <Text weight="bold" text={label} size="sm" />
    </div>
  )

  const cardContent = (
    <>
      <CardHeader className={tv.cardHeaderTV()}>
        <Text
          text="Seu destaque"
          weight="bold"
          color="gray"
          textStyle="uppercase"
          className={tv.cardHeaderTitleTV()}
        />
        <span>
          <Text
            as="small"
            text={`${highestHitsBook.Gender} /`}
            weight="bold"
            size="xxs"
            textStyle="uppercase"
            className={tv.cardHeaderGenderTV()}
          />{' '}
          <Text
            as="small"
            text={highestHitsBook.Theme}
            weight="bold"
            color="gray"
            size="xxs"
            textStyle="uppercase"
            className={tv.cardHeaderThemeTV()}
          />
        </span>
      </CardHeader>
      <NextImage
        fill
        alt="image do livro de destaque"
        className={tv.nextImageTV()}
        src={highestHitsBook.heroPathUrl}
      />
      <CardFooter className={tv.cardFooterTV()}>
        <div className={tv.cardFooterContentWrapperTV()}>
          <Text weight="bold" text={highestHitsBook.title} size="sm" />
          {highestHitsBook.id !== selectedBook?.id && (
            <Button
              onClick={() => choiseBookToSeeInfo(highestHitsBook)}
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
            >
              Detalhes
            </Button>
          )}
        </div>
        <div className={tv.cardFooterContentTV()}>
          <div className={tv.cardFooterContentCardTV()}>
            <RenderInfo
              label={`${formatNumber(highestHitsBook.hits || 0)} Acessos`}
              icon={HiTrophy}
            />
            <RenderInfo
              label={`${formatNumber(highestHitsBook.reaction?.length || 0)} Reações`}
              icon={BsEmojiHeartEyes}
            />
          </div>
          <div className={tv.cardFooterContentCardTV()}>
            <RenderInfo
              label={`${formatNumber(highestHitsBook.totalWords || 0)} Palavras`}
              icon={FaBook}
            />
            <RenderInfo
              label={`${formatNumber(highestHitsBook.characters?.length || 0)} Personagens`}
              icon={FaUserSecret}
            />
          </div>
        </div>
      </CardFooter>
    </>
  )

  const cardContentFallback = (
    <>
      <NextImage
        alt="destaque fallback"
        src={HighlightFallback}
        width={1000}
        height={765}
        className={tv.highlightFallbackImageTV()}
      />
      <CardHeader className={tv.cardHeaderWrapperTV()}>
        <Text
          text="Seu destaque aparecerá aqui"
          weight="bold"
          color="gray"
          textStyle="uppercase"
          className="text-tiny"
        />
      </CardHeader>
      <CardFooter className={tv.cardFooterWrapperTV()}>
        <div>
          <Text as="b" weight="semi-bold" text="Adicione um livro para começar" />
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Adicionar
        </Button>
      </CardFooter>
    </>
  )

  return (
    <Card isFooterBlurred className={tv.cardWrapperTV()}>
      {highestHitsBook.id ? cardContent : cardContentFallback}
    </Card>
  )
}
