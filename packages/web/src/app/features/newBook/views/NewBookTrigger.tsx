import { MdFormatListBulletedAdd } from 'react-icons/md'
import { IoMdInformationCircle } from 'react-icons/io'

import { Button, Tooltip } from '@nextui-org/react'

import { Icon, Text } from '@shared/components'
import { useDraft } from '@shared/hooks/useDraft'
import { TCreateBookSchemaWithImage } from '../controller'
import { newBookTriggerIconDraftTV, newBookTriggerTV } from '../NewBookTV'

interface INewBookTriggerProps {
  handleToggleCreateBook: () => void
}

export function NewBookTrigger({ handleToggleCreateBook }: INewBookTriggerProps) {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')
  const startContent = <Icon color="white" size="lg" icon={MdFormatListBulletedAdd} />

  return (
    <Button
      className={newBookTriggerTV()}
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
      <Text text="Novo Livro" as="span" color="white" />
    </Button>
  )
}
