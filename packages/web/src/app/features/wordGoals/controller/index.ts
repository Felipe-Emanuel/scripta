import { updateCurrentGoal } from '@features/profile/services'
import { TUpdateWordGoalsSchema, updateWordGoalsSchema } from '@features/wordGoals/WordGoaldUtils'

import { zodResolver } from '@hookform/resolvers/zod'
import { TUpdateCurrentGoalRequest } from '@shared/types'
import { cacheName } from '@shared/utils/constants/cacheName'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '@hooks/useUser'
import { queryClient } from '@shared/services/reactQuery'
import { getGoalProgress } from '../services'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useWordGoalsController = () => {
  const { sessionCustomer } = useUser()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const { data: currentGoal, isLoading } = useQuery({
    queryFn: () => getGoalProgress(sessionCustomer?.email),
    queryKey: [cacheName.currentGoal]
  })

  const goal = currentGoal?.goal
  const words = currentGoal?.words

  const wordGoalsSchema = useForm<TUpdateWordGoalsSchema>({
    resolver: zodResolver(updateWordGoalsSchema),
    defaultValues: {
      goal: goal || 100
    }
  })

  const { handleSubmit, reset } = wordGoalsSchema

  const putGoal = async (goal: number) => {
    if (currentGoal) {
      const body: TUpdateCurrentGoalRequest = {
        updatedGoal: {
          ...currentGoal,
          words: 0,
          goal
        }
      }
      const updatedGoal = await updateCurrentGoal(body)

      return updatedGoal
    }
  }

  const { mutateAsync } = useMutation({
    mutationFn: putGoal,
    mutationKey: [cacheName.currentGoal],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [cacheName.currentGoal]
      })
    }
  })

  const visibleState: 'visible' | 'hidden' | undefined = isFormVisible ? 'visible' : 'hidden'

  const series = currentGoal?.goalCompletePercent?.toFixed(2) || 0

  const onSubmit = async (data: TUpdateWordGoalsSchema) => {
    if (currentGoal) {
      await mutateAsync(data.goal)

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
