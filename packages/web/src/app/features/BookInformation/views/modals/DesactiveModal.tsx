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
import { TBookResponse, TPatchActiveBookRequest } from '@shared/types'

interface IDesactiveModalProps {
  isDesactiving: boolean
  book: TBookResponse
  toggleDesactiving: () => void
  handleDesactiveBook: (
    where: TPatchActiveBookRequest['where']
  ) => Promise<TBookResponse | undefined>
}

export function DesactiveModal({
  isDesactiving,
  book,
  toggleDesactiving,
  handleDesactiveBook
}: IDesactiveModalProps) {
  const { onOpenChange } = useDisclosure()

  return (
    <Modal
      data-testid="feedback-thumb-modal"
      placement="center"
      shadow="md"
      size="md"
      backdrop="blur"
      isOpen={isDesactiving}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
      onClose={toggleDesactiving}
    >
      <ModalContent className="bg-[#121214]">
        {(onClose) => (
          <>
            <ModalHeader>
              <Title
                as="h3"
                title={book.isActive ? 'Ocultação!' : 'Desocultação!'}
                size="md"
                color="white"
              />
            </ModalHeader>
            <ModalBody>
              <Text
                text={
                  book.isActive
                    ? `Você gostaria realmente de ocultar o livro ${book.title}?`
                    : `Você gostaria realmente de tornar o livro ${book.title} público?`
                }
                weight="bold"
              />
              <Text
                text={`Você poderá torná-lo ${book.isActive ? 'público' : 'oculto'} novamente quando quiser.`}
                weight="light"
                color="gray"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Por hora não...
              </Button>
              <Button
                color={book.isActive ? 'warning' : 'success'}
                variant="light"
                onPress={() => {
                  handleDesactiveBook('isActive')
                  onClose()
                }}
              >
                {book.isActive ? 'Por enquanto...' : 'Sim, gostaria!'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
