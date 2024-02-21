'use client'

import * as tv from '@features/profile/ProfileTV'
import { useProfileController } from '@features/profile/controller'
import { RightArrow } from '@shared/animations/animatedRightArrow'
import { Button, Text } from '@shared/components'

export function ProfileInfo() {
  const {
    userName,
    wordsCountText,
    wordCountersLoading,
    sessionCustomer,
    existeWrrdCount,
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
      <div className="justify-start">
        <Button.root variant="text">
          <Button.label
            label={existeWrrdCount ? 'Atualizar meta' : 'Estipular meta'}
          />
          <RightArrow />
        </Button.root>
      </div>
    </div>
  )
}
