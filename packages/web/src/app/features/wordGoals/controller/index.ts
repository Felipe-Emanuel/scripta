import { updateCurrentGoal } from '@features/profile/services'
import {
  TUpdateWordGoalsSchema,
  updateWordGoalsSchema,
} from '@features/wordGoals/WordGoaldUtils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@shared/hooks/useLocalStorage'
import { useQueryData, useQueryMutation } from '@shared/hooks/useReactQuery'
import { TGoalResponse, TUpdateCurrentGoalRequest } from '@shared/types'

import { localStorageNames } from '@shared/utils/constants/localStorageNames'
import { progressGoal } from '@shared/utils/validation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useWordGoalsController = () => {
  const { getLocalStorage } = useLocalStorage()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const getLocalWords = useCallback(async () => {
    const wordCount: TGoalResponse = getLocalStorage(
      localStorageNames.currentGoal,
    )

    return wordCount
  }, [getLocalStorage])

  const { data: currentGoal, isLoading } = useQueryData(
    getLocalWords,
    'currentGoal',
    '12-hours',
  )

  const goal = currentGoal?.goal
  const words = currentGoal?.words

  const wordGoalsSchema = useForm<TUpdateWordGoalsSchema>({
    resolver: zodResolver(updateWordGoalsSchema),
    defaultValues: {
      goal: goal || 100,
    },
  })

  const { handleSubmit } = wordGoalsSchema

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
      await mutateAsync({
        goalId: currentGoal.id,
        updatedGoal: {
          ...currentGoal,
          goal: data.goal,
        },
      })
    }
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
