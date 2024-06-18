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
import React from 'react'
import { FormProvider } from 'react-hook-form'

import { BiTrash } from 'react-icons/bi'

import { Icon, Input, Text, Title } from '@shared/components'
import { useDragAndPasteImage } from '@shared/hooks/useDragAndPasteImage'
import { TBookResponse } from '@shared/types'
import { capitalizeName } from '@shared/utils/transformers'
import { formatNumber } from '@shared/utils/validation'
import { useBookController } from '@features/BookInformation/controller'
import { motionProps } from '@features/feedback/FeedbackUtils'
import * as tv from '@features/BookInformation/BookInformationTV'

interface IEditModalProps {
  isEditing: boolean
  book: TBookResponse
  toggleEditing: () => void
}

export function EditModal({ isEditing, book, toggleEditing }: IEditModalProps) {
  const { onOpenChange } = useDisclosure()
  const { isDragActive, image, getRootProps, onPaste, clearimage } = useDragAndPasteImage()
  const { editSchema, errors, isValid, handleSubmit, onSubmit } = useBookController(String(image))

  return (
    <Modal
      data-testid="edição-do-livro-selecionado"
      shadow="md"
      size="2xl"
      placement="center"
      backdrop="blur"
      isOpen={isEditing}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
      onClose={toggleEditing}
    >
      <ModalContent className={tv.editModalTV()}>
        {(onClose) => (
          <>
            <ModalHeader>
              <Title as="h3" title="Edição" size="md" color="white" />
            </ModalHeader>
            <FormProvider {...editSchema}>
              <ModalBody as="form" onSubmit={handleSubmit(onSubmit)} className={tv.modalBodyTV()}>
                <div className={tv.modalBodyHeroSideTV()}>
                  <div onPaste={onPaste} {...getRootProps()} className={tv.dragAndPasteTV()}>
                    {image && (
                      <Button
                        onClick={clearimage}
                        variant="light"
                        isIconOnly
                        className={tv.clearImageButtonTV()}
                      >
                        <Icon color="danger" icon={BiTrash} size="responsive" />
                      </Button>
                    )}

                    {isDragActive && (
                      <div className={tv.isDragingFallbackTV()}>
                        <Text text="Solte aqui" />
                      </div>
                    )}

                    {book.heroPathUrl && (
                      <Image
                        width={250}
                        height={400}
                        alt="Imagem de capa do livro"
                        src={String(image) || book.heroPathUrl}
                        className={tv.copyAndPasteHeroTV()}
                      />
                    )}
                  </div>

                  <div className={tv.inputsWrapperTV()}>
                    <Input.root>
                      <Input.label text="Título" htmlFor="title" />
                      <Input.field name="title" placeholder={book.title} />
                      <Input.error field="title" />
                    </Input.root>

                    <div className={tv.inputSideTV()}>
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

                    <div className={tv.inputSideTV()}>
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

                <div className={tv.inputDescriptionTV()}>
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
                  <Button color="danger" onPress={onClose}>
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
