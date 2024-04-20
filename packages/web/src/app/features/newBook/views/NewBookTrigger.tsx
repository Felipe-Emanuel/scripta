import { MdFormatListBulletedAdd } from 'react-icons/md'
import { IoMdInformationCircle } from 'react-icons/io'

import { Button, Tooltip } from '@nextui-org/react'

import { Icon, Text } from '@shared/components'
import { TCreateBookSchemaWithImage } from '../controller'
import { useDraft } from '@shared/hooks/useDraft'

interface INewBookTriggerProps {
  handleToggleCreateBook: () => void
}

export function NewBookTrigger({ handleToggleCreateBook }: INewBookTriggerProps) {
  const { draft } = useDraft<TCreateBookSchemaWithImage>('newBook')
  const startContent = <Icon color="white" size="lg" icon={MdFormatListBulletedAdd} />

  return (
    <Button
      className="z-30 relative"
      onClick={handleToggleCreateBook}
      color="primary"
      variant="ghost"
      startContent={startContent}
    >
      {draft && (
        <Tooltip showArrow content="Você tem um rascunho salvo">
          <div className="absolute top-0 right-0">
            <Icon icon={IoMdInformationCircle} color="warning" />
          </div>
        </Tooltip>
      )}
      <Text text="Novo Livro" as="span" color="white" />
    </Button>
  )
}
