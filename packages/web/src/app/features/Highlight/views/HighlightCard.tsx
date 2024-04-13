'use client'

import { FaUserSecret } from 'react-icons/fa'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import { HiTrophy } from 'react-icons/hi2'
import { FaBook } from 'react-icons/fa'

import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react'
import NextImage from 'next/image'

import { useHighlightController } from '../controller'
import { Parallax } from '@shared/components/Parallax'
import { Icon, Text } from '@shared/components'
import HighlightFallback from '@assets/images/highlight-fallback.png'
import { formatNumber } from '@shared/utils/validation'
import { ElementType } from 'react'

type TRenderInfo = {
  label: string
  icon: ElementType
}

export function HighlightCard() {
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
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <Text
          text="Seu destaque"
          weight="bold"
          color="gray"
          textStyle="uppercase"
          className="text-tiny pointer-events-none"
        />
        <span>
          <Text
            as="small"
            text={`${highestHitsBook.Gender} /`}
            weight="bold"
            size="xxs"
            textStyle="uppercase"
            className="text-tiny pointer-events-none text-green-500/75"
          />{' '}
          <Text
            as="small"
            text={highestHitsBook.Theme}
            weight="bold"
            color="gray"
            size="xxs"
            textStyle="uppercase"
            className="text-tiny pointer-events-none"
          />
        </span>
      </CardHeader>
      <Parallax className="absolute w-[410px] min-h-full bg-white/25 -top-4 -left-5">
        <Image
          removeWrapper
          width={410}
          alt="Card example background"
          className="z-0 object-cover"
          src={highestHitsBook.heroPathUrl}
        />
      </Parallax>
      <CardFooter className="absolute flex flex-col gap-1 bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10">
        <div className="w-full flex items-center justify-between">
          <Text weight="bold" text={highestHitsBook.title} size="sm" />
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Detalhes
          </Button>
        </div>
        <div className="flex items-center justify-between gap-1 flex-wrap md:flex-nowrap w-full">
          <div className="flex flex-col gap-1">
            <RenderInfo
              label={`${formatNumber(highestHitsBook.hits || 0)} Acessos`}
              icon={HiTrophy}
            />
            <RenderInfo
              label={`${formatNumber(highestHitsBook.reaction?.length || 0)} Reações`}
              icon={BsEmojiHeartEyes}
            />
          </div>
          <div className="flex flex-col gap-1">
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
        className="bg-cover absolute inset-0 z-0"
      />
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <Text
          text="Seu destaque aparecerá aqui"
          weight="bold"
          color="gray"
          textStyle="uppercase"
          className="text-tiny"
        />
      </CardHeader>
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
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
    <Card isFooterBlurred className="w-full max-w-[300px] h-[400px] overflow-hidden">
      {highestHitsBook.id ? cardContent : cardContentFallback}
    </Card>
  )
}
