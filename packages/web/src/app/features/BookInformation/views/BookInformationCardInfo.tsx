'use client'

import { Image } from '@nextui-org/react'

import { FaUserSecret } from 'react-icons/fa'
import { BsEmojiHeartEyes } from 'react-icons/bs'
import { HiTrophy } from 'react-icons/hi2'
import { FaBook } from 'react-icons/fa'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'

import { useBook } from '@shared/hooks/contexts/useBook'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useMenuController } from '@features/menu/controller'
import { useBookController } from '../controller'
import RenderInfo from './components/RenderInfo'
import * as tv from '../BookInformationTV'

export function BookInformationCardInfo() {
  const { clearing } = useMenuController()
  const { selectedBook } = useBook()
  const { isCharactersCardHovered, setIsCharactersCardHovered } = useBookController()

  const characterIcon = isCharactersCardHovered ? FaExternalLinkSquareAlt : FaUserSecret

  if (!selectedBook) return null

  const hero = (
    <Image
      alt="imagem do livro"
      className={tv.heroTV()}
      height={200}
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
