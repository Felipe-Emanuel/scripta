'use client'

import { Button, Text } from '@shared/components'
import { useProvidersSession } from '@shared/hooks/useProvidersSession'
import { signOut } from 'next-auth/react'

export default function DashboardPage() {
  const { session } = useProvidersSession()
  return (
    <>
      <Text text="página de painel em construção" />
      <Text text={session?.user?.name} />
      <Button.root onClick={() => signOut()}>
        <Button.label label="sair" />
      </Button.root>
    </>
  )
}
