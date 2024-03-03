'use client'

import * as tv from '@features/profile/ProfileTV'
import { useProfileController } from '@features/profile/controller'
import { RightArrow } from '@shared/animations/animatedRightArrow'
import { Button, Form, Input, Text } from '@shared/components'
import { FormProvider } from 'react-hook-form'

export function ProfileInfo() {
  const {
    userName,
    wordsCountText,
    wordCountersLoading,
    sessionCustomer,
    existeWrrdCount,
    wordCountSchema,
    visibleState,
    toggleFormVisible,
    handleSubmit,
    onSubmit,
  } = useProfileController()

  if (wordCountersLoading || !sessionCustomer) return null

  return (
    <div className={tv.profileInfoWrapperTV()}>
      <div className={tv.profileInfoHeaderTV()}>
        <div>
          <Text text="Bem vindo," size="sm" color="gray" weight="normal" />
          <Text text={userName} size="lg" color="white" weight="bold" />
        </div>

        <div>
          <Text
            text="Bom ter você aqui!"
            size="md"
            color="gray"
            className={tv.profileleInfoWelcomeTV()}
            weight="light"
          />

          {existeWrrdCount ? (
            <Text
              text={wordsCountText}
              size="sm"
              color="white"
              weight="normal"
            />
          ) : (
            <Text
              text="Você ainda não estipulou nenhuma meta"
              size="sm"
              color="white"
              weight="normal"
            />
          )}
        </div>
      </div>
      <div className={tv.profileleInfoFormWrapperTV({ visible: visibleState })}>
        <Button.root variant="text" onClick={toggleFormVisible}>
          <Button.label
            size="xs"
            text={existeWrrdCount ? 'Atualizar meta' : 'Estipular meta'}
          />
          <RightArrow />
        </Button.root>
        <FormProvider {...wordCountSchema}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input.root
              className={tv.profileleInfoInputRootTV({ visible: visibleState })}
            >
              <Input.field
                min={100}
                name="wordCount"
                type="number"
                className={tv.profileleInfoInputFieldTV({
                  visible: visibleState,
                })}
              />
            </Input.root>
          </Form>
        </FormProvider>
      </div>
    </div>
  )
}
