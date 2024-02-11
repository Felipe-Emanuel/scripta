import { mainTv } from '@shared/components/Main/MainTV'
import { TRootComponent } from '@shared/types'
import { VariantProps } from 'tailwind-variants'

type TMain = TRootComponent & VariantProps<typeof mainTv>

export function Main({ children, overflow }: TMain) {
  return <main className={mainTv({ overflow })}>{children}</main>
}
