import { rootButtonTv } from '@shared/components/Button/ButtonTV'
import { TRootComponent } from '@shared/types'
import { HTMLAttributes } from 'react'

type IButtonRoot = TRootComponent & HTMLAttributes<HTMLButtonElement>

export function ButtonRoot({ children, ...proos }: IButtonRoot) {
  return (
    <button className={rootButtonTv()} {...proos}>
      {children}
    </button>
  )
}
