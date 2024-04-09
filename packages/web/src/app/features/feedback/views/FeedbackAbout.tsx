import { MdFeedback } from 'react-icons/md'
import { Icon, Text } from '@shared/components'
import { useSidebar } from '@shared/hooks/contexts/useSidebar'
import { Tooltip } from '@nextui-org/react'
import { feedbackAboutIconContentTV, feedbackAboutTV } from '../FeedbackTV'

export function FeedbackAbout() {
  const { isFeedbackOnFocus } = useSidebar()

  const iconContent = (
    <div className={feedbackAboutIconContentTV()}>
      <Icon icon={MdFeedback} size="lg" className="z-10" color="primary" />
    </div>
  )

  return (
    <div className={feedbackAboutTV()}>
      {isFeedbackOnFocus ? (
        iconContent
      ) : (
        <Tooltip showArrow content="Feedback">
          {iconContent}
        </Tooltip>
      )}
      {isFeedbackOnFocus && (
        <>
          <Text text="Fornecer feedback" weight="bold" size="sm" className="z-10 truncate" />
          <Text
            text="Ajude a melhorar a plataforma"
            weight="light"
            size="xs"
            className="z-10 truncate"
          />
        </>
      )}
    </div>
  )
}
