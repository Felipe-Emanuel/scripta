import { Selection } from '@nextui-org/react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri'

import { FirstLineIndent, TransformDashToDialog } from '../Identations'
import { countWords } from '@shared/utils/transformers'
import { useEditor as useEditorMenu } from '@shared/hooks/useEditor'
import { TChapterContent, TFont, TFontWeight, TTEditorMenu } from '@shared/types'

import { useEditor } from '@tiptap/react'
import { EditorState } from '@tiptap/pm/state'
import { Color } from '@tiptap/extension-color'
import { Document } from '@tiptap/extension-document'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'

export const useEditorController = () => {
  const { menuState, togleMenu, setMenuState } = useEditorMenu()
  const [chapterContent, setChapterContent] = useState<TChapterContent>({
    content: '',
    wordsCounter: 0
  })

  const menuIcon = useMemo(
    () => (menuState.opened ? RiMenuUnfoldLine : RiMenuFoldLine),
    [menuState.opened]
  )

  const editor = useEditor({
    extensions: [
      StarterKit,
      TransformDashToDialog,
      Document,
      Underline,
      FirstLineIndent,
      Color,
      TextStyle,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'justify'
      }),
      Highlight.configure({
        multicolor: true
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Qual o título?'
          }

          return 'Comece com / para abrir o menu.'
        }
      })
    ],
    onUpdate({ editor }) {
      return setChapterContent({
        content: editor.getHTML(),
        wordsCounter: countWords(editor.getText())
      })
    },
    immediatelyRender: false,
    content: chapterContent.content,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'outline-none leading-none text-gray-400'
      }
    }
  })

  const INITIAL_FONT = editor?.getAttributes('textStyle').fontFamily ?? 'Inter'
  const [value, setValue] = useState<Selection>(new Set([INITIAL_FONT]))

  const [fullscreen, setFullscreen] = useState(false)

  const shouldShowFloatindMenu = (state: EditorState) => {
    const { $from } = state.selection
    const currentLineText = $from.nodeBefore?.textContent
    return currentLineText === '/'
  }

  const toggleFullscreen = () => setFullscreen((prev) => !prev)

  const wordsCounterText = chapterContent.wordsCounter > 1 ? 'Palavras' : 'Palavra'

  const textValue = Array.from(value)[0].toString()

  const selectWeight = (
    font: TFont,
    fontWeight: TFontWeight,
    menuState: TTEditorMenu,
    setMenuState: Dispatch<SetStateAction<TTEditorMenu>>
  ) => {
    setValue(new Set([font.key]))
    const updatedFontWeight = String(fontWeight.value)

    editor?.commands.setFontFamily(font.key)

    setMenuState({
      ...menuState,
      fontWeight: updatedFontWeight
    })
    editor?.commands.updateAttributes('paragraph', {
      fontWeight: updatedFontWeight
    })
  }

  return {
    textValue,
    editor,
    fullscreen,
    wordsCounterText,
    chapterContent,
    value,
    menuState,
    togleMenu,
    menuIcon,
    setMenuState,
    setValue,
    selectWeight,
    shouldShowFloatindMenu,
    toggleFullscreen
  }
}
