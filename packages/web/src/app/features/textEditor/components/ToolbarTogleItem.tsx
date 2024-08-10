import { IconType } from 'react-icons/lib'
import { Button, ButtonProps } from '@nextui-org/react'
import { toolbarTogleItemTV } from './TextEditorComponentsTV'

export interface IToolbarTogleItem extends ButtonProps {
  icon: IconType
  value: string
  ariaLabel: string
}

export function ToolbarTogleItem({ icon: Icon, ariaLabel, value, ...props }: IToolbarTogleItem) {
  return (
    <Button
      isIconOnly
      className={toolbarTogleItemTV()}
      value={value}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon className="size-4" />
    </Button>
  )
}
