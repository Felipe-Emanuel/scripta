import { QueryObserverResult, UseQueryResult } from '@tanstack/react-query'

export function queryResult<T>(data: T): UseQueryResult<T> {
  return {
    data,
    error: null,
    isError: false,
    isLoading: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: 'success',
    dataUpdatedAt: Date.now(),
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    isFetched: true,
    isFetching: false,
    isStale: true,
    isFetchedAfterMount: true,
    isPlaceholderData: false,
    isRefetching: false,
    isPending: false,
    failureReason: null,
    isInitialLoading: false,
    isPaused: false,
    fetchStatus: 'idle',
    refetch: async () => ({}) as Promise<QueryObserverResult<T, Error>>,
    promise: Promise.resolve(data)
  }
}
