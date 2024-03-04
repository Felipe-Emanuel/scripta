import {
  TUpdateWordCountSchema,
  updateWordCountSchema,
} from '@features/profile/ProfileUtils'
import { postWordCounter, getCounters } from '@features/profile/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalStorage } from '@shared/hooks/useLocalStorage'
import { useQueryData, useQueryMutation } from '@shared/hooks/useReactQuery'
import { useUser } from '@shared/hooks/useUser'
import { TCreateWordCountRequest, TWordCount } from '@shared/types'
import { localStorageNames } from '@shared/utils/constants/localStorageNames'
import { capitalizeName } from '@shared/utils/transformers'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

export const useProfileController = () => {
  const { setLocalStorage } = useLocalStorage()
  const { sessionCustomer } = useUser()
  const [existeWrrdCount, setExisteWrrdCount] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const getWordCounters = useCallback(async () => {
    if (sessionCustomer) {
      const wordCounters = await getCounters(
        sessionCustomer?.email,
        setExisteWrrdCount,
      )

      setLocalStorage(localStorageNames.wordCounters, wordCounters?.words)
      return wordCounters
    }
  }, [sessionCustomer, setLocalStorage])

  const {
    data: wordCounters,
    isLoading: wordCountersLoading,
    refetch,
  } = useQueryData(getWordCounters, 'wordCounters', '12-hours')

  useEffect(() => {
    if (sessionCustomer?.email && !wordCounters?.words) refetch()
  }, [refetch, sessionCustomer?.email, wordCounters?.words])

  const wordsCount = wordCounters?.words || 0

  const wordsCountText =
    wordsCount > 0
      ? `Hoje você escreveu ${wordsCount} palavras.`
      : 'Você ainda não escreveu nenhuma palavra hoje!'

  const userName = capitalizeName(sessionCustomer?.name?.split(' ')[0] ?? '')

  const wordCountSchema = useForm<TUpdateWordCountSchema>({
    resolver: zodResolver(updateWordCountSchema),
    defaultValues: {
      wordCount: 100,
    },
  })

  const { handleSubmit, reset } = wordCountSchema

  const { mutateAsync } = useQueryMutation<TWordCount, TCreateWordCountRequest>(
    postWordCounter,
    'wordCounters',
  )

  const onSubmit = async (data: TUpdateWordCountSchema) => {
    const createWordCountRequest: TCreateWordCountRequest = {
      wordCounterId: uuidv4(),
      email: sessionCustomer.email,
      words: data.wordCount,
    }

    if (existeWrrdCount) {
      await mutateAsync(createWordCountRequest)
    } else if (!existeWrrdCount) {
      await postWordCounter(createWordCountRequest)
      refetch()
    }

    setLocalStorage(localStorageNames.wordCounters, data.wordCount)
    reset()
    toggleFormVisible()
  }

  const visibleState: 'visible' | 'hidden' | undefined = isFormVisible
    ? 'visible'
    : 'hidden'

  return {
    userName,
    wordsCountText,
    wordCountersLoading,
    sessionCustomer,
    existeWrrdCount,
    wordCountSchema,
    visibleState,
    toggleFormVisible,
    handleSubmit,
    onSubmit,
  }
}
