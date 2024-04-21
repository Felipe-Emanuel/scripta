import { Text } from '@shared/components'

interface INewBookPathnameProps {
  showForm: boolean
}

export function NewBookPathname({ showForm }: INewBookPathnameProps) {
  return (
    <div
      className={`absolute -top-12 duration-200 z-30 ${showForm ? 'opacity-100 delay-500' : 'opacity-0 delay-200'}`}
    >
      <Text as="span" size="sm" color="gray" text="Você" />{' '}
      <Text as="span" size="md" color="white" text="/ Novo Livro" />
    </div>
  )
}
