import { MdFormatListBulletedAdd } from 'react-icons/md'
import { IoMdInformationCircle } from 'react-icons/io'
import { MdFormatIndentDecrease } from 'react-icons/md'

import { Button, Tooltip } from '@nextui-org/react'

import { Icon, Text } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import { TCreateBookSchemaWithImage } from '../controller'
import { newBookTriggerIconDraftTV, newBookTriggerTV } from '../NewBookTV'
import { useBook } from '@shared/hooks/contexts/useBook'

export function NewBookTrigger() {
  const { handleToggleCreateBook, showForm } = useBook()
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')

  const triggerIcon = showForm ? MdFormatIndentDecrease : MdFormatListBulletedAdd
  const startContent = <Icon color="white" size="lg" icon={triggerIcon} />

  return (
    <Button
      className={newBookTriggerTV({ showForm })}
      onClick={handleToggleCreateBook}
      color="primary"
      variant="ghost"
      startContent={startContent}
    >
      {draft && (
        <Tooltip showArrow content="Você tem um rascunho salvo">
          <div className={newBookTriggerIconDraftTV()}>
            <Icon icon={IoMdInformationCircle} color="warning" />
          </div>
        </Tooltip>
      )}
      <Text text={showForm ? 'Esconder Formulário' : 'Novo Livro'} as="span" color="white" />
    </Button>
  )
}
