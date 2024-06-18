'use client'

import { Chip } from '@nextui-org/react'

import { Text, Title } from '@shared/components'
import { useBook } from '@shared/hooks/contexts/useBook'
import { useUser } from '@shared/hooks/useUser'
import { capitalizeName } from '@shared/utils/transformers'
import * as tv from '../BookInformationTV'

const maxDescriptionLength = 150

export function BookInformationHeader() {
  const { sessionCustomer } = useUser()
  const { selectedBook } = useBook()

  if (!selectedBook) return null

  return (
    <div className={tv.bookInformationHeaderWrapperTV()}>
      <Title title={selectedBook?.title} as="h4" className="truncate" />
      <span>
        <Text
          text={`${capitalizeName(selectedBook?.Gender ?? '')} /`}
          color="green-500"
          as="span"
        />{' '}
        <Text text={`${capitalizeName(selectedBook?.Theme ?? '')}`} color="gray" as="span" />
      </span>
      <Text
        text={`Olá, ${capitalizeName(sessionCustomer?.name)}, as informações do seu livro estão prontas!`}
        as="small"
        size="sm"
        className={tv.welcomeTV()}
      />
      <Text
        text={`${selectedBook?.description?.substring(0, maxDescriptionLength)}...`}
        as="small"
        size="xs"
        color="gray"
        className={tv.descriptionTV()}
      />

      <div className={tv.chipsWrapperTV()}>
        {selectedBook?.conclued && (
          <Chip
            data-testid="book-incofmation-header-chip"
            size="sm"
            color="secondary"
            variant="bordered"
          >
            Concluído
          </Chip>
        )}
        <Chip
          data-testid="book-incofmation-header-chip"
          color="secondary"
          size="sm"
          variant="bordered"
        >
          {selectedBook?.isActive ? 'Público' : 'Oculto'}
        </Chip>
      </div>
    </div>
  )
}
