'use client'

import { Button, Tooltip } from '@nextui-org/react'

import { Icon, Text } from '@shared/components'
import { TRootComponent } from '@shared/types'
import * as tv from '../MenuTV'
import { useMenuController } from '../controller'

export function MenuActions({ children }: TRootComponent) {
  const { actions } = useMenuController()

  return (
    <div className={tv.menuActionWrapperTV()}>
      {children}
      {actions.map((action, i) => {
        const content = (
          <div className={tv.menuActionContentTV()}>
            <Icon icon={action.icon} size="md" color="gray" />
            {action.label && <Text text={action.label} size="sm" color="gray" />}
          </div>
        )

        return (
          <Button
            data-testid={`action-${i}`}
            isIconOnly={action.isIconOnly}
            size="sm"
            color="primary"
            variant="light"
            key={action.id}
            className={tv.menuActionContentTV()}
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
