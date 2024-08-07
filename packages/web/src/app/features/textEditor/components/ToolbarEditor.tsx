import * as Toolbar from '@radix-ui/react-toolbar'
import { FaHighlighter } from 'react-icons/fa6'
import { ToolbarTogleItem } from '../components/ToolbarTogleItem'
import { IToolbarEditor } from './ToolbarEditorHeader'
import { BasicIdentations } from './BasicIdentations'

import { RxHeading } from 'react-icons/rx'
import { MdSubtitles } from 'react-icons/md'
import { CiText } from 'react-icons/ci'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { GoChevronDown } from 'react-icons/go'
import { ToolbarDropdownItemContent } from './ToolbarDropdownItemContent'

export function ToolbarEditor({ editor }: IToolbarEditor) {
  return (
    <Toolbar.Root
      className="z-50 flex items-center p-[10px] gap-2 w-full min-w-max rounded-md bg-black/75 backdrop-blur-sm ring-1 ring-white/50 shadow-[0_2px_10px] shadow-black"
      aria-label="Formatting options"
    >
      <BasicIdentations editor={editor} />
      <Toolbar.Separator className="w-[1px] bg-primary mx-[10px] h-7" />
      <ToolbarTogleItem
        onClick={() => editor?.chain().focus().toggleHighlight({ color: '#0075FF' }).run()}
        data-active={editor.isActive('highlight', { color: '#0075FF' })}
        icon={FaHighlighter}
        ariaLabel="Highlight"
        value="highlight"
      />

      <Toolbar.Separator className="w-[1px] bg-primary mx-[10px] h-7" />

      <Dropdown placement="bottom-end" className="w-5">
        <DropdownTrigger>
          <Button size="sm" isIconOnly variant="flat" color="secondary">
            <GoChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Opções de títulos" selectionMode="none">
          <DropdownItem
            variant="solid"
            color={editor.isEmpty ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().clearNodes().run()}
            key="text"
          >
            <ToolbarDropdownItemContent
              ariaLabel="Text"
              value="text"
              editor={editor}
              icon={CiText}
              isActive={editor.isEmpty}
              text="Texto"
            />
          </DropdownItem>
          <DropdownItem
            variant="solid"
            color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).toggleBold().run()}
            key="heading-1"
          >
            <ToolbarDropdownItemContent
              ariaLabel="Title"
              value="title"
              editor={editor}
              icon={RxHeading}
              isActive={editor.isActive('heading', { level: 1 })}
              text="Título"
            />
          </DropdownItem>
          <DropdownItem
            variant="solid"
            color={editor.isActive('heading', { level: 6 }) ? 'primary' : 'default'}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).toggleBold().toggleItalic().run()
            }
            key="heading-6"
          >
            <ToolbarDropdownItemContent
              ariaLabel="Subtitle"
              value="subtitle"
              editor={editor}
              icon={MdSubtitles}
              isActive={editor.isActive('heading', { level: 6 })}
              text="Subtítulo"
            />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Toolbar.Root>
  )
}
