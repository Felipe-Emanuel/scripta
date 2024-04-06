'use client'

import { Title } from '@shared/components'
import { ErrorBoundaryHandler } from 'next/dist/client/components/error-boundary'
import { useEffect } from 'react'

export default function Error(error: ErrorBoundaryHandler) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      error.reset()
    }, 5000)

    return () => clearTimeout(timeout)
  }, [error])

  return (
    <>
      <Title title="Algo de errado conteceu" />
    </>
  )
}
