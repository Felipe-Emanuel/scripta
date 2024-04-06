import { TRootComponent } from '@shared/types'
import { FormHTMLAttributes, forwardRef } from 'react'

type FormProps = TRootComponent & FormHTMLAttributes<HTMLFormElement>

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ children, ...props }, formRef?) => {
    return (
      <form ref={formRef} {...props}>
        {children}
      </form>
    )
  },
)

Form.displayName = 'Form'
