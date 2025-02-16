import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react"
import { TToggleConfirmModal } from '../../controllers/useChapterOptionsController'
import { motionProps } from '../../../feedback/FeedbackUtils'
import { Text, Title } from '@shared/components'

interface IConfirmModalProps {
  isOpen: boolean
  where: TToggleConfirmModal
  subtitle: string
  explication: string
  concluedText: string
  toggleConfirmModal: (where: TToggleConfirmModal) => void
  callback: VoidFunction
}

export function ConfirmModal({
  isOpen,
  where,
  explication,
  subtitle,
  concluedText,
  toggleConfirmModal,
  callback
}: IConfirmModalProps) {
  const { onOpenChange } = useDisclosure()

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
      onClose={() => toggleConfirmModal(where)}
    >
      <ModalContent className="bg-[#121214]">
        {(onClose) => (
          <>
            <ModalHeader>
              <Title as="h3" title="Atenção!" size="md" color="white" />
            </ModalHeader>
            <ModalBody>
              <Text text={subtitle} weight="bold" />
              <Text text={explication} weight="light" color="gray" />
            </ModalBody>
            <ModalFooter>
              <Button color={where === 'conclued' ? 'primary' : 'danger'} onPress={callback}>
                {where === 'conclued' ? `${concluedText}` : 'Excluir Capítulo'}
              </Button>
              <Button
                color={where === 'conclued' ? 'danger' : 'primary'}
                variant="light"
                onPress={onClose}
              >
                {where === 'conclued' ? 'Deixar para depois...' : 'Agora não...'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
