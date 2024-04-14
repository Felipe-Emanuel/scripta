'use client'

import { Chip } from '@nextui-org/react'
import { Text, Title } from '@shared/components'
import { useBookInformation } from '@shared/hooks/contexts/useBookInformation'
import { useUser } from '@shared/hooks/useUser'
import { capitalizeName } from '@shared/utils/transformers'

const maxDescriptionLength = 150

export function BookInformationHeader() {
  const { sessionCustomer } = useUser()
  const { selectedBook } = useBookInformation()

  if (!selectedBook) return null

  return (
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center justify-between w-[calc(100%-3rem)] h-2">
        <Title title={selectedBook?.title} as="h4" className="truncate" />
      </div>
      <span>
        <Text
          text={`${capitalizeName(selectedBook?.Gender ?? '')} /`}
          color="green-500"
          as="span"
        />{' '}
        <Text text={`${capitalizeName(selectedBook?.Theme ?? '')}`} color="gray" as="span" />
      </span>
      <Text
        text={`Olá, ${sessionCustomer?.name}, as informações do seu livro estão prontas!`}
        as="small"
        size="sm"
        className="hidden lg:flex"
      />
      <Text
        text={`${selectedBook?.description?.substring(0, maxDescriptionLength)}...`}
        as="small"
        size="xs"
        color="gray"
        className="w-full max-w-[680px]"
      />

      <div className="flex items-center gap-1">
        {selectedBook?.conclued && (
          <Chip size="sm" color="success" variant="bordered">
            Concluído
          </Chip>
        )}
        <Chip size="sm" color={selectedBook?.isActive ? 'secondary' : 'warning'} variant="bordered">
          {selectedBook?.isActive ? 'Público' : 'Oculto'}
        </Chip>
      </div>
    </div>
  )
}
