import { IconType } from 'react-icons/lib'
import { Button, ButtonProps } from '@nextui-org/react'

export interface IToolbarTogleItem extends ButtonProps {
  icon: IconType
  value: string
  ariaLabel: string
}

export function ToolbarTogleItem({ icon: Icon, ariaLabel, value, ...props }: IToolbarTogleItem) {
  return (
    <Button
      isIconOnly
      className="flex-shrink-0 flex-grow-0 basis-auto text-black/75 h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white ml-1.5 outline-none duration-700 hover:bg-primary/75 hover:text-white focus:relative focus:shadow-[0_0_0_2px] focus:shadow-primary/75 first:ml-0 data-[active=true]:bg-primary data-[active=true]:text-white"
      value={value}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon className="size-4" />
    </Button>
  )
}
