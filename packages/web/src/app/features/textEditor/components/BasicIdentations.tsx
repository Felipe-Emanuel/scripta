import * as Toolbar from '@radix-ui/react-toolbar'
import { RxStrikethrough, RxFontBold, RxFontItalic, RxUnderline } from 'react-icons/rx'

import { IToolbarEditor } from './ToolbarEditorHeader'
import { ToolbarTogleItem } from './ToolbarTogleItem'

export function BasicIdentations({ editor }: IToolbarEditor) {
  return (
    <Toolbar.ToggleGroup
      type="multiple"
      className="flex flex-shrink-0"
      aria-label="Text formatting"
    >
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
      <ToolbarTogleItem
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        data-active={editor?.isActive('underline')}
        icon={RxUnderline}
        value="underline"
        ariaLabel="underline"
      />
    </Toolbar.ToggleGroup>
  )
}
