import { Text } from '@shared/components'
import { newBookPathnameTV } from '../NewBookTV'

interface INewBookPathnameProps {
  showForm: boolean
}

export function NewBookPathname({ showForm }: INewBookPathnameProps) {
  return (
    <div className={newBookPathnameTV({ showForm })}>
      <Text as="span" size="sm" color="gray" text="Você" />{' '}
      <Text as="span" size="md" color="white" text="/ Novo Livro" />
    </div>
  )
}
