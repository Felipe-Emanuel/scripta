import { TBookResponse } from '@shared/types'

export type TBookPerformanceProperty = keyof Pick<
  TBookResponse,
  'Gender' | 'hits'
>
