'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@heroui/react'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { BiTrash } from 'react-icons/bi'

import { Icon, Input, Text, Title } from '@shared/components'
import { TBookResponse } from '@shared/types'
import { capitalizeName } from '@shared/utils/transformers'
import { useBookController } from '@features/BookInformation/controller'
import { motionProps } from '@features/feedback/FeedbackUtils'
import * as tv from '@features/BookInformation/BookInformationTV'

interface IEditModalProps {
  isEditing: boolean
  book: TBookResponse
  toggleEditing: VoidFunction
}

export function EditModal({ isEditing, book, toggleEditing }: IEditModalProps) {
  const { onOpenChange } = useDisclosure()

  const {
    editSchema,
    errors,
    isValid,
    handleSubmit,
    onSubmit,

    isDragActive,
    image,
    getRootProps,
    onPaste,
    clearimage
  } = useBookController()

  const [originalHeroPathUrl, setOriginalHeroPathUrl] = useState(book.heroPathUrl)
  const [imageUrl, setImageUrl] = useState(image || book.heroPathUrl)

  useEffect(() => {
    if (isEditing) {
      setOriginalHeroPathUrl(book.heroPathUrl)
      setImageUrl(image || book.heroPathUrl)
    }
  }, [isEditing, book.heroPathUrl, image])

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
                  <div
                    onPaste={onPaste}
                    {...getRootProps()}
                    className={tv.dragAndPasteTV({ hasImage: !book.heroPathUrl })}
                  >
                    {imageUrl ? (
                      <Image
                        width={250}
                        height={400}
                        alt="Imagem de capa do livro"
                        src={String(imageUrl)}
                        className={tv.copyAndPasteHeroTV()}
                        fetchPriority="low"
                      />
                    ) : (
                      <Text
                        text={
                          isDragActive
                            ? 'Solte aqui...'
                            : 'Dê mais personalidade para sua história arrastando bopa capa até aqui.'
                        }
                        align="center"
                        color="gray"
                      />
                    )}

                    {imageUrl && (
                      <Button
                        onPress={() => {
                          setImageUrl('')
                        }}
                        variant="light"
                        isIconOnly
                        className={tv.clearImageButtonTV()}
                      >
                        <Icon color="danger" icon={BiTrash} size="responsive" />
                      </Button>
                    )}
                    <Input.error field="heroPathUrl" />
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
                  <Button
                    color="danger"
                    onPress={() => {
                      setImageUrl(originalHeroPathUrl)
                      onClose()
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
