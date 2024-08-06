import { Editor } from '@tiptap/react'
import * as Toolbar from '@radix-ui/react-toolbar'
import {
  RxStrikethrough,
  RxTextAlignLeft,
  RxTextAlignCenter,
  RxTextAlignRight,
  RxTextAlignJustify,
  RxFontBold,
  RxFontItalic
} from 'react-icons/rx'
import { FaHighlighter } from 'react-icons/fa6'
import { ToolbarTogleItem } from '../components/ToolbarTogleItem'

interface IToolbarEditor {
  editor: Editor
  className?: string
}

export function ToolbarEditor({ editor, className }: IToolbarEditor) {
  return (
    <Toolbar.Root
      className={`z-50 flex p-[10px] gap-2 w-full min-w-max rounded-md bg-white/10 backdrop-blur-md ring-1 ring-white/50 shadow-[0_2px_10px] shadow-black ${className}`}
      aria-label="Formatting options"
    >
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <ToolbarTogleItem
          onClick={() => editor?.chain().focus().toggleBold().run()}
          data-active={editor?.isActive('bold')}
          icon={RxFontBold}
          ariaLabel="Bold"
          value="bold"
        />

        <ToolbarTogleItem
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          data-active={editor?.isActive('italic')}
          icon={RxFontItalic}
          value="italic"
          ariaLabel="Italic"
        />

        <ToolbarTogleItem
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          data-active={editor?.isActive('strike')}
          icon={RxStrikethrough}
          value="strikethrough"
          ariaLabel="Strike through"
        />
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="w-[1px] bg-primary mx-[10px]" />
      <Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
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
      <Toolbar.Separator className="w-[1px] bg-primary mx-[10px]" />
      <ToolbarTogleItem
        onClick={() => editor?.chain().focus().toggleHighlight({ color: '#0075FF' }).run()}
        data-active={editor.isActive('highlight', { color: '#0075FF' })}
        icon={FaHighlighter}
        ariaLabel="Highlight"
        value="highlight"
      />
    </Toolbar.Root>
  )
}
