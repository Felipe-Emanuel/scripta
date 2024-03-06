import { startOfWeek } from 'date-fns'

export const isToday = (date: Date): boolean => {
  const today = new Date()
  const difference = today.getTime() - new Date(date).getTime()

  const isToday = Math.abs(difference) < 24 * 60 * 60 * 1000

  return isToday
}

export const getWeekNumber = (date: Date) => {
  const startOfWeekDate = startOfWeek(date)

  const differenceInDays = Math.floor(
    (date.getTime() - startOfWeekDate.getTime()) / (24 * 60 * 60 * 1000),
  )

  const weekNumber = Math.floor(differenceInDays / 7) + 1

  return weekNumber
}
