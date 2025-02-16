import { TCacheName, TTimeToRefetchCache } from '@shared/types'
import { timeToRefetchCache } from '@shared/utils/constants/timeToRefetchCache'
import {
  InitialDataFunction,
  MutationFunction,
  QueryFunction,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

type UseQueryMutationParams<TResponse, TRequest> = {
  mutationFn: MutationFunction<TResponse | undefined, TRequest> | undefined
  cacheName: TCacheName
  variablePath?: keyof TRequest
}

/**
 * Custom hook to handle mutations and update the cache using react-query.
 *
 * @template TResponse - The type of the response object.
 * @template TRequest - The type of the request object.
 * @param {MutationFunction<TResponse | undefined, TRequest>} mutationFn - Function to execute the mutation.
 * @param {TCacheName} cacheName - The name of the cache to be updated.
 * @param {keyof TRequest} [variablePath] - An optional path to the variable to be updated.
 * @returns {Object} - Contains `mutateAsync` function to trigger the mutation and the rest of the useMutation return values.
 * @example
 * const { mutate } = useQueryMutation<TChapterResponse, TPatchChapterHTMLRequest>({
 *  mutationFn: patchChapterHTML,
 *  cacheName: 'chapters'
 * })
 */

export function useQueryMutation<TResponse, TRequest>({
  mutationFn,
  cacheName,
  variablePath
}: UseQueryMutationParams<TResponse, TRequest>) {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn,
    onSuccess(_, variables) {
      const query = queryClient.getQueriesData({
        queryKey: [cacheName]
      })

      const data = query[0][1] as TResponse

      const newData = variablePath ? variables[variablePath] : variables

      queryClient.setQueryData([cacheName], () => ({
        ...data,
        ...newData
      }))
    }
  })

  return {
    mutateAsync,
    ...rest
  }
}

type TUseQueryData<T> = {
  getDataFn: (params?: QueryFunction['arguments']) => Promise<T | undefined>
  cacheName: TCacheName
  cacheTime: TTimeToRefetchCache
  enabled?: boolean
  initialData?: T | InitialDataFunction<T>
  dependecyKey?: string
}

/**
 * Custom hook to fetch data and manage caching using react-query.
 *
 * @template T - The type of the returned data object.
 * @param {QueryFunction<T | undefined>} getDataFn - Async function to get data. Should return a promise resolving to the data object.
 * @param {TCacheName} cacheName - The name of the cache to be created.
 * @param {TTimeToRefetchCache} cacheTime - The time duration to refetch the cache.
 * @param {boolean} [enabled=true] - Optional parameter to enable or disable the query.
 * @param {T | InitialDataFunction<T>} [initialData] - Optional initial data for the query.
 * @param {string} [dependecyKey] - Optional parameter to add into a queryKey.
 * @returns {Object} - Contains `data` and all other methods returned by useQuery.
 * @example
 * const getDataFn = async (): Promise<TWordCount> => ({}) as TWordCount;
 * const { data } = useQueryData({
 * getDataFn,
 * cacheName: 'wordCounters',
 * cacheTime: '12-hours'
 * });
 */

export function useQueryData<T>({
  cacheName,
  cacheTime,
  getDataFn,
  dependecyKey,
  enabled,
  initialData
}: TUseQueryData<T>) {
  const staleTime = timeToRefetchCache[cacheTime]

  const { data, ...rest } = useQuery({
    queryKey: [cacheName, dependecyKey ?? null],
    queryFn: getDataFn,
    refetchOnWindowFocus: false,
    staleTime,
    enabled,
    initialData
  })
  return {
    data,
    ...rest
  }
}
