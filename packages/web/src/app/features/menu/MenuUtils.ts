import { TCurrentLabel, TMenuActions } from '@shared/types'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'

import { FaUser } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { IoMdNotifications } from 'react-icons/io'

type TmenuActionsCreate = {
  isAuthenticated: boolean
  handleUserClick: VoidFunction
  handleNotificationClick: VoidFunction
  handleSettingsClick: VoidFunction
}

export const getCurrentRoute = (pathname: string): TCurrentLabel => {
  if (pathname === '/') {
    return { ...APP_ROUTES.public.news }
  }

  const combinedArray = []
  for (const key in APP_ROUTES) {
    const routeValue = APP_ROUTES[key as 'private' | 'public']
    combinedArray.push(routeValue)
  }

  const combinedObject = {
    ...combinedArray[0],
    ...combinedArray[1]
  }

  const pathSegments = pathname.split('/').filter(Boolean)

  let lastKnownRoute: TCurrentLabel | null = null

  for (const segment of pathSegments) {
    if (combinedObject[segment as keyof typeof combinedObject]) {
      lastKnownRoute = combinedObject[segment as keyof typeof combinedObject]
    }
  }

  return lastKnownRoute || { name: pathname, label: 'Desconhecido', base: 'Navegador' }
}

let id = 0

export const menuActions = ({
  isAuthenticated,
  handleUserClick,
  handleNotificationClick,
  handleSettingsClick
}: TmenuActionsCreate): TMenuActions[] => [
  {
    id: id++,
    icon: isAuthenticated ? IoLogOut : FaUser,
    label: isAuthenticated ? 'Sair' : 'Acessar',
    handleClick: handleUserClick,
    isIconOnly: false
  },
  {
    id: id++,
    icon: IoMdSettings,
    tooltipLabel: 'Configurações',
    handleClick: handleSettingsClick,
    isIconOnly: true
  },
  {
    id: id++,
    icon: IoMdNotifications,
    tooltipLabel: 'Notificações',
    handleClick: handleNotificationClick,
    isIconOnly: true
  }
]
