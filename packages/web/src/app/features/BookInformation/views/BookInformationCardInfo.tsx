'use client'

import { FaUserSecret } from 'react-icons/fa'
import { FaExternalLinkSquareAlt } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

import { useBook } from '@shared/hooks/contexts/useBook'
import { Text } from '@shared/components'
import { useBookController } from '../controller'
import { CurrentChapter } from './components/CurrentChapter'
import { animationVariants } from '../BookInformationUtils'
import { Details } from './components/Details'
import { Tab, Tabs } from "@heroui/react"

export function BookInformationCardInfo() {
  const { selectedBook } = useBook()
  const {
    isCharactersCardHovered,
    activeTab,
    isMovingRight,
    setIsCharactersCardHovered,
    changeTab
  } = useBookController()

  const characterIcon = isCharactersCardHovered ? FaExternalLinkSquareAlt : FaUserSecret

  if (!selectedBook)
    return <Text text="Selecione algum livro para visualizar" align="center" className="w-full" />

  const tableToBeRendered = {
    0: (
      <Details
        characterIcon={characterIcon}
        isCharactersCardHovered={isCharactersCardHovered}
        selectedBook={selectedBook}
        setIsCharactersCardHovered={setIsCharactersCardHovered}
      />
    ),
    1: <CurrentChapter minuature selectedBook={selectedBook} />
  }

  const tableIndex = activeTab as keyof typeof tableToBeRendered

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        data-testid="book-information-tablist"
        variant="light"
        color="primary"
        aria-label="book-information-filters-tabs"
        className="scrollbar-thin"
        onSelectionChange={(key) => changeTab(+key)}
      >
        <Tab key="0" title={<Text text="Detalhes" color="white" weight="light" size="md" />} />
        <Tab key="1" title={<Text text="Capítulo" color="white" weight="light" size="md" />} />
      </Tabs>
      <AnimatePresence mode="wait">
        <motion.div
          key={tableIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={isMovingRight}
          variants={animationVariants}
          transition={{ duration: 0.3, ease: 'anticipate' }}
        >
          {tableToBeRendered[tableIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
