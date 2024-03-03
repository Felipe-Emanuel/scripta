'use client'

import { inputFieldTV } from '@shared/components/Input/InputTV'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

type InputFieldProps = {
  name: string
} & InputHTMLAttributes<HTMLInputElement>

export function InputField({
  name,
  type,
  className,
  ...props
}: InputFieldProps) {
  const { register } = useFormContext()

  return (
    <input
      {...props}
      {...register(name)}
      id={name}
      type={type ?? name}
      className={inputFieldTV({ className })}
    />
  )
}
