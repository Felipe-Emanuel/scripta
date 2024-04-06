'use client'

import { Icon } from '@shared/components'
import { inputFieldTV } from '@shared/components/Input/InputTV'
import { ElementType, InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { VariantProps } from 'tailwind-variants'

type InputFieldProps = {
  name: string
  icon?: ElementType
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputFieldTV>

export function InputField({
  name,
  type,
  className,
  variant,
  icon,
  ...props
}: InputFieldProps) {
  const { register } = useFormContext()

  return (
    <div className="flex px-2 w-full items-center">
      {icon && <Icon icon={icon} color="gray" />}

      <input
        {...props}
        {...register(name)}
        id={name}
        type={type ?? name}
        className={inputFieldTV({ className, variant })}
      />
    </div>
  )
}
