import { TRootComponent } from '@shared/types'
import { FormHTMLAttributes } from 'react'

type FormProps = TRootComponent & FormHTMLAttributes<HTMLFormElement>

export function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>
}
