'use client'

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
import { useBook } from '@shared/hooks/contexts/useBook'
import { DeleteModal } from './modals/DeleteModal'
import { EditModal } from './modals/EditModal'
import { DesactiveModal } from './modals/DesactiveModal'
import { IconContent } from './components/IconContent'
import { useBookController } from '../controller'

import * as tv from '../BookInformationTV'

export function BookInformationActions() {
  const {
    action,
    toggleDeleting,
    toggleDesactiving,
    toggleEditing,
    handlePatchActiveOrConcluedBook,
    handleDeleteBook
  } = useBookController()
  const { selectedBook } = useBook()

  if (!selectedBook) return null

  const markAsConcluedIcon = selectedBook?.conclued ? IoIosRemoveCircle : IoMdDoneAll
  const markAsConcluedText = selectedBook?.conclued
    ? 'Remover dos concluídos'
    : 'Marcar como concluído'

  return (
    <div className={tv.infoActionsWrapperTV()}>
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
      <Dropdown showArrow className={tv.infoActionsDropdownTV()}>
        <DropdownTrigger>
          <Button color="secondary" isIconOnly variant="light">
            <Icon icon={CiMenuKebab} color="white" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown com ações do livro selecionado">
          <DropdownSection title="Ações">
            <DropdownItem
              data-testid="dorpdown-item-book-information-action-conclud"
              onClick={() => handlePatchActiveOrConcluedBook('conclued')}
              textValue="Concluído"
              key="conclued"
              startContent={<IconContent icon={markAsConcluedIcon} />}
            >
              <Text weight="semi-bold" text={markAsConcluedText} />
            </DropdownItem>
            <DropdownItem
              data-testid="dorpdown-item-book-information-action-edit"
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
              data-testid="dorpdown-item-book-information-action-desactive"
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
              data-testid="dorpdown-item-book-information-action-delete"
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
