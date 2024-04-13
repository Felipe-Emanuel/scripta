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
import { useEffect } from 'react'

interface IDeleteModalProps {
  isDeleting: boolean
  bookTitle: string
  toggleDeleting: () => void
}

export function DeleteModal({ isDeleting, bookTitle, toggleDeleting }: IDeleteModalProps) {
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
                text={`Você gostaria realmente de deletar o livro ${bookTitle}`}
                weight="bold"
              />
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
