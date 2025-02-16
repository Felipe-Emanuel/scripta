import { Image } from "@heroui/react"

import { BsEmojiHeartEyes } from 'react-icons/bs'
import { HiTrophy } from 'react-icons/hi2'
import { FaBook } from 'react-icons/fa'

import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useMenuController } from '@features/menu/controller'
import RenderInfo from '../components/RenderInfo'
import * as tv from '../../BookInformationTV'
import { TBookResponse } from '~/src/app/shared/types'
import { Dispatch, SetStateAction } from 'react'
import { IconType } from 'react-icons/lib'

interface IDetailsProps {
  selectedBook: TBookResponse
  characterIcon: IconType
  isCharactersCardHovered: boolean
  setIsCharactersCardHovered: Dispatch<SetStateAction<boolean>>
}

export function Details({
  selectedBook,
  isCharactersCardHovered,
  characterIcon,
  setIsCharactersCardHovered
}: IDetailsProps) {
  const { clearing } = useMenuController()

  const hero = (
    <Image
      alt="imagem do livro"
      className={tv.heroTV()}
      shadow="md"
      src={selectedBook?.heroPathUrl}
      width={130}
    />
  )

  return (
    <div className={tv.cardInfoWrapperTV()}>
      <div className={tv.publishedHeroWrapperTV()}>
        {selectedBook?.publishedUrl ? (
          <a
            data-testid="book-information-card-info-published-link"
            target="_blank"
            href={selectedBook?.publishedUrl}
            rel="noreferrer"
          >
            {hero}
          </a>
        ) : (
          hero
        )}
      </div>

      <div className={tv.renderInfoWrapperTV()}>
        <div className={tv.characterSideWrapperTV()}>
          <div className={tv.characterSideContentTV()}>
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
        <div className={tv.hitsSideWrapperTV()}>
          <RenderInfo icon={HiTrophy} label="Acessos" qtd={selectedBook?.hits} />
          <RenderInfo icon={FaBook} label="Palavras" qtd={selectedBook?.totalWords} />
        </div>
      </div>
    </div>
  )
}
