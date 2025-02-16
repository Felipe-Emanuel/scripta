'use client'

import { useWordGoalsController } from '@features/wordGoals/controller'
import { RightArrow } from '@shared/animations/animatedRightArrow'
import { Button, Form, Input, Text } from '@shared/components'
import { FormProvider } from 'react-hook-form'
import * as tv from '@features/wordGoals/WordGoalsTV'

export function WordGoalsInfo() {
  const { goal, words, wordGoalsSchema, visibleState, toggleFormVisible, handleSubmit, onSubmit } =
    useWordGoalsController()

  return (
    <div className={tv.wordGoalsInfoWrapperTV()}>
      <div className={tv.wordGoalsInfoHeaderTV()}>
        <Text text="0%" align="center" color="gray" />
        <Text text={goal} align="center" weight="semi-bold" />
        <Text text="100%" align="center" color="gray" />
      </div>
      <div className={tv.wordGoalsInfoContentTV()}>
        {words && words > 0 ? (
          <Button.root
            disabled={!words}
            radius="full"
            color="primary"
            variant="light"
            onPress={toggleFormVisible}
            className="flex border-0"
            endContent={<RightArrow />}
          >
            <Button.label size="xs" text="Impor meta" />
          </Button.root>
        ) : (
          <></>
        )}
        <FormProvider {...wordGoalsSchema}>
          <Form onSubmit={handleSubmit(onSubmit)} data-testid="form-meta">
            <Input.root className={tv.wordGoalsInputRootTV({ visible: visibleState })}>
              <Input.field
                className={tv.wordGoalsInputFieldTV({ visible: visibleState })}
                min={100}
                name="goal"
                type="number"
              />
            </Input.root>
          </Form>
        </FormProvider>
      </div>
    </div>
  )
}
