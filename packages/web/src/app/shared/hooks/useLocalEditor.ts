import { Editor, useEditor } from '@tiptap/react'
import { extensions } from '../resources'
import { useDebounce } from './useDebounce'
import { useCallback, useEffect, useState } from 'react'
import { TTEditorMenu } from '../types'
import { countWords } from '../utils/transformers'

export type IUseLocalEditor = {
  initialContent?: string
  callBack?: (html: string | undefined) => void
}

const defaultConfig: TTEditorMenu = {
  firstLineIndent: '2',
  lineHeight: '1.5',
  opened: false,
  fontSize: '16',
  fontWeight: '400',
  content: '',
  wordsCounter: 0
}

export const useLocalEditor = (props: IUseLocalEditor) => {
  const { debounced } = useDebounce()

  const [menuState, setMenuState] = useState<TTEditorMenu>(defaultConfig)

  const editor = useEditor({
    extensions,
    content: props?.initialContent,
    onUpdate() {
      props?.callBack && debounced(() => props.callBack?.(editor?.getHTML()), 1000)
      setMenuState((prev) => ({
        ...prev,
        wordsCounter: countWords(String(editor?.getText()))
      }))
    },
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'outline-none leading-none text-gray-400'
      }
    }
  })

  useEffect(() => {
    if (editor && props?.initialContent) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(props.initialContent, 'text/html')

      const computedStyle = window.getComputedStyle(doc.body)

      setMenuState((prevState) => ({
        ...prevState,
        content: String(props.initialContent),
        wordsCounter: countWords(String(doc.body.textContent)),
        fontSize: computedStyle.fontSize.replace('px', ''),
        fontWeight: computedStyle.fontWeight,
        lineHeight: computedStyle.lineHeight,
        firstLineIndent: computedStyle.textIndent.replace('px', '')
      }))
    }
  }, [editor, props?.initialContent])

  const togleMenu = useCallback(
    () => setMenuState((prev) => ({ ...prev, opened: !prev.opened })),
    []
  )

  const clearMenuState = useCallback(() => setMenuState(defaultConfig), [])

  const updateMenuState = useCallback((newConfig: TTEditorMenu) => {
    setMenuState({ ...newConfig })
  }, [])

  const updateChapterContent = useCallback(
    (editor: Editor, newConfig: TTEditorMenu) =>
      setMenuState({
        ...newConfig,
        content: editor.getHTML(),
        wordsCounter: countWords(editor.getText())
      }),
    []
  )

  return {
    editor,
    menuState,
    togleMenu,
    clearMenuState,
    updateMenuState,
    updateChapterContent
  }
}
