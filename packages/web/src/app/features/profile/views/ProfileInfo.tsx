'use client'

import * as tv from '@features/profile/ProfileTV'
import { useProfileController } from '@features/profile/controller'
import { RightArrow } from '@shared/animations/animatedRightArrow'
import { Button, Text } from '@shared/components'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'

export function ProfileInfo() {
  const { push } = useRouter()
  const { userName, wordsCountText, currentGoalLoading, sessionCustomer, currentGoal } =
    useProfileController()

  if (currentGoalLoading || !sessionCustomer) return null

  return (
    <div className={tv.profileInfoWrapperTV()}>
      <div className={tv.profileInfoHeaderTV()}>
        <div>
          <Text text="Bem vindo," size="sm" color="gray" weight="normal" />
          <Text data-testid="profile-name" text={userName} size="lg" color="white" weight="bold" />
        </div>

        <div>
          <Text
            text="Bom ter você aqui!"
            size="md"
            color="gray"
            className={tv.profileleInfoWelcomeTV()}
            weight="light"
          />

          {currentGoal ? (
            <Text
              data-testid="words-count-text"
              text={wordsCountText}
              size="sm"
              color="white"
              weight="normal"
            />
          ) : (
            <Text
              text="Você ainda não escreveu nenhuma palavra"
              size="sm"
              color="white"
              weight="normal"
            />
          )}
        </div>
      </div>
      <div className={tv.profileleInfoFormWrapperTV()}>
        <Button.root
          radius="full"
          color="primary"
          variant="light"
          onPress={() => push(APP_ROUTES.private.books.name)}
          endContent={<RightArrow />}
        >
          <Button.label size="xs" text="Acessar livros" />
        </Button.root>
      </div>
    </div>
  )
}
