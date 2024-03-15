import { TCacheName, TTimeToRefetchCache } from '@shared/types'
import { timeToRefetchCache } from '@shared/utils/constants/timeToRefetchCache'
import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

/**
 * 
 * @alias TResponse should contains responses object type
 * @alias TRequest should contains requests object type
 * @param mutationFn function to be executed to update anything
 * @param cacheName cache name to be updated
 * @param variablePath a optional path to the variable should be updated
 * @returns mutateAsync to be executed to update as an asyncronus api request or anything like that
 * @returns ...rest contains everything that useMutation from react query returns
 * @example const { mutateAsync } = useQueryMutation<
    TGoalResponse,
    TUpdateCurrentGoalRequest
  >(updateCurrentGoal, 'currentGoal', 'updatedGoal')
 */

export function useQueryMutation<TResponse, TRequest>(
  mutationFn: MutationFunction<TResponse | undefined, TRequest> | undefined,
  cacheName: TCacheName,
  variablePath?: keyof TRequest,
) {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn,
    onSuccess(_, variables) {
      const query = queryClient.getQueriesData(cacheName)

      const data = query[0][1] as TResponse

      const newData = variablePath ? variables[variablePath] : variables

      queryClient.setQueryData([cacheName], () => ({
        ...data,
        ...newData,
      }))
    },
  })

  return {
    mutateAsync,
    ...rest,
  }
}

/**
 * @type T should contain the type of object to be returned and should be apllyied on the getDataFn as exemple
 * @param getDataFn async function to get data from database, local or anywhere. Should receive type of object returned
 * @param cacheName name of the cache to be created
 * @param cacheTime time of the cache
 * @param enabled optional param to define if this request should be enabled
 * @returns data and all methods from useQuery
 * @example const getDataFn = (): TWordCount => ({}) as TWordCount
 * @example const { data } = useQueryData(getDataFn, 'wordCounters', '12-hours')
 */

export function useQueryData<T>(
  getDataFn: () => Promise<T>,
  cacheName: TCacheName,
  cacheTime: TTimeToRefetchCache,
  enabled?: boolean,
) {
  const staleTime = timeToRefetchCache[cacheTime]

  const { data, ...rest } = useQuery(cacheName, getDataFn, {
    refetchOnWindowFocus: false,
    staleTime,
    enabled,
  })

  return {
    data,
    ...rest,
  }
}
