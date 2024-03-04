import { cacheName } from '@shared/utils/constants/cacheName'
import { timeToRefetchCache } from '@shared/utils/constants/timeToRefetchCache'
import { useCallback } from 'react'
import {
  MutationFunction,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

/**
 * 
 * @param obj object to be returned on success
 * @param mutationFn function to be executed to update anything
 * @param cacheName cache name to be updated
 * @returns function to be used to update
 * @example const { mutateAsync } = useQueryMutation<TWordCount, TUpdateWordsGoalRequest>(
    updateWordsGoal,
    'wordCounters',
  )
 */

export type TCacheName = keyof typeof cacheName
export type TTimeToRefetchCache = keyof typeof timeToRefetchCache

export function useQueryMutation<TResponse, TRequest>(
  mutationFn: MutationFunction<TResponse | undefined, TRequest> | undefined,
  cacheName: TCacheName,
) {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn,
    onSuccess(_, variables) {
      const query = queryClient.getQueriesData(cacheName)

      const data = query[0][1] as TResponse

      queryClient.setQueryData([cacheName], () => ({
        ...data,
        ...variables,
      }))
    },
  })

  return {
    mutateAsync,
  }
}

/**
 *
 * @param getDataFn async function to get data from database, local or anywhere
 * @param cacheName name of the cache to be created
 * @param cacheTime time of the cache
 * @returns data and all methods from useQuery
 * @example const getDataFn = (): TWordCount => ({}) as TWordCount
 * @example const { data } = useQueryData(getDataFn, 'wordCounters', '12-hours')
 */

export function useQueryData<T>(
  getDataFn: () => Promise<T>,
  cacheName: TCacheName,
  cacheTime: TTimeToRefetchCache,
) {
  const staleTime = timeToRefetchCache[cacheTime]

  const getData = useCallback(async () => {
    return await getDataFn()
  }, [getDataFn])

  const { data, ...rest } = useQuery(cacheName, getData, {
    refetchOnWindowFocus: false,
    staleTime,
  })

  return {
    data,
    ...rest,
  }
}
