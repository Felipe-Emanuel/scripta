import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  ButtonGroup,
  Input,
  Select,
  SelectItem,
  Selection,
  Tooltip
} from '@nextui-org/react'
import { Separator } from '@radix-ui/react-toolbar'
import { useState } from 'react'

import { GoChevronDown } from 'react-icons/go'
import { FaFont } from 'react-icons/fa6'
import { RiFontSize } from 'react-icons/ri'
import { IoIosColorPalette } from 'react-icons/io'
import { BiChevronRight } from 'react-icons/bi'

import { Icon } from '@shared/components'
import { ISpacings } from './Spacings'
import { defaultFonts } from '../TextEditorUtils'

type TFontWeight = {
  value: number
  name: string
}

type TFont = {
  key: string
  label: string
  weight: TFontWeight[]
}

export function FontStyles({ editor, menuState, setMenuState }: ISpacings) {
    const INITIAL_FONT = editor.getAttributes('textStyle').fontFamily ?? 'Inter'
  const [value, setValue] = useState<Selection>(new Set([INITIAL_FONT]))

  const textValue = Array.from(value)[0].toString()

  const selectWeight = (font: TFont, fontWeight: TFontWeight) => {
    setValue(new Set([font.key]))
    const updatedFontWeight = String(fontWeight.value)

    editor.commands.setFontFamily(font.key)
    
    setMenuState({
      ...menuState,
      fontWeight: updatedFontWeight
    })
    editor.commands.updateAttributes('paragraph', {
      fontWeight: updatedFontWeight
    })
  }

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
          <div className="flex w-full items-center justify-start gap-2">
            <Icon size="lg" icon={IoIosColorPalette} className="hidden sm:flex" />
            <input
              type="color"
              name="color"
              className="rounded-full outline-none h-4 w-6 p-0"
              onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
              value={editor.getAttributes('textStyle').color}
            />
          </div>

          <div className="flex flex-1 items-center gap-2">
            <Input
              aria-label="Tamanho da fonte"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9,.]/g, '')
                setMenuState({
                  ...menuState,
                  fontSize: value
                })
                editor.commands.updateAttributes('paragraph', {
                  fontSize: `${value ?? '0'}px`
                })
              }}
              value={menuState.fontSize}
              type="number"
              placeholder="16"
              size="sm"
              color="primary"
              variant="underlined"
              className="text-black flex flex-1"
              endContent={
                <div className="pointer-events-none items-center hidden sm:flex">
                  <Icon size="md" icon={RiFontSize} />
                </div>
              }
            />

            <Separator className="w-[1px] bg-primary mx-[10px] h-full" />

            <Select
              aria-label="Escolha de fontes"
              placeholder="Inter"
              defaultSelectedKeys={['cat']}
              variant="underlined"
              onClick={(e) => e.stopPropagation()}
              items={defaultFonts}
              onSelectionChange={(key) => {
                setValue(key)
                const selectedFont = Array.from(key)[0]
                editor.commands.setFontFamily(String(selectedFont))
              }}
              selectedKeys={value}
              className="flex flex-[2]"
              scrollShadowProps={{
                isEnabled: false
              }}
              endContent={
                <div className="pointer-events-none items-center hidden sm:flex">
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
                            menuState.fontWeight === String(fontWeight.value)
                          }
                          onMouseEnter={() => selectWeight(font, fontWeight)}
                          key={`${fontWeight.name}-${i}`}
                          className="data-[active=true]:bg-[#ccc] bg-transparent p-2 z-40 hover:bg-[#bbb] group rounded-md duration-300 w-full flex items-center justify-between"
                        >
                          <small
                            className="text-black group-hover:text-black/75"
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
                      <button className="bg-transparent w-full flex items-center justify-between">
                        <small
                          className="text-black"
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
                    <button className="bg-transparent w-full flex items-center justify-between">
                      <small
                        className="text-black"
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
