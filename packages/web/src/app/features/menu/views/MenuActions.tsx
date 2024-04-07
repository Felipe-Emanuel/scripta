'use client'

import { Button, Tooltip } from '@nextui-org/react'

import { TRootComponent } from '@shared/types'
import { menuActions } from '../MenuUtils'
import { Icon, Text } from '@shared/components'
import { useUser } from '@shared/hooks/useUser'
import { useProvidersSession } from '@shared/hooks/useProvidersSession'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'

export function MenuActions({ children }: TRootComponent) {
  const { push } = useRouter()
  const { logOut } = useProvidersSession()
  const { sessionCustomer } = useUser()

  const handleUserClick = () =>
    sessionCustomer?.email ? logOut() : push(APP_ROUTES.public.auth.name)

  const actions = menuActions({
    isAuthenticated: !!sessionCustomer?.email,
    handleNotificationClick: () => console.log('Notificação'),
    handleSettingsClick: () => console.log('Configs'),
    handleUserClick
  })

  return (
    <div className="flex items-center gap-1 w-fit">
      {children}
      {actions.map((action) => {
        const content = (
          <div className="flex items-center gap-1">
            <Icon icon={action.icon} size="md" color="gray" />
            {action.label && <Text text={action.label} size="sm" color="gray" />}
          </div>
        )

        return (
          <Button
            isIconOnly={action.isIconOnly}
            size="sm"
            color="primary"
            variant="light"
            key={action.id}
            className="flex items-center gap-1"
            onClick={action.handleClick}
          >
            {action.tooltipLabel ? (
              <Tooltip showArrow content={action.tooltipLabel}>
                {content}
              </Tooltip>
            ) : (
              content
            )}
          </Button>
        )
      })}
    </div>
  )
}
