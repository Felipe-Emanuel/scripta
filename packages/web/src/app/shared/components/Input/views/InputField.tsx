'use client'

import { inputFieldTV } from '@shared/components/Input/InputTV'
import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

type InputFieldProps = {
  name: string
  placeholder: string
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export function InputField({
  name,
  type,
  placeholder,
  ...props
}: InputFieldProps) {
  const { register } = useFormContext()

  return (
    <input
      {...props}
      {...register(name)}
      id={name}
      type={type ?? name}
      placeholder={placeholder}
      className={inputFieldTV()}
    />
  )
}
