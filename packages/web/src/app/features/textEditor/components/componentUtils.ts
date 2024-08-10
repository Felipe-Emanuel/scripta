import { Editor } from '@tiptap/react'
import { removeLeadingSlash } from '../Identations'
import { MdSubtitles, MdFormatListBulletedAdd } from 'react-icons/md'
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from 'react-icons/lu'
import { CiText } from 'react-icons/ci'
import {
  RxStrikethrough,
  RxFontBold,
  RxFontItalic,
  RxUnderline,
  RxHeading,
  RxTextAlignLeft,
  RxTextAlignCenter,
  RxTextAlignRight,
  RxTextAlignJustify
} from 'react-icons/rx'

export const floatingMenuContentButtons = [
  {
    level: 1,
    icon: RxHeading,
    label: 'Título',
    description: 'Aplicar seção de título',
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 1 }).toggleBold().run()
      removeLeadingSlash(editor)
    }
  },
  {
    level: 6,
    icon: MdSubtitles,
    label: 'Subtítulo',
    description: 'Aplicar seção de subtítulo',
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 6 }).toggleBold().toggleItalic().run()
      removeLeadingSlash(editor)
    }
  },
  {
    level: 2,
    icon: LuHeading1,
    label: 'Título 1',
    description: 'Aplicar seção de título 1',
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 2 }).toggleBold().run()
      removeLeadingSlash(editor)
    }
  },
  {
    level: 3,
    icon: LuHeading2,
    label: 'Título 2',
    description: 'Aplicar seção de título 2',
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 3 }).toggleBold().run()
      removeLeadingSlash(editor)
    }
  },
  {
    level: 4,
    icon: LuHeading3,
    label: 'Título 3',
    description: 'Aplicar seção de título 3',
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 4 }).toggleBold().run()
      removeLeadingSlash(editor)
    }
  },
  {
    level: 5,
    icon: LuHeading4,
    label: 'Título 4',
    description: 'Aplicar seção de título 4',
    action: (editor: Editor) => {
      editor.chain().focus().toggleHeading({ level: 5 }).toggleBold().run()
      removeLeadingSlash(editor)
    }
  },
  {
    level: null,
    icon: MdFormatListBulletedAdd,
    label: 'Lista com marcadores',
    description: 'Aplicar marcador',
    action: (editor: Editor) => {
      editor.chain().focus().toggleBulletList().run()
      removeLeadingSlash(editor)
    }
  }
]

export const basicIdentationsButtons = [
  {
    action: (editor: Editor) => editor?.chain().focus().toggleBold().run(),
    icon: RxFontBold,
    value: 'bold',
    ariaLabel: 'Bold'
  },
  {
    action: (editor: Editor) => editor?.chain().focus().toggleItalic().run(),
    icon: RxFontItalic,
    value: 'italic',
    ariaLabel: 'Italic'
  },
  {
    action: (editor: Editor) => editor?.chain().focus().toggleStrike().run(),
    icon: RxStrikethrough,
    value: 'strikethrough',
    ariaLabel: 'Strike through'
  },
  {
    action: (editor: Editor) => editor?.chain().focus().toggleUnderline().run(),
    icon: RxUnderline,
    value: 'underline',
    ariaLabel: 'Underline'
  }
]

export const toolbarEditorData = (editor: Editor) => [
  {
    key: 'text',
    ariaLabel: 'Text',
    value: 'text',
    icon: CiText,
    text: 'Texto',
    action: (editor: Editor) => editor.chain().focus().clearNodes().run(),
    isActive: editor.isEmpty
  },
  {
    key: 'heading-1',
    ariaLabel: 'Title',
    value: 'title',
    icon: RxHeading,
    text: 'Título',
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).toggleBold().run(),
    isActive: editor.isActive('heading', { level: 1 })
  },
  {
    key: 'heading-6',
    ariaLabel: 'Subtitle',
    value: 'subtitle',
    icon: MdSubtitles,
    text: 'Subtítulo',
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 6 }).toggleBold().toggleItalic().run(),
    isActive: editor.isActive('heading', { level: 6 })
  }
]

export const toolbarEditorHeaderData = [
  { value: 'left', icon: RxTextAlignLeft, ariaLabel: 'Left aligned' },
  { value: 'center', icon: RxTextAlignCenter, ariaLabel: 'Center aligned' },
  { value: 'right', icon: RxTextAlignRight, ariaLabel: 'Right aligned' },
  { value: 'justify', icon: RxTextAlignJustify, ariaLabel: 'Justify' }
]
