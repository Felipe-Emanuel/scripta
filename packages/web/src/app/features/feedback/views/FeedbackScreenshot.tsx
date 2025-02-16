import { useSidebar } from '@shared/hooks/contexts/useSidebar'
import Image from 'next/image'
import { FaTrashAlt } from 'react-icons/fa'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@heroui/react'
import { motionProps } from '../FeedbackUtils'
import { Icon, Title } from '@shared/components'
import * as tv from '../FeedbackTV'

export function FeedbackScreenshot() {
  const { image, clearimage } = useSidebar()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  if (!image) return null

  return (
    <div className={tv.feedbackScreenshotTV()}>
      <div className={tv.feedbackScreenshotThumbWrapperTV()}>
        <Button
          data-testid="clear-feedback-thumb"
          isIconOnly
          onPress={clearimage}
          className={tv.feedbackScreenshotClearButtonTV()}
        >
          <Icon icon={FaTrashAlt} size="responsive" color="danger" />
        </Button>
        <Image
          data-testid="feedback-thumb"
          onClick={onOpen}
          alt="print do feedback do usuário"
          src={String(image)}
          fill
          className={tv.feedbackScreenshotThumbTV()}
          fetchPriority="low"
        />
      </div>
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
              <ModalHeader className={tv.feedbackModalHeaderTV()}>
                <Title as="h3" title="Imagem de apoio" size="md" color="white" />
              </ModalHeader>
              <ModalBody>
                <Image
                  alt="print do feedback do usuário"
                  src={String(image)}
                  width={500}
                  height={500}
                  className={tv.feedbackScreenshotModalThumbTV()}
                  fetchPriority="high"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose(), clearimage()
                  }}
                >
                  Limpar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
