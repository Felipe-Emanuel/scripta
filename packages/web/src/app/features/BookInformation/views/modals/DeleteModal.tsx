'use client'

import { motionProps } from '@features/feedback/FeedbackUtils'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { Text, Title } from '@shared/components'
import { TBookResponse } from '@shared/types'
import { useEffect } from 'react'

interface IDeleteModalProps {
  isDeleting: boolean
  book: TBookResponse
  toggleDeleting: () => void
  handleDeleteBook: () => Promise<TBookResponse | undefined>
}

export function DeleteModal({
  isDeleting,
  book,
  toggleDeleting,
  handleDeleteBook
}: IDeleteModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    isDeleting && onOpen()
  }, [isDeleting, onOpen])

  return (
    <Modal
      data-testid="feedback-thumb-modal"
      placement="center"
      shadow="md"
      size="md"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
    >
      <ModalContent className="bg-[#121214]">
        {(onClose) => (
          <>
            <ModalHeader>
              <Title as="h3" title="Atenção!" size="md" color="white" />
            </ModalHeader>
            <ModalBody>
              <Text
                text={`Você gostaria realmente de deletar o livro ${book.title}?`}
                weight="bold"
              />
              <Text text="Você não poderá desfazer esta ação." weight="light" color="gray" />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => {
                  onClose()
                  toggleDeleting()
                }}
              >
                Melhor não...
              </Button>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose()
                  handleDeleteBook()
                  toggleDeleting()
                }}
              >
                Acredito que sim...
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
