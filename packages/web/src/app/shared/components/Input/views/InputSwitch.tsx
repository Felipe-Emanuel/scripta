'use client'

import { Switch, SwitchProps } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'

type InputSwitchProps = {
  name: string
} & SwitchProps

export function InputSwitch({ name, ...props }: InputSwitchProps) {
  const { register } = useFormContext()

  return <Switch {...register(name)} name={name} {...props} />
}
