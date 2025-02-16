import { TBookResponse } from '@shared/types'
import { TUniquePerformance } from './views/BookPerformanceFilters'

export const getUniqueItems = (
  data: TBookResponse[],
  property: keyof TBookResponse
): TUniquePerformance[] => {
  return data
    .map((item) => {
      const labelValue = item[property]
      if (labelValue === undefined || labelValue === null) return null
      return {
        label: labelValue,
        value: labelValue.toString().toLowerCase()
      }
    })
    .filter((item): item is TUniquePerformance => item !== null)
    .filter((value, index, self) => self.findIndex((item) => item.value === value.value) === index)
}
