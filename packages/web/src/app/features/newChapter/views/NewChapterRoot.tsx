'use client'

import { useRouter } from 'next/navigation'
import { Menu } from '@features/menu'
import { TRootComponent } from '~/src/app/shared/types'
import { menuSearchDefaultItem } from '../NewChapterUtils'

interface INewChapterRoot extends TRootComponent {
  bookId: string
}

export function NewChapterRoot({ children, bookId }: INewChapterRoot) {
  const { back } = useRouter()

  if (!bookId) {
    back()

    return null
  }

  return (
    <div className="flex flex-col gap-4 max-w-[1500px] m-auto pl-20 pb-10">
      <Menu.root>
        <Menu.pathname />
        <Menu.actions>
          <Menu.search defaultItems={menuSearchDefaultItem} />
        </Menu.actions>
      </Menu.root>
      {children}
    </div>
  )
}
