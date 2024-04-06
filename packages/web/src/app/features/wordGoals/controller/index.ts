import { updateCurrentGoal } from '@features/profile/services'
import {
  TUpdateWordGoalsSchema,
  updateWordGoalsSchema,
} from '@features/wordGoals/WordGoaldUtils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryMutation } from '@shared/hooks/useReactQuery'
import { TGoalResponse, TUpdateCurrentGoalRequest } from '@shared/types'
import { cacheName } from '@shared/utils/constants/cacheName'

import { progressGoal } from '@shared/utils/validation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

export const useWordGoalsController = () => {
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const { data: currentGoal, isLoading } = useQuery<TGoalResponse>(
    cacheName.currentGoal,
  )

  const goal = currentGoal?.goal
  const words = currentGoal?.words

  const wordGoalsSchema = useForm<TUpdateWordGoalsSchema>({
    resolver: zodResolver(updateWordGoalsSchema),
    defaultValues: {
      goal: goal || 100,
    },
  })

  const { handleSubmit, reset } = wordGoalsSchema

  const { mutateAsync } = useQueryMutation<
    TGoalResponse,
    TUpdateCurrentGoalRequest
  >(updateCurrentGoal, 'currentGoal', 'updatedGoal')

  const visibleState: 'visible' | 'hidden' | undefined = isFormVisible
    ? 'visible'
    : 'hidden'

  const series = (goal && words && progressGoal(words, goal).toFixed(2)) || 0

  const onSubmit = async (data: TUpdateWordGoalsSchema) => {
    if (currentGoal) {
      const goalComplete = progressGoal(currentGoal.words, data.goal)

      await mutateAsync({
        goalId: currentGoal.id,
        updatedGoal: {
          ...currentGoal,
          goal: data.goal,
          goalComplete: goalComplete >= 100,
        },
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
    onSubmit,
  }
}
