'use client'

import { Text } from '@shared/components'
import { newBookPathnameTV } from '../NewBookTV'
import { useBook } from '@shared/hooks/contexts/useBook'

export function NewBookPathname() {
  const { showForm } = useBook()

  return (
    <div className={newBookPathnameTV({ showForm })}>
      <Text as="span" size="sm" color="gray" text="Você" />{' '}
      <Text as="span" size="md" color="white" text="/ Novo Livro" />
    </div>
  )
}
