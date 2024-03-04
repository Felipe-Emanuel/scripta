'use client'

import {
  wordGoalsInputFieldTV,
  wordGoalsInputRootTV,
} from '@features/wordGoals/WordGoalsTV'
import { useWordGoalsController } from '@features/wordGoals/controller'
import { RightArrow } from '@shared/animations/animatedRightArrow'
import { Button, Form, Input, Text } from '@shared/components'
import { FormProvider } from 'react-hook-form'

export function WordGoalsInfo() {
  const {
    goal,
    words,
    wordGoalsSchema,
    visibleState,
    toggleFormVisible,
    handleSubmit,
    onSubmit,
  } = useWordGoalsController()

  return (
    <div className="flex flex-col gap-4 bg-primary-background rounded-xl p-2 opacity-90 w-full h-16">
      <div className="flex justify-between items-center w-[90%] m-auto">
        <Text text="0%" align="center" color="gray" />
        <Text text={goal} align="center" weight="semi-bold" />
        <Text text="100%" align="center" color="gray" />
      </div>
      <div className="flex justify-between items-center w-[90%] m-auto h-8">
        {words && (
          <Button.root
            disabled={!words}
            variant="text"
            onClick={toggleFormVisible}
          >
            <Button.label size="xs" text="Impor meta" />
            <RightArrow />
          </Button.root>
        )}
        <FormProvider {...wordGoalsSchema}>
          <Form onSubmit={handleSubmit(onSubmit)} data-testid="form-meta">
            <Input.root
              className={wordGoalsInputRootTV({ visible: visibleState })}
            >
              <Input.field
                className={wordGoalsInputFieldTV({ visible: visibleState })}
                min={100}
                name="wordGoals"
                type="number"
              />
            </Input.root>
          </Form>
        </FormProvider>
      </div>
    </div>
  )
}
