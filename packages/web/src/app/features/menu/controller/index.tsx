import { useProvidersSession } from '@shared/hooks/useProvidersSession'
import { useUser } from '@shared/hooks/useUser'
import { APP_ROUTES } from '@shared/utils/constants/app-routes'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { menuActions } from '../MenuUtils'
import { TMenuSearchDefaultItem } from '@shared/types'

export const useMenuController = () => {
  const { push } = useRouter()
  const { logOut } = useProvidersSession()
  const { sessionCustomer } = useUser()

  const [ref, setRef] = useState('')
  const [goTo, setGoTo] = useState({ x: 0, y: 0 })
  const [currentHelper, setCurrentHelper] = useState<TMenuSearchDefaultItem | null>(null)

  const updateRef = useCallback((value: string) => {
    setRef(value)
  }, [])

  const updateHelperStyles = useCallback(
    (addClass: boolean) => {
      const overflowSearchHelper = document.getElementById('overflow-search-helper')
      const aside = document.getElementById('aside')
      const el = document.getElementById(ref)

      if (overflowSearchHelper && aside) {
        if (addClass) {
          overflowSearchHelper.classList.add('bg-black/70', 'pointer-events-auto')
          aside.classList.add('pointer-events-none', 'z-0')
        } else {
          el?.classList.remove('z-40', 'brightness-105')
          overflowSearchHelper.classList.remove('bg-black/70', 'pointer-events-auto')
          aside.classList.remove('pointer-events-none', 'z-0')
        }
      }
    },
    [ref]
  )

  const highlightReference = useCallback(() => {
    const el = document.getElementById(ref)

    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' })

      el.classList.add('z-40', 'brightness-105')

      const position = el.getBoundingClientRect()
      setGoTo({ x: position.left, y: position.bottom - position.top })

      updateHelperStyles(true)
    }
  }, [ref, updateHelperStyles])

  const clearHelper = useCallback(() => {
    updateRef('')
    updateHelperStyles(false)
  }, [updateRef, updateHelperStyles])

  useEffect(() => {
    if (ref) {
      highlightReference()
    }
  }, [ref, highlightReference])

  const clearing = useCallback(() => {
    clearHelper()
    setCurrentHelper(null)
  }, [clearHelper])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearing()
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [clearing])

  const handleUserClick = () =>
    sessionCustomer?.email ? logOut() : push(APP_ROUTES.public.auth.name)

  const actions = menuActions({
    isAuthenticated: !!sessionCustomer?.email,
    handleNotificationClick: () => console.log('Notificação'),
    handleSettingsClick: () => console.log('Configs'),
    handleUserClick
  })

  return {
    goTo,
    ref,
    actions,
    currentHelper,
    updateRef,
    clearHelper,
    setCurrentHelper,
    clearing
  }
}
