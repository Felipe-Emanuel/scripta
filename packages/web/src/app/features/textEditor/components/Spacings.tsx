import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input
} from '@nextui-org/react'
import { GoChevronDown } from 'react-icons/go'
import { Dispatch, SetStateAction } from 'react'
import { BsTextParagraph } from 'react-icons/bs'
import { MdFormatLineSpacing } from 'react-icons/md'

import { IToolbarEditor } from './ToolbarEditorHeader'
import { TTEditorMenu } from '@shared/types'
import { Icon } from '~/src/app/shared/components'

export interface ISpacings extends IToolbarEditor {
  setMenuState: Dispatch<SetStateAction<TTEditorMenu>>
  menuState: TTEditorMenu
}

export function Spacings({ editor, menuState, setMenuState }: ISpacings) {
  return (
    <ButtonGroup variant="flat" color="secondary">
      <Button>Espaçamentos</Button>
      <Dropdown
        placement="bottom-end"
        classNames={{
          content: 'w-10'
        }}
      >
        <DropdownTrigger>
          <Button isIconOnly>
            <GoChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Opções de espaçamentos"
          selectionMode="none"
        >
          <DropdownItem isReadOnly key="espaços">
            <Input
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9,.]/g, '')
                setMenuState({
                  ...menuState,
                  firstLineIndent: value
                })
                editor.commands.updateAttributes('paragraph', {
                  firstLineIndent: `${value ?? '0'}rem`
                })
              }}
              value={menuState.firstLineIndent}
              type="number"
              label="À esquerda"
              placeholder="0"
              labelPlacement="outside-left"
              size="sm"
              color="primary"
              variant="underlined"
              className="text-black"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    <Icon size="md" icon={BsTextParagraph} />
                  </span>
                </div>
              }
            />
            <Input
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9,.]/g, '')
                setMenuState({
                  ...menuState,
                  lineHeight: value
                })
                editor.commands.updateAttributes('paragraph', {
                  lineHeight: `${value ?? '0'}rem`
                })
              }}
              value={menuState.lineHeight}
              type="number"
              label="Entre linhas"
              placeholder="0"
              labelPlacement="outside-left"
              size="sm"
              color="primary"
              variant="underlined"
              className="text-black"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    <Icon size="md" icon={MdFormatLineSpacing} />
                  </span>
                </div>
              }
            />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}
