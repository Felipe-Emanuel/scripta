import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import * as Toolbar from '@radix-ui/react-toolbar'

import { FaHighlighter } from 'react-icons/fa6'
import { GoChevronDown } from 'react-icons/go'

import { ToolbarTogleItem } from '../components/ToolbarTogleItem'
import { IToolbarEditor } from './ToolbarEditorHeader'
import { BasicIdentations } from './BasicIdentations'
import { ToolbarDropdownItemContent } from './ToolbarDropdownItemContent'
import { toolbarEditorData } from './componentUtils'
import * as tv from './TextEditorComponentsTV'

export function ToolbarEditor({ editor }: IToolbarEditor) {
  return (
    <Toolbar.Root
      className={tv.toolbarEditorTV()}
      aria-label="Formatting options"
    >
      <span className={tv.toolbarEditorBasicsTV()}>
        <BasicIdentations editor={editor} />
        <Toolbar.Separator className={tv.toolbarEditorSeparatorTV()} />
      </span>
      <ToolbarTogleItem
        onClick={() => editor?.chain().focus().toggleHighlight({ color: '#0075FF' }).run()}
        data-active={editor.isActive('highlight', { color: '#0075FF' })}
        icon={FaHighlighter}
        ariaLabel="Highlight"
        value="highlight"
      />

      <Toolbar.Separator className={tv.toolbarEditorSeparatorTV()} />

      <Dropdown placement="bottom-end" className="w-5">
        <DropdownTrigger>
          <Button size="sm" isIconOnly variant="flat" color="secondary">
            <GoChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Opções de títulos" selectionMode="none">
          {toolbarEditorData(editor).map(({ key, ariaLabel, value, icon, text, action, isActive }) => (
            <DropdownItem
              key={key}
              variant="solid"
              color={isActive ? 'primary' : 'default'}
              onClick={() => action(editor)}
            >
              <ToolbarDropdownItemContent
                ariaLabel={ariaLabel}
                value={value}
                editor={editor}
                icon={icon}
                isActive={isActive}
                text={text}
              />
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </Toolbar.Root>
  )
}
