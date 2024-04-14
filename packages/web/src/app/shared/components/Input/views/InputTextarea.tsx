'use client'

import { Textarea, TextAreaProps } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'

type InputTextareaProps = {
  name: string
} & TextAreaProps

export function InputTextarea({ name, ...props }: InputTextareaProps) {
  const { register } = useFormContext()

  return <Textarea {...register(name)} name={name} {...props} />
}
