import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'
import { readerRootTV } from '../ReaderTV'

export function ReaderRoot({ children }: TRootComponent) {
  return (
    <Template overflow="hidden" className={readerRootTV()}>
      {children}
    </Template>
  )
}
