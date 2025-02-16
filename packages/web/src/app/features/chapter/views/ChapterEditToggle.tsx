'use client'

import { Button, Switch } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'

import { Icon, Text } from '@shared/components'
import { useToggleController } from '../controllers/useToggleController'
import { queryClient } from '@shared/services/reactQuery'
import { cacheName } from '@shared/utils/constants/cacheName'
import { useBook } from '@hooks/contexts/useBook'

export function ChapterEditToggle() {
  const { clearSelectedBook } = useBook()
  const { back } = useRouter()
  const { isEditing, toggleIsEditing } = useToggleController()

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          onPress={() => {
            clearSelectedBook()
            back()
            queryClient.invalidateQueries({
              queryKey: [cacheName.allBooks]
            })
          }}
          isIconOnly
          size="sm"
          variant="faded"
        >
          <Icon icon={IoArrowBackOutline} />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Text text={!isEditing ? 'Pré visualização' : 'Editar'} size="xs" color="gray" />
        <Switch
          id="previewer-active-root"
          color="primary"
          size="sm"
          isSelected={isEditing}
          onValueChange={toggleIsEditing}
        />
      </div>
    </div>
  )
}
