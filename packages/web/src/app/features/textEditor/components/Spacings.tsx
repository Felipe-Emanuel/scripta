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
import { TTEditorMenu } from '@shared/types'
import * as tv from './TextEditorComponentsTV'
import { useCallback } from 'react'

type TSpacingsAttributes = 'firstLineIndent' | 'lineHeight'

export function Spacings({ editor, menuState, updateMenuState }: IToolbarEditor) {
  const handleChange = useCallback(
    (attribute: TSpacingsAttributes, value: string) => {
      const newConfig: TTEditorMenu = {
        ...menuState!,
        [attribute]: value
      }

      updateMenuState?.(newConfig)

      console.log('newConfig ENVIADA: ', newConfig)

      return editor.commands.updateAttributes('paragraph', {
        [attribute]: `${value}rem`
      })
    },
    [editor.commands, menuState, updateMenuState]
  )

  if (!menuState) return null

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
              onValueChange={(e) => handleChange('firstLineIndent', e)}
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
              onValueChange={(e) => handleChange('lineHeight', e)}
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
