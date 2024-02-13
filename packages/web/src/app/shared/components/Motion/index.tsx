'use client'

import { TArrayComponents } from '@shared/types'
import { AnimationProps, motion } from 'framer-motion'

type TMotion = {
  components: TArrayComponents[]
  className?: string
} & AnimationProps

export function Motion({ components, className, ...props }: TMotion) {
  const baseDelay = 0.1

  return components.map((item, i) => {
    const delay = baseDelay + i * 0.2

    return (
      <motion.div
        className={className}
        key={item.id}
        {...props}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {item.component}
      </motion.div>
    )
  })
}
