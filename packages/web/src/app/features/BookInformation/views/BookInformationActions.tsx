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
import { BiPowerOff } from 'react-icons/bi'

import { Icon, Text } from '@shared/components'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'
import { useBookInformationController } from '../controller'
import { DeleteModal } from './modals/DeleteModal'
import { DesactiveModal } from './modals/DesactiveModal'
import { EditModal } from './modals/EditModal'

interface IconContentProps {
  icon: ElementType
  color?: 'primary' | 'danger' | 'warning' | 'secondary'
}

export function BookInformationActions() {
  const {
    action,
    toggleDeleting,
    toggleDesactiving,
    toggleEditing,
    handlePatchActiveOrConcluedBook,
    handleDeleteBook
  } = useBookInformationController()
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
      <EditModal toggleEditing={toggleEditing} book={selectedBook} isEditing={action.isEditing} />
      <DeleteModal
        handleDeleteBook={handleDeleteBook}
        isDeleting={action.isDeleting}
        book={selectedBook}
        toggleDeleting={toggleDeleting}
      />
      <DesactiveModal
        handleDesactiveBook={handlePatchActiveOrConcluedBook}
        isDesactiving={action.isDesactiving}
        book={selectedBook}
        toggleDesactiving={toggleDesactiving}
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
              onClick={() => handlePatchActiveOrConcluedBook('conclued')}
              textValue="Concluído"
              key="conclued"
              startContent={<IconContent icon={markAsConcluedIcon} />}
            >
              <Text weight="semi-bold" text={markAsConcluedText} />
            </DropdownItem>
            <DropdownItem
              onClick={toggleEditing}
              textValue="Editar"
              key="edit"
              startContent={<IconContent icon={MdEditSquare} />}
            >
              <Text weight="semi-bold" text="Editar" />
            </DropdownItem>
          </DropdownSection>

          <DropdownSection title="Zona de perigo">
            <DropdownItem
              textValue="Desativar"
              onClick={toggleDesactiving}
              key="desactiving"
              startContent={
                <IconContent
                  icon={BiPowerOff}
                  color={selectedBook?.isActive ? 'warning' : 'secondary'}
                />
              }
            >
              <Text
                weight="semi-bold"
                text={selectedBook?.isActive ? 'Ocultar' : 'Tornar público'}
                color={selectedBook?.isActive ? 'warning' : 'green-500'}
              />
            </DropdownItem>

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
