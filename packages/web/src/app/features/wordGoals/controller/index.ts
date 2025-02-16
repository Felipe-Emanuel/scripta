import { getCurrentGoal, updateCurrentGoal } from '@features/profile/services'
import { TUpdateWordGoalsSchema, updateWordGoalsSchema } from '@features/wordGoals/WordGoaldUtils'

import { zodResolver } from '@hookform/resolvers/zod'
import { TGoalResponse, TUpdateCurrentGoalRequest } from '@shared/types'
import { cacheName } from '@shared/utils/constants/cacheName'

import { progressGoal } from '@shared/utils/validation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryData, useQueryMutation } from '@hooks/useReactQuery'
import { useUser } from '@hooks/useUser'
import { queryClient } from '@shared/services/reactQuery'

export const useWordGoalsController = () => {
  const { sessionCustomer } = useUser()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const getGoal = useCallback(async () => {
    if (sessionCustomer) {
      const current = getCurrentGoal(sessionCustomer.email)

      return current
    }
  }, [sessionCustomer])

  const { data: currentGoal } = useQueryData({
    getDataFn: getGoal,
    cacheName: 'currentGoal',
    cacheTime: '1-hours'
  })

  const isLoading = !currentGoal?.id

  const goal = currentGoal?.goal
  const words = currentGoal?.words

  const wordGoalsSchema = useForm<TUpdateWordGoalsSchema>({
    resolver: zodResolver(updateWordGoalsSchema),
    defaultValues: {
      goal: goal || 100
    }
  })

  const { handleSubmit, reset } = wordGoalsSchema

  const { mutateAsync } = useQueryMutation<TGoalResponse, TUpdateCurrentGoalRequest>({
    mutationFn: updateCurrentGoal,
    cacheName: 'currentGoal',
    variablePath: 'updatedGoal'
  })

  const visibleState: 'visible' | 'hidden' | undefined = isFormVisible ? 'visible' : 'hidden'

  const series = (goal && words && progressGoal(words, goal).toFixed(2)) || 0

  const onSubmit = async (data: TUpdateWordGoalsSchema) => {
    if (currentGoal) {
      const goalComplete = progressGoal(currentGoal.words, data.goal)

      await mutateAsync({
        goalId: currentGoal.id,
        updatedGoal: {
          ...currentGoal,
          goal: data.goal,
          goalComplete: goalComplete >= 100
        }
      })

      queryClient.invalidateQueries({
        queryKey: [cacheName.goalsByFilter]
      })
    }

    reset()
    toggleFormVisible()
  }

  return {
    series,
    isLoading,
    goal,
    words,
    wordGoalsSchema,
    visibleState,
    handleSubmit,
    toggleFormVisible,
    onSubmit
  }
}
