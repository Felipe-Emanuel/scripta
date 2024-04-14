'use client'

import { Image } from '@nextui-org/react'

import { FaUserSecret } from 'react-icons/fa'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import { HiTrophy } from 'react-icons/hi2'
import { FaBook } from 'react-icons/fa'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useMenuController } from '@features/menu/controller'
import { useBookInformationController } from '../controller'
import RenderInfo from './components/RenderInfo'

export function BookInformationCardInfo() {
  const { clearing } = useMenuController()
  const { selectedBook } = useBookInformation()
  const { isCharactersCardHovered, setIsCharactersCardHovered } = useBookInformationController()

  const characterIcon = isCharactersCardHovered ? FaExternalLinkSquareAlt : FaUserSecret

  if (!selectedBook) return null

  const hero = (
    <Image
      alt="Album cover"
      className="object-cover w-full h-40"
      height={200}
      shadow="md"
      src={selectedBook?.heroPathUrl}
      width={130}
    />
  )

  return (
    <div className="dark:bg-transparent">
      <div className="flex max-[1023px]:flex-col flex-row max-[1023px]:flex-wrap gap-2 items-center justify-center md:justify-start">
        <div className="relative w-full h-40">
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
                clearing={clearing}
                setIsCharactersCardHovered={setIsCharactersCardHovered}
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
