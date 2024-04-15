import { Template } from '@shared/components'
import { TRootComponent } from '@shared/types'
import { bookInformationRootTV } from '../BookInformationTV'

export function BookInformationRoot({ children }: TRootComponent) {
  return (
    <Template id="book-information-root" size="fit" className={bookInformationRootTV()}>
      {children}
    </Template>
  )
}
