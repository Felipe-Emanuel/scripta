import { Popover as PopoverHeadless, Transition } from '@headlessui/react'
import { Icon } from '@shared/components'
import { TRootComponent } from '@shared/types'
import { Fragment } from 'react'
import { CiCalendar } from 'react-icons/ci'
import {
  popoverContentWrapperTV,
  popoverTriggerTV,
} from '@shared/components/Popover/PopoverTV'

export function Popover({ children }: TRootComponent) {
  return (
    <PopoverHeadless className="relative">
      <PopoverHeadless.Button className={popoverTriggerTV()}>
        <Icon icon={CiCalendar} size="md" color="tertiary" />
      </PopoverHeadless.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverHeadless.Panel className={popoverContentWrapperTV()}>
          {children}
        </PopoverHeadless.Panel>
      </Transition>
    </PopoverHeadless>
  )
}
