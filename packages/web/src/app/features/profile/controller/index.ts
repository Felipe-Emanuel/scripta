import { getCurrentGoal } from '@features/profile/services'
import { useQueryData } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import { capitalizeName } from '@shared/utils/transformers'
import { useCallback, useEffect } from 'react'

export const useProfileController = () => {
  const { sessionCustomer } = useUser()

  const getGoal = useCallback(async () => {
    if (sessionCustomer) {
      const current = await getCurrentGoal(sessionCustomer.email)

      return current
    }
  }, [sessionCustomer])

  const {
    data: currentGoal,
    isLoading: currentGoalLoading,
    refetch
  } = useQueryData({
    getDataFn: getGoal,
    cacheName: 'currentGoal',
    cacheTime: '12-hours'
  })

  useEffect(() => {
    if (sessionCustomer?.email && !currentGoal?.words) refetch()
  }, [refetch, sessionCustomer?.email, currentGoal?.words])

  const wordsCount = currentGoal?.words || 0

  const wordsCountText =
    wordsCount > 0
      ? `Hoje você escreveu ${wordsCount} palavras.`
      : 'Você ainda não escreveu nenhuma palavra hoje!'

  const userName = capitalizeName(sessionCustomer?.name?.split(' ')[0] ?? '')

  return {
    userName,
    wordsCountText,
    currentGoalLoading,
    sessionCustomer,
    currentGoal
  }
}
