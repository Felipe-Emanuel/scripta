'use client'

import { Button, Text } from '@shared/components'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useRouter } from 'next/navigation'

export default function ClientContent() {
  const { push } = useRouter()

  const handleAuthNavigation = () => push(APP_ROUTES.public.auth.name)

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      <Text text="página de novos construção" />
      <Button.root onClick={handleAuthNavigation}>
        <Button.label text="Ir para autenticação" />
      </Button.root>
    </div>
  )
}
