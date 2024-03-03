import {
  TUpdateWordCountSchema,
  updateWordCountSchema,
} from '@features/profile/ProfileUtils'
import { postWordCounter, getCounters } from '@features/profile/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@shared/hooks/useUser'
import { TCreateWordCountRequest } from '@shared/types'
import { capitalizeName } from '@shared/utils/transformers'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { v4 as uuidv4 } from 'uuid'

export const useProfileController = () => {
  const { sessionCustomer } = useUser()

  const [existeWrrdCount, setExisteWrrdCount] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const queryClient = useQueryClient()

  const toggleFormVisible = () => setIsFormVisible((prev) => !prev)

  const getWordCounters = useCallback(() => {
    if (sessionCustomer) {
      const wordCounters = getCounters(
        sessionCustomer.email,
        setExisteWrrdCount,
      )

      return wordCounters
    }
  }, [])

  const {
    data: wordCounters,
    isLoading: wordCountersLoading,
    refetch,
  } = useQuery({
    queryKey: ['wordCounters'],
    queryFn: getWordCounters,
    refetchOnWindowFocus: false,
  })

  const wordsCount = wordCounters?.words || 0

  const wordsCountText =
    wordsCount > 0
      ? `Sua meta de hoje são ${wordsCount} palavras.`
      : 'Você ainda não escreveu nenhuma palavra hoje!'

  const userName = capitalizeName(sessionCustomer?.name?.split(' ')[0] ?? '')

  const wordCountSchema = useForm<TUpdateWordCountSchema>({
    resolver: zodResolver(updateWordCountSchema),
    defaultValues: {
      wordCount: 100,
    },
  })

  const { handleSubmit, reset } = wordCountSchema

  const { mutateAsync: mutateCreateWordCount } = useMutation({
    mutationFn: postWordCounter,
    onSuccess(_, variables) {
      queryClient.setQueryData(['wordCounters'], () => ({
        email: variables.email,
        words: variables.words,
      }))
    },
  })

  const onSubmit = async (data: TUpdateWordCountSchema) => {
    const createWordCountRequest: TCreateWordCountRequest = {
      wordCounterId: uuidv4(),
      email: sessionCustomer.email,
      words: data.wordCount,
    }

    if (existeWrrdCount) {
      await mutateCreateWordCount(createWordCountRequest)
    } else if (!existeWrrdCount) {
      await postWordCounter(createWordCountRequest)
      refetch()
    }

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
