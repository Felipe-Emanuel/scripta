'use client'

import { mainTv } from '@shared/components/Main/MainTV'
import { TRootComponent } from '@shared/types'
import { useEffect, useState } from 'react'
import { VariantProps } from 'tailwind-variants'

type TMain = TRootComponent & VariantProps<typeof mainTv>

export function Main({ children, overflow }: TMain) {
  const [isClientSide, setClientSide] = useState(false)

  useEffect(() => {
    setClientSide(true)
  }, [])

  return (
    <main className={mainTv({ overflow })}>
      <div
        id="overflow-search-helper"
        className="duration-500 fixed inset-0 pointer-events-none z-40"
      />
      {isClientSide && children}
    </main>
  )
}
