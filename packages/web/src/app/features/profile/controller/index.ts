import {
  TUpdateWordCountSchema,
  updateWordCountSchema,
} from '@features/profile/ProfileUtils'
import { updateCurrentGoal, getCurrentGoal } from '@features/profile/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@shared/hooks/useLocalStorage'
import { useQueryData, useQueryMutation } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import { TGoalResponse, TUpdateCurrentGoalRequest } from '@shared/types'
import { localStorageNames } from '@shared/utils/constants/localStorageNames'
import { capitalizeName } from '@shared/utils/transformers'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useProfileController = () => {
  const { setLocalStorage } = useLocalStorage()
  const { sessionCustomer } = useUser()
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const getGoal = useCallback(async () => {
    if (sessionCustomer) {
      const currentGoal = await getCurrentGoal(sessionCustomer?.email)

      setLocalStorage(localStorageNames.currentGoal, currentGoal?.words)
      return currentGoal
    }
  }, [sessionCustomer, setLocalStorage])

  const {
    data: currentGoal,
    isLoading: currentGoalLoading,
    refetch,
  } = useQueryData(getGoal, 'currentGoal', '12-hours')

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
      wordCount: currentGoal?.words || 100,
    },
  })

  const { handleSubmit, reset } = wordCountSchema

  const { mutateAsync } = useQueryMutation<
    TGoalResponse,
    TUpdateCurrentGoalRequest
  >(updateCurrentGoal, 'currentGoal', 'updatedGoal')

  const onSubmit = async (data: TUpdateWordCountSchema) => {
    if (currentGoal) {
      const createWordCountRequest: TUpdateCurrentGoalRequest = {
        goalId: currentGoal?.id,
        updatedGoal: {
          ...currentGoal,
          words: data.wordCount,
        },
      }

      await mutateAsync(createWordCountRequest)

      setLocalStorage(localStorageNames.currentGoal, data.wordCount)
      reset()
      toggleFormVisible()
    }
  }

  const visibleState: 'visible' | 'hidden' | undefined = isFormVisible
    ? 'visible'
    : 'hidden'

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
    onSubmit,
  }
}
