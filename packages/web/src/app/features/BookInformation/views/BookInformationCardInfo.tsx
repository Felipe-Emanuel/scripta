'use client'

import { Image, Tooltip } from '@nextui-org/react'
import { Icon, Template, Text } from '@shared/components'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'

import { FaUserSecret } from 'react-icons/fa'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import { HiTrophy } from 'react-icons/hi2'
import { FaBook } from 'react-icons/fa'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import { formatNumber } from '@shared/utils/validation'
import { ElementType } from 'react'
import Link from 'next/link'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useBookInformationController } from '../controller'

type TRenderInfo = {
  icon: ElementType
  label: string
  qtd: number
  path?: string
  animation?: string
}

export function BookInformationCardInfo() {
  const { selectedBook } = useBookInformation()
  const { isCharactersCardHovered, setIsCharactersCardHovered } = useBookInformationController()

  const characterIcon = isCharactersCardHovered ? FaExternalLinkSquareAlt : FaUserSecret

  if (!selectedBook) return null

  const RenderInfo = ({ icon, label, qtd, path, animation }: TRenderInfo) => {
    const content = (
      <Template
        flex-direction="row"
        className="flex items-center justify-between p-0 md:p-0 lg:p-4 lg:w-40"
      >
        <div className="hidden lg:flex flex-col">
          <Text text={label} size="xs" color="gray" />
          <Text text={`${formatNumber(qtd ?? 0)}`} as="small" size="lg" />
        </div>
        <Tooltip showArrow content={`${formatNumber(qtd ?? 0)} ${label}`}>
          <div className="rounded-lg bg-primary p-2 flex items-center justify-center">
            <Icon className={animation} icon={icon} color="white" size="md" />
          </div>
        </Tooltip>
      </Template>
    )

    return (
      <>
        {path ? (
          <Link
            onMouseEnter={() => setIsCharactersCardHovered(true)}
            onMouseLeave={() => setIsCharactersCardHovered(false)}
            href={path}
          >
            {content}
          </Link>
        ) : (
          content
        )}
      </>
    )
  }

  const hero = (
    <Image
      alt="Album cover"
      className="object-cover"
      height={200}
      shadow="md"
      src={selectedBook?.heroPathUrl}
      width={130}
    />
  )

  return (
    <div className="dark:bg-transparent">
      <div className="flex max-[1023px]:flex-col flex-row max-[1023px]:flex-wrap gap-2 md:gap-4 items-center justify-center md:justify-start">
        <div className="relative col-span-6 md:col-span-4">
          {selectedBook?.publishedUrl ? (
            <a target="_blank" href={selectedBook?.publishedUrl}>
              {hero}
            </a>
          ) : (
            hero
          )}
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-4 max-[1023px]:flex-wrap">
          <div className="flex lg:flex-col gap-2 md:gap-4">
            <div className="relative size-full">
              <div className="absolute inset-0 animate-border-animation rounded-2xl bg-tertiary" />
              <RenderInfo
                path={`${APP_ROUTES.private.characters.name}/${selectedBook?.id}`}
                animation={
                  isCharactersCardHovered ? 'animate-appearance-in' : 'animate-appearance-in'
                }
                icon={characterIcon}
                label="Personagens"
                qtd={selectedBook?.characters?.length}
              />
            </div>
            <RenderInfo
              icon={BsEmojiHeartEyes}
              label="Reações"
              qtd={selectedBook?.reaction?.length}
            />
          </div>
          <div className="flex lg:flex-col gap-2 md:gap-4">
            <RenderInfo icon={HiTrophy} label="Acessos" qtd={selectedBook?.hits} />
            <RenderInfo icon={FaBook} label="Palavras" qtd={selectedBook?.totalWords} />
          </div>
        </div>
      </div>
    </div>
  )
}
