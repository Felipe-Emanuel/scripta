import { UseQueryResult } from 'react-query'

export function queryResult<T>(data: T): UseQueryResult<T> {
  return {
    data,
    error: null,
    isError: false,
    isIdle: false,
    isLoading: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: 'success',
    dataUpdatedAt: new Date().getTime(),
    errorUpdateCount: new Date().getTime(),
    errorUpdatedAt: new Date().getTime(),
    failureCount: 10,
    isFetched: false,
    isFetching: false,
    isStale: true,
    isFetchedAfterMount: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetching: false,
    refetch: jest.fn(),
    remove() {
      jest.fn()
    },
  }
}
