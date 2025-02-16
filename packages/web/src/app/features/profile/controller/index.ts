import { TUpdateWordCountSchema, updateWordCountSchema } from '@features/profile/ProfileUtils'
import { updateCurrentGoal, getCurrentGoal } from '@features/profile/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryData, useQueryMutation } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import { TGoalResponse, TUpdateCurrentGoalRequest } from '@shared/types'
import { capitalizeName } from '@shared/utils/transformers'
import { progressGoal } from '@shared/utils/validation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { queryClient } from '~/src/app/shared/services/reactQuery'
import { cacheName } from '~/src/app/shared/utils/constants/cacheName'

export const useProfileController = () => {
  const { sessionCustomer } = useUser()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

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

  const wordCountSchema = useForm<TUpdateWordCountSchema>({
    resolver: zodResolver(updateWordCountSchema),
    defaultValues: {
      wordCount: currentGoal?.words || 100
    }
  })

  const { handleSubmit, setValue } = wordCountSchema

  const { mutateAsync } = useQueryMutation<TGoalResponse, TUpdateCurrentGoalRequest>({
    mutationFn: updateCurrentGoal,
    cacheName: 'currentGoal',
    variablePath: 'updatedGoal'
  })

  const onSubmit = async (data: TUpdateWordCountSchema) => {
    if (currentGoal) {
      const goalComplete = progressGoal(data.wordCount, currentGoal?.goal)

      const createWordCountRequest: TUpdateCurrentGoalRequest = {
        goalId: currentGoal?.id,
        updatedGoal: {
          ...currentGoal,
          words: data.wordCount,
          goalComplete: goalComplete >= 100
        }
      }

      await mutateAsync(createWordCountRequest)
      queryClient.invalidateQueries({
        queryKey: [cacheName.goalsByFilter]
      })
    }

    setValue('wordCount', data?.wordCount)
    toggleFormVisible()
  }

  const visibleState: 'visible' | 'hidden' | undefined = isFormVisible ? 'visible' : 'hidden'

  return {
    userName,
    wordsCountText,
    currentGoalLoading,
    sessionCustomer,
    currentGoal,
    wordCountSchema,
    visibleState,
    toggleFormVisible,
    handleSubmit,
    onSubmit
  }
}
