import { Button } from '@nextui-org/react'
import { Icon } from '@shared/components'
import { useSidebar } from '@shared/hooks/contexts/useSidebar'
import { FaChevronDown } from 'react-icons/fa'
import { feedbackCloseButtonTV } from '../FeedbackTV'

export function FeedbackCloseButton() {
  const { closeFeedbackFocused } = useSidebar()

  return (
    <Button
      data-testid="close-feedback-button"
      onClick={closeFeedbackFocused}
      isIconOnly
      className={feedbackCloseButtonTV()}
      color="default"
      variant="bordered"
      radius="full"
    >
      <Icon icon={FaChevronDown} color="white" />
    </Button>
  )
}
