import { TSideBar, TSidebarItem } from '@shared/types'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'

import { FaHome } from 'react-icons/fa'
import { ImBooks } from 'react-icons/im'
import { FaUserAlt } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { FaUserSecret } from 'react-icons/fa6'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

let id = 0

export const items: TSideBar[] = [
  {
    section: {
      id: id++,
      name: 'Navegador',
      items: [
        {
          id: id++,
          href: APP_ROUTES.public.news.name,
          icon: FaHome,
          label: 'Novidade'
        }
      ]
    }
  },
  {
    section: {
      id: id++,
      name: 'Você',
      items: [
        {
          id: id++,
          href: APP_ROUTES.private.dashboard.name,
          icon: MdDashboard,
          label: 'Seu Painel'
        },
        {
          id: id++,
          href: APP_ROUTES.private.books.name,
          icon: ImBooks,
          label: 'Seus Livros'
        },
        {
          id: id++,
          href: APP_ROUTES.private.characters.name,
          icon: FaUserSecret,
          label: 'Seus Personagens'
        },
        {
          id: id++,
          href: APP_ROUTES.private.profile.name,
          icon: FaUserAlt,
          label: 'Perfil'
        }
      ]
    }
  }
]

export const getIsActivePath = (sectionItem: TSidebarItem, pathname: string, params: Params) => {
  const index = sectionItem.href.split('/')
  const splitedPathname = pathname.split('/')[1]
  const paramIndex = params[index[1]]?.[1]
  const isActive = pathname.includes(paramIndex) || splitedPathname === index[1]

  return isActive
}
