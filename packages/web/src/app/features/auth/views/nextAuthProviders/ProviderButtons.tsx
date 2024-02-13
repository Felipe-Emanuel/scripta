'use client'

import { buttonsProvidersTV } from '@features/auth/AuthTV'
import { Button, Motion, Text } from '@shared/components'
import { useProvidersSession } from '@shared/hooks/useProvidersSession'
import { TArrayComponents } from '@shared/types'
import { BsGoogle, BsFacebook } from 'react-icons/bs'

const id = 0

export const ProviderButtons = () => {
  const { logInWithProviders } = useProvidersSession()

  const components: TArrayComponents[] = [
    {
      id,
      component: (
        <Button.root
          variant="provider"
          type="button"
          onClick={() => logInWithProviders('google')}
        >
          <Button.icon icon={BsGoogle} color="white" />
        </Button.root>
      ),
    },
    {
      id,
      component: (
        <Button.root
          variant="provider"
          type="button"
          onClick={() => logInWithProviders('facebook')}
        >
          <Button.icon icon={BsFacebook} color="white" />
        </Button.root>
      ),
    },
  ]

  return (
    <>
      <div className={buttonsProvidersTV()}>
        <Motion components={components} />
      </div>
      <Text text="ou" align="center" className="pt-8" color="gray" />
    </>
  )
}
