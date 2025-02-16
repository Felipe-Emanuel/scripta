import { Selection } from "@heroui/react"
import { useCallback, useMemo, useState } from 'react'
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri'

import { TFont, TFontWeight } from '@shared/types'

import { EditorState } from '@tiptap/pm/state'
import { IUseLocalEditor, useLocalEditor } from '@shared/hooks/useLocalEditor'

export const useEditorController = (useLocapEditorProps: IUseLocalEditor) => {
  const { editor, menuState, togleMenu, updateMenuState } = useLocalEditor(useLocapEditorProps)

  const menuIcon = useMemo(
    () => (menuState.opened ? RiMenuUnfoldLine : RiMenuFoldLine),
    [menuState.opened]
  )

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
