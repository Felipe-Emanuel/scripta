'use client'

import { TRootComponent } from '@shared/types'
import { textEditorRootTV } from '../TextEditorTV'

export function TextEditorRoot({ children }: TRootComponent) {
  console.log(
    '%c🤞 %cMEMORIZE%c\n\nAlguns problemas podem aparecer no console se estiver usando o Google Chrome, mas sua experiência como usuário final continua perfeitamente funcional.\n\nEstou trabalhando para solucionar o problema do Chrome ✨',
    'font-size: 20px; color: #000;',
    'font-size: 20px; color: #FF5733; font-weight: bold;',
    'font-size: 16px; color: #81713a;'
  )

  return <div className={textEditorRootTV()}>{children}</div>
}
