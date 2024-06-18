import { TRootComponent } from '@shared/types'
import { myOwnBooksRootTV } from '../MyOwnBooksUtilsTV'

export function MyOwnBooksRoot({ children }: TRootComponent) {
  return (
    <div id="my-own-books-root" className={myOwnBooksRootTV()}>
      {children}
    </div>
  )
}
