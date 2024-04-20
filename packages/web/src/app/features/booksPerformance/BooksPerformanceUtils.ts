import { TBookResponse } from '@shared/types'

export const getUniqueItems = (data: TBookResponse[], property: keyof TBookResponse) => {
  return data
    ?.map((item) => ({
      label: item[property],
      value: item[property].toString().toLowerCase()
    }))
    .filter((value, index, self) => self.findIndex((item) => item.value === value.value) === index)
}
