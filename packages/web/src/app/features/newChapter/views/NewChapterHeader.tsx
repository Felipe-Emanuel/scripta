'use client'

import { Button, Input } from '@nextui-org/react'
import { FormProvider } from 'react-hook-form'

import { IoIosArrowRoundBack } from 'react-icons/io'

import { Input as OwnInput, Form, Icon, Text, Title } from '@shared/components'
import { useNewChapterController } from '../controller'

interface INewChapterHeaderProps {
  bookId: string
}

export function NewChapterHeader({ bookId }: INewChapterHeaderProps) {
  const { currentBook, isGettingBooks, newChapterSchema, goBack, register, write } =
    useNewChapterController(bookId)

  if (!currentBook || isGettingBooks) return <Text text="Carregando..." />

  return (
    <div className="w-[80%] py-4 pb-6 px-6 flex flex-col rounded-md m-auto bg-white/15 backdrop-blur-lg ring-1 ring-white/50 relative">
      <Text
        text="Você está criando um novo capítulo"
        size="xs"
        weight="light"
        color="gray"
        className="absolute bottom-1 right-2 pointer-events-none"
      />
      <div className="flex gap-2 items-center">
        <Button isIconOnly size="sm" onClick={goBack}>
          <Icon icon={IoIosArrowRoundBack} size="lg" />
        </Button>
        <Title size="lg" weight="bold" title={currentBook.title} />
      </div>
      <FormProvider {...newChapterSchema}>
        <Form className="relative">
          <Input
            {...register('chapterTitle')}
            type="text"
            onChange={write}
            variant="underlined"
            placeholder="Título do novo capítulo"
          />
          <OwnInput.error field="chapterTitle" />
        </Form>
      </FormProvider>
    </div>
  )
}
