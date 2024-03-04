import '@testing-library/jest-dom'

jest.mock(
  'react-query',
  jest.fn(() => ({
    useQuery: jest.fn(() => ({
      data: {},
    })),
    useQueryClient: jest.fn(() => ({
      setQueryData: jest.fn(),
    })),
    useMutation: jest.fn(() => ({
      mutateAsync: jest.fn(),
    })),
  })),
)

