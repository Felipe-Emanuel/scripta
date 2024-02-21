import { getCounters } from '@features/profile/services'
import { useUser } from '@shared/hooks/useUser'
import { capitalizeName } from '@shared/utils/transformers'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'

export const useProfileController = () => {
  const { sessionCustomer } = useUser()

  const [existeWrrdCount, setExisteWrrdCount] = useState(false)

  const getWordCounters = useCallback(() => {
    if (sessionCustomer) {
      const wordCounters = getCounters(
        sessionCustomer.email,
        setExisteWrrdCount,
      )

      return wordCounters
    }
  }, [])

  const { data: wordCounters, isLoading: wordCountersLoading } = useQuery(
    'wordCounters',
    getWordCounters,
    {
      refetchOnWindowFocus: false,
    },
  )

  const wordsCount = wordCounters?.words || 0

  const wordsCountText =
    wordsCount > 0
      ? `Você escreveu ${wordsCount} hoje!`
      : 'Você ainda não escreveu nenhuma palavra hoje!'

  const userName = capitalizeName(sessionCustomer?.name?.split(' ')[0] ?? '')

  return {
    userName,
    wordsCountText,
    wordCountersLoading,
    sessionCustomer,
    existeWrrdCount,
  }
}
