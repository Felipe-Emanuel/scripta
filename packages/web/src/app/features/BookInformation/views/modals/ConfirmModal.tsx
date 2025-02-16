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

interface IDeleteModalProps {
  isConfirm: boolean
  ToggleConfirm: VoidFunction
  markAsConclued: VoidFunction
}

export function ConfirmModal({ isConfirm, ToggleConfirm, markAsConclued }: IDeleteModalProps) {
  const { onOpenChange } = useDisclosure()

  return (
    <Modal
      data-testid="feedback-thumb-modal"
      placement="center"
      shadow="md"
      size="md"
      backdrop="blur"
      isOpen={isConfirm}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
      onClose={ToggleConfirm}
    >
      <ModalContent className="bg-[#121214]">
        {(onClose) => (
          <>
            <ModalHeader>
              <Title as="h3" title="Atenção!" size="md" color="white" />
            </ModalHeader>
            <ModalBody>
              <Text text={`Seu último capítulo não está concluído`} weight="bold" />
              <Text
                text="Para criar um novo, é necessário a conclusão do capítulo anterior. Fazemos isso para te ajudar no controle de quantidade."
                weight="light"
                color="gray"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={markAsConclued}>
                Marcar como concluído
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Deixar para depois...
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
