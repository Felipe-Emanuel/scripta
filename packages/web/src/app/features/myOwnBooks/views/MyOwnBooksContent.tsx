'use client'

import { Template } from '@shared/components'
import { myOwnBooksContentTV } from '../MyOwnBooksUtilsTV'
import BooksTable from './components/Table'

export function MyOwnBooksContent() {
  return (
    <Template className={myOwnBooksContentTV()}>
      <BooksTable />
    </Template>
  )
}
