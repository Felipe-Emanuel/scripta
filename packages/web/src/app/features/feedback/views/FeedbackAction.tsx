import { Button, Select, SelectItem, Textarea } from '@nextui-org/react'
import { feedbackTypes } from '../FeedbackUtils'
import { Icon, Text } from '@shared/components'
import { useSidebar } from '@shared/hooks/contexts/useSidebar'
import { useFeedbackController } from '../controller'
import { FiPaperclip } from 'react-icons/fi'
import { ErrorBoundary } from 'react-error-boundary'
import * as tv from '../FeedbackTV'
import { ErrorFallback } from '@shared/components/Error'

export function FeedbackAction() {
  const { sendFeedback } = useFeedbackController()
  const {
    type,
    firstValue,
    feedback,
    isDisabled,
    createFeedbackRequest,
    handleSelectionChange,
    setFeedback,
    handleFileChange,
    clearAll
  } = useSidebar()

  const handleFeedback = () => {
    sendFeedback(createFeedbackRequest, clearAll)
  }

  return (
    <div className={tv.feedbackActionTV()}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Select
          label="Tipo de feedback"
          selectionMode="single"
          placeholder="Escolha um tipo"
          selectedKeys={type}
          className="max-w-xs"
          onChange={handleSelectionChange}
        >
          {feedbackTypes.map((feedbackType) => (
            <SelectItem
              textValue={firstValue ?? 'seletor de tipo de feedback'}
              key={feedbackType.label}
              value={feedbackType.value}
            >
              <div className={tv.feedbackSelectTypeContentWrapperTV()}>
                <div className={tv.feedbackSelectTypeIconTV()}>
                  <Icon icon={feedbackType.icon} size="md" color="primary" />
                </div>
                <Text color="black" text={feedbackType.label} />
              </div>
            </SelectItem>
          ))}
        </Select>
      </ErrorBoundary>

      <div className="relative">
        <Textarea
          isRequired
          maxRows={3}
          label="Descrição"
          placeholder="Descreva seu feedback"
          value={feedback}
          onValueChange={setFeedback}
        />

        <div className={tv.feedbackSelectFileWrapperTV()}>
          <Icon icon={FiPaperclip} size="md" className="absolute" />
          <input
            type="file"
            accept=".png, .jpeg"
            className={tv.feedbackFileInputTV()}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <Button
        data-testid="submit-feedback"
        onClick={handleFeedback}
        disabled={isDisabled}
        fullWidth
        color="primary"
        className={tv.feedbackSubmitButtonTV()}
      >
        <Text text="Enviar" />
      </Button>
    </div>
  )
}
