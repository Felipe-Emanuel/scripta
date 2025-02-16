'use client'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react"
import {
  TToggleConfirmModal,
  useChapterOptionsController
} from '../controllers/useChapterOptionsController'
import { Icon, Text } from '~/src/app/shared/components'
import { SlOptionsVertical } from 'react-icons/sl'
import { ConfirmModal } from './components/ConfirmModal'
import { TChapterResponse } from '~/src/app/shared/types'
import { infoActionsDropdownTV } from '../../BookInformation/BookInformationTV'

interface IChapterOptionsProps {
  chapter: TChapterResponse
}

export function ChapterOptions({ chapter }: IChapterOptionsProps) {
  const {
    where,
    confirmOpen,
    concluedChapterData,
    mutateConclued,
    mutateDelete,
    toggleConfirmModal
  } = useChapterOptionsController()

  const conclued = chapter?.isConclued || concluedChapterData?.isConclued
  const concluedText = conclued ? 'Desmarcar como concluído' : 'Marcar como concluído'

  return (
    <div className="w-full flex justify-end">
      <ConfirmModal
        concluedText={concluedText}
        callback={where === 'conclued' ? mutateConclued : mutateDelete}
        subtitle={where === 'conclued' ? 'Marcar como concluído?' : 'Deletar capítulo?'}
        explication={
          where === 'conclued'
            ? 'Marcar o capítulo como concluído o tornará público para todos os seus leitores.'
            : 'Você realmente deseja deletar o capítulo? Esta ação é irreversível.'
        }
        isOpen={!!confirmOpen}
        toggleConfirmModal={toggleConfirmModal}
        where={where}
      />

      <Dropdown className={infoActionsDropdownTV()}>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="faded">
            <Icon icon={SlOptionsVertical} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="ações de opções do capítulo"
          onAction={(key) => toggleConfirmModal(key as TToggleConfirmModal)}
        >
          <DropdownItem key="conclued">
            <Text color="white" text={concluedText} size="md" />
            <Text
              color="gray"
              text="Apenas capítulos concluídos serão exibidos para os leitores"
              size="sm"
            />
          </DropdownItem>
          <DropdownItem key="delete" color="danger">
            <Text color="white" text="Deletar Capítulo" size="md" />
            <Text color="gray" text="Deseja realmente deletar este capítulo?" size="sm" />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
