'use client'

import { useFormContext } from 'react-hook-form'
import { getErrors } from '../InputUtils'
import { Text } from '@shared/components'

interface ErrorMessageProps {
  field: string
}

export function ErrorMessage({ field }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext()

  const fieldError = getErrors(errors, field)

  if (!fieldError) return null

  return (
    <Text
      as="span"
      weight="bold"
      color="error"
      size="xs"
      text={fieldError.message?.toString()}
    />
  )
}
