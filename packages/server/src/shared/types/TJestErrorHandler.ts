import { ZodError } from 'zod'

export type TJestErrorHandler<Expected> = {
  error: ZodError
  expected: Expected
  position?: number
}
