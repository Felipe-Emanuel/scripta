import {
  TUpdateWordGoalsSchema,
  updateWordGoalsSchema,
} from '@features/wordGoals/WordGoaldUtils'
import { updateWordsGoal } from '@features/wordGoals/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@shared/hooks/useLocalStorage'
import { useQueryData, useQueryMutation } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import { TUpdateWordsGoalRequest, TWordCount } from '@shared/types'
import { localStorageNames } from '@shared/utils/constants/localStorageNames'
import { progressGoal } from '@shared/utils/validation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useWordGoalsController = () => {
  const { getLocalStorage } = useLocalStorage()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { sessionCustomer } = useUser()

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const getLocalWords = useCallback(async () => {
    const wordCount: TWordCount = getLocalStorage(
      localStorageNames.wordCounters,
    )

    return wordCount
  }, [getLocalStorage])

  const { data, isLoading } = useQueryData(
    getLocalWords,
    'wordCounters',
    '12-hours',
  )

  const goal = data?.wordGoals
  const words = data?.words

  const wordGoalsSchema = useForm<TUpdateWordGoalsSchema>({
    resolver: zodResolver(updateWordGoalsSchema),
    defaultValues: {
      wordGoals: isLoading ? 500 : goal,
    },
  })

  const { handleSubmit } = wordGoalsSchema

  const { mutateAsync } = useQueryMutation<TWordCount, TUpdateWordsGoalRequest>(
    updateWordsGoal,
    'wordCounters',
  )

  const visibleState: 'visible' | 'hidden' | undefined = isFormVisible
    ? 'visible'
    : 'hidden'

  const onSubmit = async (data: TUpdateWordGoalsSchema) => {
    await mutateAsync({
      wordGoals: data.wordGoals,
      email: sessionCustomer?.email,
    })
  }

  const series = (goal && words && progressGoal(words, goal).toFixed(2)) || 0

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
