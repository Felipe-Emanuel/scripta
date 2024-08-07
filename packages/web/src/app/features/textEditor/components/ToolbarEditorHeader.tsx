import { Editor } from '@tiptap/react'
import * as Toolbar from '@radix-ui/react-toolbar'
import {
  RxTextAlignLeft,
  RxTextAlignCenter,
  RxTextAlignRight,
  RxTextAlignJustify
} from 'react-icons/rx'
import { RiMenuFoldLine, RiMenuUnfoldLine, RiFontSize } from 'react-icons/ri'

import { ToolbarTogleItem } from './ToolbarTogleItem'
import { Button, Input } from '@nextui-org/react'
import { Icon } from '@shared/components'
import { BasicIdentations } from './BasicIdentations'
import { useEditor } from '@shared/hooks/useEditor'
import { Spacings } from './Spacings'

export interface IToolbarEditor {
  editor: Editor
}

export function ToolbarEditorHeader({ editor }: IToolbarEditor) {
  const { menuState, togleMenu, setMenuState } = useEditor()

  const icon = menuState.opened ? RiMenuUnfoldLine : RiMenuFoldLine

  return (
    <Toolbar.Root
      data-open={menuState.opened}
      className="w-12 data-[open=false]:bg-transparent data-[open=true]:w-full h-12 overflow-hidden duration-500 absolute top-0 data-[open=true]:left-0 data-[open=false]:right-0 z-10 flex flex-shrink-0 items-center p-[10px] gap-2min-w-max bg-white/10 backdrop-blur-md data-[open=true]:border-b-1 border-white/50 shadow-[0_2px_10px] shadow-black"
      aria-label="Formatting options"
    >
      {menuState.opened && (
        <>
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
          <Toolbar.Separator className="w-[1px] bg-primary mx-[10px] h-full" />
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
            className="flex flex-1 items-end justify-end"
            defaultValue="center"
            aria-label="Text alignment"
          >
            <Input
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
              label="Fonte"
              placeholder="0"
              labelPlacement="outside-left"
              size="sm"
              color="primary"
              variant="underlined"
              className="text-white"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    <Icon size="md" icon={RiFontSize} />
                  </span>
                </div>
              }
            />
          </Toolbar.ToggleGroup>
        </>
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
