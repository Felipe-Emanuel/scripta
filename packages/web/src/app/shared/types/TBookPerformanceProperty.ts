import { TBookResponse } from '@shared/types'

export type TBookPerformanceProperty = keyof Pick<
  TBookResponse,
  'Gender' | 'Theme' | 'hits' | 'title' | 'conclued'
>
