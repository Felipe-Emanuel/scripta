'use client'

import { buttonsProvidersTV } from '@features/auth/AuthTV'
import { Button, Motion, Text } from '@shared/components'
import { useProvidersSession } from '@shared/hooks/useProvidersSession'
import { TArrayComponents } from '@shared/types'
import { BsGoogle } from 'react-icons/bs'

export const ProviderButtons = () => {
  const { logInWithProviders } = useProvidersSession()

  const components: TArrayComponents[] = [
    {
      id: 0,
      component: (
        <Button.root
          buttonStyle="provider"
          type="button"
          radius="full"
          onClick={() => logInWithProviders('google')}
        >
          <Button.icon icon={BsGoogle} color="white" />
          <Button.label text="Continuar com o Google" />
        </Button.root>
      ),
    },
  ]

  return (
    <>
      <div className={buttonsProvidersTV()}>
        <Motion components={components} />
      </div>
      <Text text="ou" align="center" className="pt-4" color="gray" />
    </>
  )
}
