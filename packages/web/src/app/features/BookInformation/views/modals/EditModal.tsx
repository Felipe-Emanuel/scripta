'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'

import Image from 'next/image'
import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { BiTrash } from 'react-icons/bi'

import { useBookInformationController } from '@features/BookInformation/controller'
import { motionProps } from '@features/feedback/FeedbackUtils'
import { Icon, Input, Text, Title } from '@shared/components'
import { useDragAndPasteImage } from '@shared/hooks/useDragAndPasteImage'
import { TBookResponse } from '@shared/types'
import { capitalizeName } from '@shared/utils/transformers'
import { formatNumber } from '@shared/utils/validation'

interface IEditModalProps {
  isEditing: boolean
  book: TBookResponse
  toggleEditing: () => void
}

export function EditModal({ isEditing, book, toggleEditing }: IEditModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isDragActive, image, getRootProps, onPaste, clearimage } = useDragAndPasteImage()
  const { editSchema, errors, isValid, handleSubmit, onSubmit } = useBookInformationController(
    String(image)
  )

  useEffect(() => {
    isEditing && onOpen()
  }, [isEditing, onOpen])

  return (
    <Modal
      data-testid="edição-do-livro-selecionado"
      shadow="md"
      size="2xl"
      placement="center"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
    >
      <ModalContent className="bg-[#121214] max-[280px]:overflow-y-scroll max-[280px]:h-screen scrollbar-hide">
        {(onClose) => (
          <>
            <ModalHeader>
              <Title as="h3" title="Edição" size="md" color="white" />
            </ModalHeader>
            <FormProvider {...editSchema}>
              <ModalBody
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="flex max-[280px]:flex-col gap-4 w-full items-center ">
                  <div
                    onPaste={onPaste}
                    {...getRootProps()}
                    className="relative w-44 flex items-center justify-center cursor-pointer"
                  >
                    {image && (
                      <Button
                        onClick={clearimage}
                        variant="light"
                        isIconOnly
                        className="absolute top-1 right-1"
                      >
                        <Icon color="danger" icon={BiTrash} size="responsive" />
                      </Button>
                    )}

                    {isDragActive && (
                      <div className="absolute inset-0 p-2 flex items-center justify-center bg-black/50">
                        <Text text="Solte aqui" />
                      </div>
                    )}

                    {book.heroPathUrl && (
                      <Image
                        width={250}
                        height={400}
                        alt="Imagem de capa do livro"
                        src={String(image) || book.heroPathUrl}
                        className="flex-shrink-0 rounded-2xl bg-cover h-44 w-32 size-full"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <Input.root>
                      <Input.label text="Título" htmlFor="title" />
                      <Input.field name="title" placeholder={book.title} />
                      <Input.error field="title" />
                    </Input.root>

                    <div className="flex gap-4 w-full">
                      <Input.root>
                        <Input.label text="Gênero" htmlFor="gender" />
                        <Input.field name="gender" placeholder={capitalizeName(book.Gender)} />
                        <Input.error field="gender" />
                      </Input.root>

                      <Input.root>
                        <Input.label text="Tema" htmlFor="theme" />
                        <Input.field name="theme" placeholder={capitalizeName(book.Theme)} />
                        <Input.error field="theme" />
                      </Input.root>
                    </div>

                    <div className="flex gap-4 w-full">
                      <Input.root>
                        <Input.label text="Link de publicação" htmlFor="publishedUrl" />
                        <Input.field name="publishedUrl" placeholder={book.publishedUrl} />
                        <Input.error field="publishedUrl" />
                      </Input.root>

                      <Input.root>
                        <Input.label text="Total de palavras" htmlFor="totalWords" />
                        <Input.field
                          min={0}
                          type="number"
                          name="totalWords"
                          placeholder={String(formatNumber(book.totalWords))}
                        />
                        <Input.error field="totalWords" />
                      </Input.root>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Input.label text="Descrição" htmlFor="description" />
                  <Input.textarea
                    isInvalid={!!errors.description}
                    name="description"
                    variant="bordered"
                    placeholder={book.description}
                    defaultValue={book.description}
                    className="text-white"
                    errorMessage={errors.description?.message}
                  />
                </div>

                <ModalFooter>
                  <Button
                    color="danger"
                    onPress={() => {
                      onClose()
                      toggleEditing()
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="solid"
                    onPress={() => {
                      if (!isValid) {
                        return
                      }

                      onClose()
                      toggleEditing()
                      clearimage()
                    }}
                  >
                    Concluir
                  </Button>
                </ModalFooter>
              </ModalBody>
            </FormProvider>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
