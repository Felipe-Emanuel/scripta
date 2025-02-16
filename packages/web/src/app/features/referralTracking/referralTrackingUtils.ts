import { TGoalFiltersOptions } from '../../shared/types'
import { months } from '../../shared/utils/constants/months'
import { getSaturdayDate, getSundayDate } from '../../shared/utils/dates'

export const DAY_IN_MILLIS = 24 * 60 * 60 * 1000
export const INVALID_GOAL = 0
export const date = new Date()
export const year = date.getFullYear()
export const monthIndex = date.getMonth() + 1
export const month = months[monthIndex]

export const defaultFilterOption: TGoalFiltersOptions = {
  filterMethod: 'semana',
  startGoalFilter: getSundayDate(),
  endGoalFilter: getSaturdayDate()
}
