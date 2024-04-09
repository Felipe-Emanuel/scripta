'use client'

import { useErrorBoundary } from 'react-error-boundary'
import { Text } from '..'
import { Button } from '@nextui-org/react'
import { errorTV } from './ErrorTV'

export function ErrorFallback() {
  const { resetBoundary } = useErrorBoundary()

  return (
    <div role="alert" className={errorTV()}>
      <Text text="Algo inesperado aconteceu" size="sm" />
      <Text text="Por favor, reporte o problema" size="xs" as="b" />
      <Button size="sm" onClick={resetBoundary}>
        <Text text="Tentar novamente" size="xs" />
      </Button>
    </div>
  )
}
