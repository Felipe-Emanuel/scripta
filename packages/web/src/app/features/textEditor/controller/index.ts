import { Selection } from '@nextui-org/react'
import { useCallback, useMemo, useState } from 'react'
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri'

import { FirstLineIndent, TransformDashToDialog } from '../Identations'
import { useChapterConfig } from '@shared/hooks/contexts/useChapterConfig'
import { TFont, TFontWeight } from '@shared/types'

import { useEditor } from '@tiptap/react'
import { EditorState } from '@tiptap/pm/state'
import { Color } from '@tiptap/extension-color'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import { useNewChapterController } from '../../newChapter/controller'

export const useEditorController = (bookId: string) => {
  const { menuState, togleMenu, updateMenuState, updateChapterContent } = useChapterConfig()
  const { write } = useNewChapterController(bookId)

  const menuIcon = useMemo(
    () => (menuState.opened ? RiMenuUnfoldLine : RiMenuFoldLine),
    [menuState.opened]
  )

  const editor = useEditor({
    extensions: [
      StarterKit,
      TransformDashToDialog,
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
    onUpdate() {
      if (editor) {
        updateChapterContent(editor, menuState)
        write()
      }
    },
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    content: menuState.content,
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

  const wordsCounterText = menuState.wordsCounter > 1 ? 'Palavras' : 'Palavra'

  const textValue = Array.from(value)[0].toString()

  const selectWeight = useCallback(
    (font: TFont, fontWeight: TFontWeight) => {
      setValue(new Set([font.key]))
      const updatedFontWeight = String(fontWeight.value)

      editor?.commands.setFontFamily(font.key)

      updateMenuState({
        ...menuState,
        fontWeight: updatedFontWeight
      })
      editor?.commands.updateAttributes('paragraph', {
        fontWeight: updatedFontWeight
      })
    },
    [editor?.commands, menuState, updateMenuState]
  )

  return {
    textValue,
    editor,
    fullscreen,
    wordsCounterText,
    value,
    menuState,
    togleMenu,
    menuIcon,
    updateMenuState,
    setValue,
    selectWeight,
    shouldShowFloatindMenu,
    toggleFullscreen
  }
}
