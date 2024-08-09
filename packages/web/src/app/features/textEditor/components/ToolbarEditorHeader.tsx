import { Editor } from '@tiptap/react'
import * as Toolbar from '@radix-ui/react-toolbar'
import {
  RxTextAlignLeft,
  RxTextAlignCenter,
  RxTextAlignRight,
  RxTextAlignJustify
} from 'react-icons/rx'
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri'
import { IoIosColorPalette } from 'react-icons/io'

import { ToolbarTogleItem } from './ToolbarTogleItem'
import { Button } from '@nextui-org/react'
import { Icon, Text } from '@shared/components'
import { BasicIdentations } from './BasicIdentations'
import { useEditor } from '@shared/hooks/useEditor'
import { Spacings } from './Spacings'
import { FontStyles } from './FontStyles'

export interface IToolbarEditor {
  editor: Editor
}

export function ToolbarEditorHeader({ editor }: IToolbarEditor) {
  const { menuState, togleMenu, setMenuState } = useEditor()

  const icon = menuState.opened ? RiMenuUnfoldLine : RiMenuFoldLine

  return (
    <Toolbar.Root
      data-open={menuState.opened}
      className="w-12 data-[open=false]:bg-transparent data-[open=true]:w-full h-16 overflow-hidden duration-500 absolute top-0 data-[open=true]:left-0 data-[open=false]:right-0 z-10 flex flex-shrink-0 items-center p-[10px] gap-2min-w-max bg-white/10 backdrop-blur-md data-[open=true]:border-b-1 border-white/50 shadow-[0_2px_10px] shadow-black"
      aria-label="Formatting options"
    >
      {menuState.opened && (
        <div className="flex items-center overflow-x-scroll overflow-y-hidden size-full">
          <BasicIdentations editor={editor} />

          <Toolbar.Separator className="w-[1px] bg-primary mx-[10px] h-full" />
          <Toolbar.ToggleGroup
            type="single"
            className="flex flex-shrink-0"
            defaultValue="center"
            aria-label="Text alignment"
          >
            <ToolbarTogleItem
              onClick={() => editor?.chain().focus().setTextAlign('left').run()}
              data-active={editor.isActive({ textAlign: 'left' })}
              icon={RxTextAlignLeft}
              ariaLabel="Left aligned"
              value="left"
            />
            <ToolbarTogleItem
              onClick={() => editor?.chain().focus().setTextAlign('center').run()}
              data-active={editor.isActive({ textAlign: 'center' })}
              icon={RxTextAlignCenter}
              ariaLabel="Center aligned"
              value="center"
            />
            <ToolbarTogleItem
              onClick={() => editor?.chain().focus().setTextAlign('right').run()}
              data-active={editor.isActive({ textAlign: 'right' })}
              icon={RxTextAlignRight}
              ariaLabel="Right aligned"
              value="right"
            />
            <ToolbarTogleItem
              onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
              data-active={editor.isActive({ textAlign: 'justify' })}
              icon={RxTextAlignJustify}
              ariaLabel="Justify"
              value="justify"
            />
          </Toolbar.ToggleGroup>

          <Toolbar.Separator className="w-[1px] bg-primary mx-[10px] h-12" />

          <Toolbar.ToggleGroup
            type="single"
            className="flex items-center"
            defaultValue="center"
            aria-label="Text alignment"
          >
            <Spacings editor={editor} menuState={menuState} setMenuState={setMenuState} />
          </Toolbar.ToggleGroup>

          <Toolbar.Separator className="w-[1px] bg-primary mx-[10px] h-full" />

          <Toolbar.ToggleGroup
            type="single"
            className="flex items-center"
            defaultValue="center"
            aria-label="font options"
          >
            <FontStyles editor={editor} menuState={menuState} setMenuState={setMenuState} />
          </Toolbar.ToggleGroup>

          <Toolbar.Separator className="w-[1px] bg-white mx-[10px] h-14" />

          <form className="flex w-full items-center justify-start gap-2">
            <input
              type="color"
              id="color"
              className="rounded-full outline-none h-4 w-6 p-0"
              onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
              value={editor.getAttributes('textStyle').color ?? '#A0AEC0'}
            />
            <Text
              as="label"
              htmlFor="color"
              text={<Icon size="lg" icon={IoIosColorPalette} className="hidden sm:flex" />}
            />
          </form>
        </div>
      )}
      <Toolbar.ToggleGroup
        type="single"
        className="flex flex-1 items-end justify-end"
        defaultValue="center"
        aria-label="Text alignment"
      >
        <Button isIconOnly onClick={togleMenu} className="group">
          <Icon icon={icon} color="white" size="lg" className="group-hover:text-gray-400" />
        </Button>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  )
}
