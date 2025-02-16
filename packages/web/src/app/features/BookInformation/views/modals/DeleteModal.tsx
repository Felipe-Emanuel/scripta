'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@heroui/react"

import { motionProps } from '@features/feedback/FeedbackUtils'
import { Text, Title } from '@shared/components'
import { TBookResponse } from '@shared/types'

interface IDeleteModalProps {
  isDeleting: boolean
  book: TBookResponse
  toggleDeleting: VoidFunction
  handleDeleteBook: () => Promise<TBookResponse | undefined>
}

export function DeleteModal({
  isDeleting,
  book,
  toggleDeleting,
  handleDeleteBook
}: IDeleteModalProps) {
  const { onOpenChange } = useDisclosure()

  return (
    <Modal
      data-testid="feedback-thumb-modal"
      placement="center"
      shadow="md"
      size="md"
      backdrop="blur"
      isOpen={isDeleting}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
      onClose={toggleDeleting}
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
              <Button color="primary" onPress={onClose}>
                Melhor não...
              </Button>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose()
                  handleDeleteBook()
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
