import { useAuthController } from '@features/auth/controller'
import { renderHook, act } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}))

jest.mock('@shared/services/axios/api', () => ({
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
}))

describe('useAuthController', () => {
  it('should call authentication function', async () => {
    const { result } = renderHook(() => useAuthController())

    const email = 'email@example.com'
    const password = 'A@a12345'

    const onSubmitMock = jest.fn(result.current.onSubmit)

    await act(async () => {
      await onSubmitMock({
        email,
        password,
        name: null,
      })
    })

    expect(onSubmitMock).toHaveBeenCalledWith({
      email,
      password,
      name: null,
    })
  })

  it('should not call authentication function', async () => {
    const { result } = renderHook(() => useAuthController())

    const email = 'email@example.com'
    const password = 'A@a12345'
    const name = 'John Doe'

    const onSubmitMock = jest.fn(result.current.onSubmit)
    const changeAuthPageContentMock = jest.fn(
      result.current.changeAuthPageContent,
    )

    await act(async () => {
      changeAuthPageContentMock()
      await onSubmitMock({
        email,
        password,
        name,
      })
    })

    expect(onSubmitMock).not.toHaveBeenCalledWith({
      email,
      password,
      name: null,
    })
  })
})
