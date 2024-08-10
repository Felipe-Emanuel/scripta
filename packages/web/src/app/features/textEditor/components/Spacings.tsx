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
import { BsTextParagraph } from 'react-icons/bs'
import { MdFormatLineSpacing } from 'react-icons/md'

import { IToolbarEditor } from './ToolbarEditorHeader'

import { Icon } from '@shared/components'
import * as tv from './TextEditorComponentsTV'

export function Spacings({ editor, menuState, setMenuState }: IToolbarEditor) {
  const handleChange = (attribute: string, updateState: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9,.]/g, '')
    updateState(value)
    editor.commands.updateAttributes('paragraph', {
      [attribute]: `${value ?? '0'}rem`
    })
  }

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
        <DropdownMenu aria-label="Opções de espaçamentos" selectionMode="none">
          <DropdownItem textValue="espaços" isReadOnly key="espaços">
            <Input
              onChange={handleChange('firstLineIndent', value => setMenuState?.({
                ...menuState!,
                firstLineIndent: value
              }))}
              value={menuState?.firstLineIndent}
              type="number"
              label="À esquerda"
              placeholder="2"
              labelPlacement="outside-left"
              size="sm"
              color="primary"
              variant="underlined"
              endContent={
                <div className={tv.spacingsIconWrapperTV()}>
                  <span className={tv.spacingsIconSpanTV()}>
                    <Icon size="md" icon={BsTextParagraph} />
                  </span>
                </div>
              }
            />
          </DropdownItem>
          <DropdownItem textValue="largura" isReadOnly key="largura">
            <Input
              onChange={handleChange('lineHeight', value => setMenuState?.({
                ...menuState!,
                lineHeight: value
              }))}
              value={menuState?.lineHeight}
              type="number"
              label="Entre linhas"
              placeholder="0"
              labelPlacement="outside-left"
              size="sm"
              color="primary"
              variant="underlined"
              endContent={
                <div className={tv.spacingsIconWrapperTV()}>
                  <span className={tv.spacingsIconSpanTV()}>
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
