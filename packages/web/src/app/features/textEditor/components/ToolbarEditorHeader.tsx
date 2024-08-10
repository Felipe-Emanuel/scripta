import { Dispatch, SetStateAction } from 'react'

import { Editor } from '@tiptap/react'

import { Button } from '@nextui-org/react'
import * as Toolbar from '@radix-ui/react-toolbar'

import { IconType } from 'react-icons/lib'
import { IoIosColorPalette } from 'react-icons/io'

import { TTEditorMenu } from '@shared/types'
import { Icon, Text } from '@shared/components'
import { ToolbarTogleItem } from './ToolbarTogleItem'
import { BasicIdentations } from './BasicIdentations'
import { Spacings } from './Spacings'
import { FontStyles } from './FontStyles'
import { toolbarEditorHeaderData } from './componentUtils'
import * as tv from './TextEditorComponentsTV'

export interface IToolbarEditor {
  editor: Editor
  menuState?: TTEditorMenu
  menuIcon?: IconType
  setMenuState?: Dispatch<SetStateAction<TTEditorMenu>>
  togleMenu?: () => void
}

export function ToolbarEditorHeader({
  editor,
  menuState,
  setMenuState,
  togleMenu,
  menuIcon
}: IToolbarEditor) {
  return (
    <Toolbar.Root
      data-open={menuState?.opened}
      className={tv.toolbarEditorHeaderTV()}
      aria-label="opções de formatação"
    >
      {menuState?.opened && (
        <div className={tv.toolbarEditorHeaderContentTV()}>
          <BasicIdentations editor={editor} />
          <Toolbar.Separator className={tv.toolbarEditorHeaderSeparatorTV()} />
          <Toolbar.ToggleGroup
            type="single"
            className={tv.toolbarEditorHeaderAlignTV()}
            defaultValue="center"
            aria-label="Text alignment"
          >
            {toolbarEditorHeaderData.map(({ value, icon, ariaLabel }) => (
              <ToolbarTogleItem
                key={value}
                onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                data-active={editor.isActive({ textAlign: value })}
                icon={icon}
                ariaLabel={ariaLabel}
                value={value}
              />
            ))}
          </Toolbar.ToggleGroup>

          <Toolbar.Separator className={tv.toolbarEditorHeaderSeparatorTV()} />

          <Toolbar.ToggleGroup
            type="single"
            className={tv.toolbarEditorHeaderSpacingsTV()}
            aria-label="Text spacings"
          >
            <Spacings editor={editor} menuState={menuState} setMenuState={setMenuState} />
          </Toolbar.ToggleGroup>

          <Toolbar.Separator className={tv.toolbarEditorHeaderSeparatorTV()} />

          <Toolbar.ToggleGroup type="single" aria-label="Font styles">
            <FontStyles editor={editor} menuState={menuState} setMenuState={setMenuState} />
          </Toolbar.ToggleGroup>

          <Toolbar.Separator className={tv.toolbarEditorHeaderSeparatorTV()} />

          <form className={tv.toolbarEditorHeaderFormTV()}>
            <input
              type="color"
              id="color"
              className={tv.toolbarEditorHeaderColorTV()}
              onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
              value={editor.getAttributes('textStyle').color ?? '#A0AEC0'}
            />
            <Text as="label" htmlFor="color" text={<Icon size="lg" icon={IoIosColorPalette} />} />
          </form>
        </div>
      )}

      <Button isIconOnly onClick={togleMenu} className="group">
        <Icon
          icon={menuIcon!}
          color="white"
          size="lg"
          className={tv.toolbarEditorHeaderToggleIconTV()}
        />
      </Button>
    </Toolbar.Root>
  )
}
