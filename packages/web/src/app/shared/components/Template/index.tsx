import { templateTV } from '@shared/components/Template/TemplateTV'
import { TRootComponent } from '@shared/types'
import { VariantProps } from 'tailwind-variants'

type TTemplateProps = { className?: string } & TRootComponent &
  VariantProps<typeof templateTV>

export function Template({ children, className, ...props }: TTemplateProps) {
  return <div className={templateTV({ ...props, className })}>{children}</div>
}
