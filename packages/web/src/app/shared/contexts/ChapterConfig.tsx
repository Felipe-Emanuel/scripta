import { createContext, useCallback, useState } from 'react'
import { TRootComponent, TTEditorMenu } from '../types'
import { Editor } from '@tiptap/react'
import { countWords } from '../utils/transformers'

interface IChapterConfigContext {
  menuState: TTEditorMenu
  togleMenu: () => void
  updateMenuState: (newConfig: TTEditorMenu) => void
  clearMenuState: () => void
  updateChapterContent: (editor: Editor, newConfig: TTEditorMenu) => void
}

export const ChapterConfigContext = createContext({} as IChapterConfigContext)

const defaultConfig = {
  firstLineIndent: '2',
  lineHeight: '1,5',
  opened: false,
  fontSize: '16',
  fontWeight: '400',
  content: '',
  wordsCounter: 0
}

export const ChapterConfigProvider = ({ children }: TRootComponent) => {
  const [menuState, setMenuState] = useState<TTEditorMenu>(defaultConfig)

  const togleMenu = useCallback(
    () =>
      setMenuState({
        ...menuState,
        opened: !menuState.opened
      }),
    [menuState]
  )

  const clearMenuState = useCallback(() => setMenuState(defaultConfig), [])

  const updateMenuState = useCallback((newConfig: TTEditorMenu) => {
    console.log('newConfig RECEBIDA: ', newConfig)

    return setMenuState({
      ...newConfig
    })
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

  return (
    <ChapterConfigContext.Provider
      value={{
        menuState,
        togleMenu,
        updateMenuState,
        clearMenuState,
        updateChapterContent
      }}
    >
      {children}
    </ChapterConfigContext.Provider>
  )
}
