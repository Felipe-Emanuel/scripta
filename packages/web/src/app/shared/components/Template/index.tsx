import { templateTV } from '@shared/components/Template/TemplateTV'
import { TRootComponent } from '@shared/types'
import { CSSProperties } from 'react'
import { VariantProps } from 'tailwind-variants'

type TTemplateProps = { style?: CSSProperties; id?: string } & TRootComponent &
  VariantProps<typeof templateTV>

export function Template({ children, className, style, id, ...props }: TTemplateProps) {
  return (
    <div id={id} style={style} className={templateTV({ ...props, className })}>
      {children}
    </div>
  )
}
