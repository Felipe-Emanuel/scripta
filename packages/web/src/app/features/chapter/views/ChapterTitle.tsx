'use client'

import { Input } from "@heroui/react"

import { MdOutlineTitle } from 'react-icons/md'
import { Icon } from '@shared/components'
import { FormProvider } from 'react-hook-form'
import { useChapterTitleController } from '../controllers/useChapterTitleController'

interface IChapterTitleProps {
  title?: string
}

export function ChapterTitle({ title }: IChapterTitleProps) {
  const { debouncedUpdateTitle, register, schema, isEditing } = useChapterTitleController()

  if (!isEditing) return null

  return (
    <div className="w-full pb-2 flex items-center justify-center">
      <FormProvider {...schema}>
        <Input
          {...register('title')}
          aria-label="Input com o título do livro"
          isClearable
          defaultValue={title}
          classNames={{
            base: 'w-full sm:max-w-[44%] text-white'
          }}
          placeholder="Dê um nome ao capítulo"
          size="sm"
          startContent={<Icon icon={MdOutlineTitle} color="gray" />}
          variant="underlined"
          color="secondary"
          onValueChange={debouncedUpdateTitle}
        />
      </FormProvider>
    </div>
  )
}
