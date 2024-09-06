import Image from 'next/image'

import feedback from '@assets/images/feedback.png'

import { TRootComponent } from '@shared/types'
import { useSidebar } from '@shared/hooks/contexts/useSidebar'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { motionProps } from '../FeedbackUtils'
import { Text, Title } from '@shared/components'
import { useEffect } from 'react'
import * as tv from '../FeedbackTV'

export function FeedbackRoot({ children }: TRootComponent) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isFeedbackOnFocus,
    isDragActive,
    image,
    changeImageAlert,
    toggleFeedbackFocused,
    getRootProps,
    clearimage,
    setChangeImageAlert,
    onPaste
  } = useSidebar()

  const withImage = image !== '' && isFeedbackOnFocus

  useEffect(() => {
    changeImageAlert && onOpen()
  }, [changeImageAlert, onOpen])

  return (
    <div
      onPaste={onPaste}
      {...getRootProps()}
      onClick={() => (isFeedbackOnFocus ? {} : toggleFeedbackFocused())}
      id="feedback-sender"
      className={tv.feedbackRootTV({ isDragActive, isFeedbackOnFocus, withImage })}
    >
      <Image
        fill
        alt="imagem de fundo do feedback"
        src={feedback}
        className={tv.feedbackBackgroundTV()}
        fetchPriority="low"
      />

      <Modal
        data-testid="warning-clear-feedback-image-modal"
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
              <ModalHeader className={tv.feedbackModalHeaderTV()}>
                <Title as="h3" title="Atenção!" size="md" color="white" />
              </ModalHeader>
              <ModalBody>
                <Text text="Você já tem uma imagem para envio. Deseja limpar o campo?" />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose(), setChangeImageAlert(false)
                  }}
                >
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose(), clearimage()
                  }}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {children}
    </div>
  )
}
