'use client'

import React, { ElementType } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection
} from '@nextui-org/react'

import { IoMdDoneAll } from 'react-icons/io'
import { IoIosRemoveCircle } from 'react-icons/io'
import { MdEditSquare } from 'react-icons/md'
import { FaTrashCan } from 'react-icons/fa6'
import { CiMenuKebab } from 'react-icons/ci'

import { Icon, Text } from '@shared/components'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'
import { useBookInformationController } from '../controller'
import { DeleteModal } from './modals/DeleteModal'

interface IconContentProps {
  icon: ElementType
  color?: 'primary' | 'danger'
}

export function BookInformationActions() {
  const { action, toggleDeleting } = useBookInformationController()
  const { selectedBook } = useBookInformation()

  if (!selectedBook) return null

  const markAsConcluedIcon = selectedBook?.conclued ? IoIosRemoveCircle : IoMdDoneAll
  const markAsConcluedText = selectedBook?.conclued
    ? 'Remover dos concluídos'
    : 'Marcar como concluído'

  const IconContent = ({ icon, color = 'primary' }: IconContentProps) => (
    <div className="bg-white p-2 rounded-xl flex items-center justify-center">
      <Icon icon={icon} color={color} />
    </div>
  )

  return (
    <div className="absolute top-3 right-4">
      <DeleteModal
        isDeleting={action.isDeleting}
        bookTitle={selectedBook?.title}
        toggleDeleting={toggleDeleting}
      />
      <Dropdown showArrow className="bg-white/10 backdrop-blur-md ring-1 ring-white/50">
        <DropdownTrigger>
          <Button color="secondary" isIconOnly variant="light">
            <Icon icon={CiMenuKebab} color="white" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown com ações do livro selecionado">
          <DropdownSection title="Ações">
            <DropdownItem
              textValue="Concluído"
              key="conclued"
              startContent={<IconContent icon={markAsConcluedIcon} />}
            >
              <Text weight="semi-bold" text={markAsConcluedText} />
            </DropdownItem>
            <DropdownItem
              textValue="Editar"
              key="edit"
              startContent={<IconContent icon={MdEditSquare} />}
            >
              <Text weight="semi-bold" text="Editar" />
            </DropdownItem>
          </DropdownSection>

          <DropdownSection title="Zona de perigo">
            <DropdownItem
              textValue="Excluir"
              onClick={toggleDeleting}
              key="trash"
              startContent={<IconContent icon={FaTrashCan} color="danger" />}
            >
              <Text weight="semi-bold" text="Excluir" color="error" />
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
