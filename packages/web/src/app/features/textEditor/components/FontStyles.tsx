import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  ButtonGroup,
  Input,
  Select,
  SelectItem,
  Tooltip
} from '@nextui-org/react'
import { Separator } from '@radix-ui/react-toolbar'

import { GoChevronDown } from 'react-icons/go'
import { FaFont } from 'react-icons/fa6'
import { RiFontSize } from 'react-icons/ri'
import { BiChevronRight } from 'react-icons/bi'

import { Icon } from '@shared/components'
import { defaultFonts } from '../TextEditorUtils'
import { useEditorController } from '../controller'
import { IToolbarEditor } from './ToolbarEditorHeader'
import * as tv from './TextEditorComponentsTV'

export function FontStyles({ editor }: IToolbarEditor) {
  const { textValue, value, menuState, updateMenuState, setValue, selectWeight } =
    useEditorController()

  return (
    <ButtonGroup variant="flat" color="secondary">
      <Button>Fonte</Button>
      <Popover placement="bottom-end" offset={20}>
        <PopoverTrigger>
          <Button isIconOnly>
            <GoChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={tv.fontStylesWrapperTV()}>
            <Input
              aria-label="Tamanho da fonte"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9,.]/g, '')
                updateMenuState({
                  ...menuState,
                  fontSize: value
                })
                editor.commands.updateAttributes('paragraph', {
                  fontSize: `${value ?? '0'}px`
                })
              }}
              type="number"
              placeholder="16"
              size="sm"
              color="primary"
              variant="underlined"
              className="text-black flex flex-1"
              endContent={
                <div className={tv.fontStylesIconTV()}>
                  <Icon size="md" icon={RiFontSize} />
                </div>
              }
            />

            <Separator className={tv.fontStylesSeparatorTV()} />

            <Select
              aria-label="Escolha de fontes"
              placeholder="Inter"
              defaultSelectedKeys={['cat']}
              variant="underlined"
              onClick={(e) => e.stopPropagation()}
              onSelectionChange={(key) => {
                setValue(key)
                const selectedFont = Array.from(key)[0]
                editor.commands.setFontFamily(String(selectedFont))
              }}
              selectedKeys={value}
              className={tv.fontStylesSelectTV()}
              scrollShadowProps={{
                isEnabled: false
              }}
              endContent={
                <div className={tv.fontStylesIconTV()}>
                  <Icon size="md" icon={FaFont} />
                </div>
              }
            >
              {defaultFonts.map((font, index) => (
                <SelectItem textValue={textValue} key={font.key}>
                  {font.weight.length > 1 ? (
                    <Tooltip
                      placement="right-end"
                      content={font.weight.map((fontWeight, i) => (
                        <button
                          data-active={
                            textValue === font.key &&
                            menuState?.fontWeight === String(fontWeight.value)
                          }
                          onMouseEnter={() => selectWeight(font, fontWeight)}
                          key={`${fontWeight.name}-${i}`}
                          className={tv.fontStylesTooltipWeightButtonTV()}
                        >
                          <small
                            className={tv.fontStylesTooltipWeightSmallTV()}
                            style={{
                              fontFamily: fontWeight.name,
                              fontWeight: fontWeight.value
                            }}
                          >
                            {fontWeight.name}
                          </small>
                        </button>
                      ))}
                      offset={20}
                    >
                      <button className={tv.fontStylesButtonTV()}>
                        <small
                          className={tv.fontStylesButtonSmallTV()}
                          style={{
                            fontFamily: font.label,
                            fontWeight: font.weight[0].value
                          }}
                        >
                          {font.label}
                        </small>
                        <Icon color="black" icon={BiChevronRight} />
                      </button>
                    </Tooltip>
                  ) : (
                    <button className={tv.fontStylesButtonTV()}>
                      <small
                        className={tv.fontStylesButtonSmallTV()}
                        key={index}
                        style={{
                          fontFamily: font.label,
                          fontWeight: font.weight[0].value
                        }}
                      >
                        {font.label}
                      </small>
                    </button>
                  )}
                </SelectItem>
              ))}
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
