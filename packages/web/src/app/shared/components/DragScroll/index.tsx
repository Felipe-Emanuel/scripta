'use client'

import { memo, useEffect, useRef, useState } from 'react'

import { useDraggable } from 'react-use-draggable-scroll'

import { TRootComponent } from '@shared/types'
import { FallbackComp } from './FallbackComp'
import { dragScrollTV } from './DragScrollTV'

const DragScroll = ({ children }: TRootComponent) => {
  const [isClient, setIsClient] = useState(false)

  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
    isMounted: isClient
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const skelletons = Array.of({ length: 4 }).map((_, index) => <FallbackComp key={index} />)

  if (!isClient) return <div className="flex space-x-4">{skelletons}</div>

  return (
    <div className={dragScrollTV()} {...events} ref={ref}>
      {children}
    </div>
  )
}

export default memo(DragScroll)
