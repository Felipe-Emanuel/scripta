'use client'

import { Text } from '@shared/components'
import { usePathname } from 'next/navigation'
import { getCurrentRoute } from '../MenuUtils'

export function MenuPathname() {
  const pathname = usePathname()

  const currentRoute = getCurrentRoute(pathname)

  return (
    <div>
      <Text as="span" size="sm" color="gray" text={currentRoute?.base} />{' '}
      <Text as="span" size="md" color="white" text={`/ ${currentRoute?.label}`} />
    </div>
  )
}
