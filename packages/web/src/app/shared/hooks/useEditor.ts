import { useState } from 'react'
import { TTEditorMenu } from '@shared/types'

export const useEditor = () => {
  const [menuState, setMenuState] = useState<TTEditorMenu>({
    firstLineIndent: '2',
    lineHeight: '1,5',
    opened: false,
    fontSize: '16'
  })

  const togleMenu = () =>
    setMenuState({
      ...menuState,
      opened: !menuState.opened
    })

  return {
    menuState,
    togleMenu,
    setMenuState
  }
}
