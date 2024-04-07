'use client'

import { Readers } from '@features/readers'
import { useReadersController } from '../controllers/useReadersController'
import { ErrorBoundary } from 'react-error-boundary'
import { Text } from '@shared/components'

export function DashboardReaders() {
  const { coordinates, readerDetailsProps, bookDetilProps, seeReader } = useReadersController()

  return (
    <ErrorBoundary
      onReset={(details) => {
        console.log(details.reason)
      }}
      fallback={<Text align="center" text="Algo errado aconteceu" />}
    >
      <Readers.root>
        {/* <Readers.map coordinates={coordinates} seeReader={seeReader} /> */}
        <Readers.details {...readerDetailsProps} />
        <Readers.bookDetil {...bookDetilProps} />
      </Readers.root>
    </ErrorBoundary>
  )
}
